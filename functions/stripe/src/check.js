const { Account, Databases } = require("node-appwrite");
const { getStripeConfig } = require("./utils/stripe-config.js");
const provision = require("./utils/provision.js");

module.exports = async function handleCheckPayment({ req, res, adminClient, client }) {
  const checkoutId = req.query?.checkout_id || req.bodyJson?.checkout_id;
  if (!checkoutId) {
    return res.json({ error: "Checkout ID is required" }, 400);
  }

  try {
    const account = new Account(client);
    const user = await account.get();
    const databases = new Databases(adminClient);
    const { stripe, priceToPlan } = getStripeConfig();
    const checkoutSession = await stripe.checkout.sessions.retrieve(checkoutId);

    if (checkoutSession.mode !== "subscription" || checkoutSession.status !== "complete") {
      return res.json({ success: false, pending: true }, 202);
    }

    if (!checkoutSession.customer || checkoutSession.client_reference_id && checkoutSession.client_reference_id !== user.$id) {
      return res.json({ error: "Checkout session does not belong to this account" }, 403);
    }

    const dbId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const usersCollectionId = process.env.APPWRITE_USERS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;
    const userDoc = await databases.getDocument(dbId, usersCollectionId, user.$id);

    if (userDoc.stripeCustomerId !== checkoutSession.customer) {
      return res.json({ error: "Checkout session does not belong to this account" }, 403);
    }

    const subscriptionId = typeof checkoutSession.subscription === "string"
      ? checkoutSession.subscription
      : checkoutSession.subscription?.id;
    if (!subscriptionId) {
      return res.json({ success: false, pending: true }, 202);
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (subscription.customer !== checkoutSession.customer || !["active", "trialing"].includes(subscription.status)) {
      return res.json({ success: false, pending: true }, 202);
    }

    const priceId = subscription.items.data[0]?.price?.id;
    const plan = priceToPlan[priceId];
    if (!plan) {
      return res.json({ error: "The subscription price is not recognized" }, 409);
    }

    await provision({ plan, userId: user.$id, adminClient });
    return res.json({ success: true, isSubscribed: true, plan });
  } catch (err) {
    console.error("Checkout confirmation failed:", err);
    return res.json({ error: "Unable to confirm checkout" }, 500);
  }
};
