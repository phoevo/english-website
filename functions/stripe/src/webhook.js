const { Databases, Client, Query } = require("node-appwrite");
const Stripe = require("stripe");
const provision = require("./utils/provision.js");

module.exports = async function handleWebhook({ req, res, adminClient }) {
  console.log("Webhook received. Event type:", req.method);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));

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

  // Every handled event (checkout session, subscription, invoice, payment
  // intent) carries the Stripe customer id on its object.
  const customerId = event.data.object.customer;

  if (!customerId) {
    console.error("No customer ID found in event");
    return res.json({ error: "No customer ID found" }, 400);
  }

  console.log("Customer ID:", customerId);

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

  // Entitlement is derived from the customer's ACTUAL subscription status in
  // Stripe, never from the price id carried on the event. Failed-payment
  // events (invoice.payment_failed, payment_intent.payment_failed) and
  // not-yet-paid subscriptions (status "incomplete") still reference a paid
  // price, so keying off the price alone granted access even when the charge
  // never succeeded. A subscription only grants access while Stripe reports it
  // as "active" or "trialing".
  const PRICE_TO_PLAN = {
    price_1TpZBNL2R3rDklxBncRgUey9: "Student Monthly",
    price_1TdZPSL2R3rDklxBhKtzSVX0: "Student Yearly",
    price_1TpZLxL2R3rDklxB0dwVxVU2: "Tutor Monthly",
    price_1TdZRFL2R3rDklxBcfkm5QxD: "Tutor Yearly",
  };
  const GRANTING_STATUSES = ["active", "trialing"];

  let plan = "free";
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 10,
    });
    const grantingSub = subscriptions.data.find((s) =>
      GRANTING_STATUSES.includes(s.status)
    );
    if (grantingSub) {
      const activePriceId = grantingSub.items.data[0].price.id;
      plan = PRICE_TO_PLAN[activePriceId] || "free";
    }
  } catch (err) {
    console.error("Failed to resolve subscription status for customer:", customerId, err);
    // Fail closed: never grant access when the active subscription can't be confirmed.
    plan = "free";
  }

  console.log("Determined plan:", plan);

  await provision({ plan, userId, adminClient });
  return res.json({ message: "ok" });
};
