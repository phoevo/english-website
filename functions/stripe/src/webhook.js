const { Databases, Client, Query } = require("node-appwrite");
const Stripe = require("stripe");
const provision = require("./utils/provision.js");

module.exports = async function handleWebhook({
  req,
  res,
  adminClient,
}) {
  console.log("Webhook received. Event type:", req.method);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });

  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.bodyText,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    );
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

  // Handle different event types
  if (event.type === "checkout.session.completed") {
    customerId = event.data.object.customer;
    // Get the price ID from line items
    const lineItems = event.data.object.display_items || event.data.object.line_items;
    if (lineItems && lineItems.length > 0) {
      priceId = lineItems[0].price?.id;
    }
    // If not found in line items, fetch from subscription
    if (!priceId && event.data.object.subscription) {
      const subscription = await stripe.subscriptions.retrieve(event.data.object.subscription);
      priceId = subscription.items.data[0].price.id;
    }
  } else {
    customerId = event.data.object.customer;
    if (event.data.object.items) {
      priceId = event.data.object.items.data[0].price.id;
    }
  }

  if (!customerId) {
    console.error("No customer ID found in event");
    return res.json({ error: "No customer ID found" }, 400);
  }

  console.log("Customer ID:", customerId);
  console.log("Price ID:", priceId);

  const databases = new Databases(adminClient);

  const subscriptionDoc = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_STRIPE_CUSTOMERS_ID,
    [Query.equal("stripe_customer_id", customerId)]
  );

  if (subscriptionDoc.documents.length === 0) {
    console.error("No matching customer document found for:", customerId);
    return res.json({ error: "No matching customer document found" }, 404);
  }

  const userId = subscriptionDoc.documents[0].user_id;
  console.log("Found user ID:", userId);

  let plan = "free";

  // Determine plan based on price ID
  if (priceId) {
    switch (priceId) {
      case "price_1RjNY6PoApFikZNYFIHlqq3t":
        plan = "Student Monthly";
        break;
      case "price_1RmIPcPoApFikZNYDnmuR2hA":
        plan = "Student Yearly";
        break;
      default:
        console.log("Unknown price ID:", priceId, "defaulting to free");
        plan = "free";
    }
  } else {
    // Fallback: check active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: "active",
    });

    if (subscriptions.data.length > 0) {
      const activePriceId = subscriptions.data[0].items.data[0].price.id;
      switch (activePriceId) {
        case "price_1RjNY6PoApFikZNYFIHlqq3t":
          plan = "Student Monthly";
          break;
        case "price_1RmIPcPoApFikZNYDnmuR2hA":
          plan = "Student Yearly";
          break;
        default:
          plan = "free";
      }
    }
  }

  console.log("Determined plan:", plan);

  await provision({
    plan,
    userId,
    adminClient,
  });

  return res.json({ message: "ok" });
}
