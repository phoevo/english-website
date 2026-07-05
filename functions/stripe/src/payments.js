const { Databases, Account } = require("node-appwrite");
const Stripe = require("stripe");

const serverPlans = [
  "Student Monthly",
  "Student Yearly",
  "Tutor Monthly",
  "Tutor Yearly",
];

const priceMap = {
  "Student Monthly": "price_1TpZBNL2R3rDklxBncRgUey9",
  "Student Yearly": "price_1TdZPSL2R3rDklxBhKtzSVX0",
  "Tutor Monthly": "price_1TpZLxL2R3rDklxB0dwVxVU2",
  "Tutor Yearly": "price_1TdZRFL2R3rDklxBcfkm5QxD",
};

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

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16",
    });

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
  mode: "subscription",

  line_items: [
    {
      price: priceMap[plan],
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

  success_url: `${baseUrl}/pricing/success`,
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