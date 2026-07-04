const { Databases, Client, Query } = require("node-appwrite");
const Stripe = require("stripe");
const provision = require("./utils/provision.js");

module.exports = async function handleWebhook({ req, res, adminClient }) {
  console.log("Webhook received. Event type:", req.method);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));

  // Use TEST or LIVE depending on environment
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
  });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];

  // Ensure raw buffer
  const rawBodyString = req.bodyRaw || req.bodyText || req.body;
  const rawBody = Buffer.isBuffer(rawBodyString)
    ? rawBodyString
    : Buffer.from(rawBodyString || "", "utf8");

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Invalid webhook signature:", err);
    return res.json({ error: "Invalid signature" }, 400);
  }

  const allowedEvents = [
    "checkout.session.completed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "customer.subscription.paused",
    "customer.subscription.resumed",
    "customer.subscription.pending_update_applied",
    "customer.subscription.pending_update_expired",
    "customer.subscription.trial_will_end",
    "invoice.paid",
    "invoice.payment_failed",
    "invoice.payment_action_required",
    "invoice.upcoming",
    "invoice.marked_uncollectible",
    "invoice.payment_succeeded",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
    "payment_intent.canceled",
  ];

  if (!allowedEvents.includes(event.type)) {
    console.log("Event type not allowed:", event.type);
    return res.json({ message: "ok" });
  }

  console.log("Processing event:", event.type);
  console.log("Event data:", JSON.stringify(event.data, null, 2));

  let customerId;
  let priceId;

  /** ---- LOGIC BELOW UNCHANGED ---- */

  // Handle different event types
  if (event.type === "checkout.session.completed") {
    customerId = event.data.object.customer;
    const lineItems = event.data.object.display_items || event.data.object.line_items;
    if (lineItems && lineItems.length > 0) {
      priceId = lineItems[0].price?.id;
    }
    if (!priceId && event.data.object.subscription) {
      const subscription = await stripe.subscriptions.retrieve(event.data.object.subscription);
      priceId = subscription.items.data[0].price.id;
    }
  } else {
    customerId = event.data.object.customer;
    if (event.data.object.items) {
      priceId = event.data.object.items.data[0].price.id;
    }
    if (!priceId && event.type.startsWith("invoice.")) {
      const lines = event.data.object?.lines?.data || [];
      const first = lines[0];
      if (first?.pricing?.price_details?.price) {
        priceId = first.pricing.price_details.price;
      }
    }
  }

  if (!customerId) {
    console.error("No customer ID found in event");
    return res.json({ error: "No customer ID found" }, 400);
  }

  console.log("Customer ID:", customerId);
  console.log("Price ID:", priceId);

  const databases = new Databases(adminClient);

  const dbId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const usersCollectionId = process.env.APPWRITE_USERS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

  // Resolve the user directly from the Users collection via stripeCustomerId.
  const usersByCustomer = await databases.listDocuments(
    dbId,
    usersCollectionId,
    [Query.equal("stripeCustomerId", customerId)]
  );

  let userId;
  if (usersByCustomer.total > 0) {
    userId = usersByCustomer.documents[0].$id;
  } else {
    // Fallback: resolve by email, then backfill stripeCustomerId for future events.
    let email = event.data.object?.customer_email;
    if (!email) {
      try {
        const cust = await stripe.customers.retrieve(customerId);
        email = cust?.email;
      } catch {}
    }

    if (!email) {
      return res.json({ error: "No customer email to resolve user" }, 404);
    }

    const users = await databases.listDocuments(dbId, usersCollectionId, [
      Query.equal("email", email),
    ]);

    if (users.total === 0) {
      return res.json({ error: "No user found for customer email" }, 404);
    }

    userId = users.documents[0].$id;

    // Backfill so subsequent events resolve directly by stripeCustomerId.
    try {
      await databases.updateDocument(dbId, usersCollectionId, userId, {
        stripeCustomerId: customerId,
      });
    } catch (err) {
      console.error("Failed to backfill stripeCustomerId on user:", err);
    }
  }

  console.log("Found user ID:", userId);

  let plan = "free";

  // Resolve price IDs from env with fallbacks for dev/test
  const PRICE_STUDENT_MONTHLY = "price_1TdZO8L2R3rDklxBcFuGHgko";
  const PRICE_STUDENT_YEARLY = "price_1TdZPSL2R3rDklxBhKtzSVX0";
  const PRICE_TUTOR_MONTHLY  = "price_1TdZQ2L2R3rDklxB4yDMyHKS";
  const PRICE_TUTOR_YEARLY   = "price_1TdZRFL2R3rDklxBcfkm5QxD";

  if (priceId) {
    switch (priceId) {
      case PRICE_STUDENT_MONTHLY:
        plan = "Student Monthly";
        break;
      case PRICE_STUDENT_YEARLY:
        plan = "Student Yearly";
        break;
      case PRICE_TUTOR_MONTHLY:
        plan = "Tutor Monthly";
        break;
      case PRICE_TUTOR_YEARLY:
        plan = "Tutor Yearly";
        break;
      default:
        plan = "free";
    }
  } else {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: "active",
    });
    if (subscriptions.data.length > 0) {
      const activePriceId = subscriptions.data[0].items.data[0].price.id;
      switch (activePriceId) {
        case PRICE_STUDENT_MONTHLY:
          plan = "Student Monthly";
          break;
        case PRICE_STUDENT_YEARLY:
          plan = "Student Yearly";
          break;
        case PRICE_TUTOR_MONTHLY:
          plan = "Tutor Monthly";
          break;
        case PRICE_TUTOR_YEARLY:
          plan = "Tutor Yearly";
          break;
        default:
          plan = "free";
      }
    }
  }

  // For cancellation/deletion events, force plan to "free" regardless of price ID
  const cancellationEvents = [
    "customer.subscription.deleted",
    "customer.subscription.paused",
  ];
  if (cancellationEvents.includes(event.type)) {
    plan = "free";
  }

  // For updated subscriptions, check if the status is actually active
  if (event.type === "customer.subscription.updated") {
    const subStatus = event.data.object.status;
    if (subStatus === "canceled" || subStatus === "unpaid" || subStatus === "incomplete_expired") {
      plan = "free";
    }
  }

  console.log("Determined plan:", plan);

  await provision({ plan, userId, adminClient });
  return res.json({ message: "ok" });
};
