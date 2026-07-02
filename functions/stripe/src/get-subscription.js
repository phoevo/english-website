const { Account, Client, Databases } = require("node-appwrite");
const Stripe = require("stripe");

module.exports = async function handleGetSubscription({
  req,
  res,
  client,
  adminClient,
}) {
  const databases = new Databases(adminClient);
  const account = new Account(client);

  try {
    const user = await account.get();

    if (!user) {
      return res.json(
        {
          error: "Access Denied. This action requires an account. Please sign in to continue.",
        },
        401
      );
    }

    if (req.method !== "GET") {
      return res.json({ error: "Method not allowed" }, 405);
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST, {
      apiVersion: "2023-08-16",
    });

    // Get Stripe customer ID directly from the user's document
    const dbId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const usersCollectionId = process.env.APPWRITE_USERS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

    const userDoc = await databases.getDocument(dbId, usersCollectionId, user.$id);
    let stripe_customer_id = userDoc.stripeCustomerId;

    if (!stripe_customer_id) {
      // Fallback: try finding by email in Stripe, then backfill onto the user doc
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length === 0) {
        return res.json({ plan: "free", hasActiveSubscription: false });
      }
      stripe_customer_id = customers.data[0].id;

      try {
        await databases.updateDocument(dbId, usersCollectionId, user.$id, {
          stripeCustomerId: stripe_customer_id,
        });
      } catch (err) {
        console.error("Failed to backfill stripeCustomerId on user:", err);
      }
    }

    // Get active subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: stripe_customer_id,
      status: 'active'
    });

    if (subscriptions.data.length === 0) {
      return res.json({
        plan: "free",
        hasActiveSubscription: false
      });
    }

    // Get the first active subscription
    const activeSubscription = subscriptions.data[0];
    const priceId = activeSubscription.items.data[0].price.id;

    // Map price IDs to plan names (same env vars + fallbacks as webhook.js)
    const PRICE_STUDENT_MONTHLY = process.env.STRIPE_MONTHLY_PRICE_ID || "price_1RjNY6PoApFikZNYFIHlqq3t";
    const PRICE_STUDENT_YEARLY = process.env.STRIPE_YEARLY_PRICE_ID || "price_1RmIPcPoApFikZNYDnmuR2hA";
    const PRICE_TUTOR_MONTHLY = process.env.STRIPE_TUTOR_MONTHLY || "price_1ScV06PoApFikZNYoWPINm74";
    const PRICE_TUTOR_YEARLY = process.env.STRIPE_TUTOR_YEARLY || "price_1SyYn4PoApFikZNYC69TOcVL";

    let planName = "free";
    if (priceId === PRICE_STUDENT_MONTHLY) {
      planName = "Student Monthly";
    } else if (priceId === PRICE_STUDENT_YEARLY) {
      planName = "Student Yearly";
    } else if (priceId === PRICE_TUTOR_MONTHLY) {
      planName = "Tutor Monthly";
    } else if (priceId === PRICE_TUTOR_YEARLY) {
      planName = "Tutor Yearly";
    }

    return res.json({
      plan: planName,
      hasActiveSubscription: true,
      subscriptionId: activeSubscription.id,
      status: activeSubscription.status
    });
  } catch (err) {
    console.error("Subscription check failed:", err);
    return res.json(
      { error: "Unexpected error", details: err.message },
      500
    );
  }
}
