const { Databases, Account } = require("node-appwrite");
const { getStripeConfig } = require("./utils/stripe-config.js");

const serverPlans = [

  "Synomilo Monthly",
  "Synomilo Yearly",
];


module.exports = async function handlePayments({
  req,
  res,
  client,
  adminClient,
}) {
  console.log("Payments handler:", req.method);

  if (req.method !== "POST") {
    return res.json({ error: "Method not allowed" }, 405);
  }

  const databases = new Databases(adminClient);
  const account = new Account(client);

  try {
    const user = await account.get();

    if (!user) {
      return res.json({ error: "Not authenticated" }, 401);
    }

    const plan = req.bodyJson.plan;

    if (!plan || !serverPlans.includes(plan)) {
      return res.json({ error: "Invalid plan" }, 400);
    }

    const { stripe, priceIds } = getStripeConfig();

      const dbId =
        process.env.APPWRITE_DATABASE_ID ||
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

      const usersCollectionId =
        process.env.APPWRITE_USERS_COLLECTION_ID ||
        process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

      if (!dbId || !usersCollectionId) {
        throw new Error("Missing DB or Collection env vars");
      }

    // =========================
    // STEP 1: Load user document
    // =========================
    const userDoc = await databases.getDocument(
      dbId,
      usersCollectionId,
      user.$id
    );

    let stripeCustomerId = userDoc.stripeCustomerId;

    // A customer saved in the other Stripe mode (test vs live), or deleted in
    // Stripe, can't be used; treat it as missing and create a new one.
    if (stripeCustomerId) {
      try {
        const existing = await stripe.customers.retrieve(stripeCustomerId);
        if (existing.deleted) stripeCustomerId = null;
      } catch (err) {
        if (err.code !== "resource_missing") throw err;
        stripeCustomerId = null;
      }
    }

    // =========================
    // STEP 2: Create Stripe customer if missing
    // =========================
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
  name: user.name,
  email: user.email,
  metadata: {
    appwriteUserId: user.$id,
  },
});

      stripeCustomerId = customer.id;

      await databases.updateDocument(dbId, usersCollectionId, user.$id, {
        stripeCustomerId,
      });
    }

    console.log("Stripe customer:", stripeCustomerId);

    // =========================
    // STEP 3: Create checkout session
    // =========================
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
  customer: stripeCustomerId,
  client_reference_id: user.$id,
  metadata: { appwriteUserId: user.$id },
  subscription_data: { metadata: { appwriteUserId: user.$id } },
  mode: "subscription",

  line_items: [
    {
      price: priceIds[plan],
      quantity: 1,
    },
  ],

  // ✅ Enable Stripe Tax
  automatic_tax: {
    enabled: true,
  },

  // ✅ Ask for billing address (at least the country)
  billing_address_collection: "required",

  // ✅ Save the address back to the customer
  customer_update: {
    address: "auto",
    name: "auto",
  },

  // ✅ If you might sell to businesses later
  tax_id_collection: {
    enabled: true,
  },

  success_url: `${baseUrl}/pricing/success?checkout_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${baseUrl}/pricing/canceled`,
});

    return res.json({
      checkout_url: session.url,
    });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.json(
      { error: "Unexpected error", details: err.message },
      500
    );
  }
};