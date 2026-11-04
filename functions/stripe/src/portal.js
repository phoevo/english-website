const { Account, Databases } = require("node-appwrite");
const { getStripeConfig } = require("./utils/stripe-config.js");

// Opens the Stripe customer portal for the signed-in user. Plan changes,
// card updates, invoices and cancellation (at period end, set in the Stripe
// portal settings) are handled there; the webhook syncs any changes back.
module.exports = async function handlePortal({ req, res, client, adminClient }) {
  if (req.method !== "POST") {
    return res.json({ error: "Method not allowed" }, 405);
  }

  try {
    let user;
    try {
      user = await new Account(client).get();
    } catch {
      return res.json({ error: "Authentication required" }, 401);
    }

    const dbId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const usersCollectionId = process.env.APPWRITE_USERS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;
    const userDoc = await new Databases(adminClient).getDocument(dbId, usersCollectionId, user.$id);

    if (!userDoc.stripeCustomerId) {
      return res.json({ error: "No billing account found" }, 404);
    }

    const { stripe } = getStripeConfig();
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const session = await stripe.billingPortal.sessions.create({
      customer: userDoc.stripeCustomerId,
      return_url: `${baseUrl}/profile`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Billing portal failed:", err);
    return res.json({ error: "Unable to open billing" }, 500);
  }
};
