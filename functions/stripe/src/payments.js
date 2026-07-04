const { Databases, Account } = require("node-appwrite");
const Stripe = require("stripe");

const serverPlans = [
  "Student Monthly",
  "Student Yearly",
  "Tutor Monthly",
  "Tutor Yearly",
];

const priceMap = {
  "Student Monthly": "price_1TdZO8L2R3rDklxBcFuGHgko",
  "Student Yearly": "price_1TdZPSL2R3rDklxBhKtzSVX0",
  "Tutor Monthly": "price_1TdZQ2L2R3rDklxB4yDMyHKS",
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
        email: user.email,
        name: user.name,
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
      success_url: `${baseUrl}/home?success=true`,
      cancel_url: `${baseUrl}/subscribe?canceled=true`,
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