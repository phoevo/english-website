const { Databases, Client, Query } = require("node-appwrite");
const Stripe = require("stripe");
const provision = require("./utils/provision.js");

module.exports = async function handleWebhook({ req, res, adminClient }) {
  console.log("Webhook received. Event type:", req.method);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));

  // Use TEST or LIVE depending on environment
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST, {
    apiVersion: "2023-08-16",
  });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST;
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
  const stripeCustomersCollectionId = process.env.APPWRITE_STRIPE_CUSTOMERS_ID || process.env.NEXT_PUBLIC_APPWRITE_STRIPE_CUSTOMERS_ID;
  const usersCollectionId = process.env.APPWRITE_USERS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

  const subscriptionDoc = await databases.listDocuments(
    dbId,
    stripeCustomersCollectionId,
    [Query.equal("stripe_customer_id", customerId)]
  );

  let userId;
  if (subscriptionDoc.documents.length === 0) {
    let email = event.data.object?.customer_email;
    if (!email) {
      try {
        const cust = await stripe.customers.retrieve(customerId);
        email = cust?.email;
      } catch {}
    }

    if (email) {
      const users = await databases.listDocuments(dbId, usersCollectionId, [
        Query.equal("email", email),
      ]);
      if (users.total > 0) {
        userId = users.documents[0].$id;

        const existingForUser = await databases.listDocuments(dbId, stripeCustomersCollectionId, [
          Query.equal("user_id", userId),
        ]);

        if (existingForUser.total > 0) {
          await databases.updateDocument(
            dbId,
            stripeCustomersCollectionId,
            existingForUser.documents[0].$id,
            { stripe_customer_id: customerId }
          );
        } else {
          await databases.createDocument(
            dbId,
            stripeCustomersCollectionId,
            "unique()",
            { user_id: userId, stripe_customer_id: customerId }
          );
        }
      } else {
        return res.json({ error: "No user found for customer email" }, 404);
      }
    } else {
      return res.json({ error: "No matching customer document found" }, 404);
    }
  } else {
    userId = subscriptionDoc.documents[0].user_id;
  }

  console.log("Found user ID:", userId);

  let plan = "free";

  // Resolve price IDs from env with fallbacks for dev/test
  const PRICE_STUDENT_MONTHLY = process.env.STRIPE_MONTHLY_PRICE_ID || "price_1RjNY6PoApFikZNYFIHlqq3t";
  const PRICE_STUDENT_YEARLY = process.env.STRIPE_YEARLY_PRICE_ID || "price_1RmIPcPoApFikZNYDnmuR2hA";
  const PRICE_TUTOR_MONTHLY  = process.env.STRIPE_TUTOR_MONTHLY || "price_1ScV06PoApFikZNYoWPINm74";
  const PRICE_TUTOR_PERSEAT  = process.env.STRIPE_TUTOR_YEARLY || "price_1SyYn4PoApFikZNYC69TOcVL";

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
        case PRICE_TUTOR_PERSEAT:
          plan = "Tutor per seat";
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
