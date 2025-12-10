const { Account, Client, Databases, Query } = require("node-appwrite");
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

    // Get Stripe customer ID from our customers collection
    const stripeCustomersCollectionId = '687a74fb003d6808b5fd';
    const customerDocs = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      stripeCustomersCollectionId,
      [Query.equal("user_id", user.$id)]
    );

    if (customerDocs.total === 0) {
      // Fallback: try finding by email in Stripe
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length === 0) {
        return res.json({ plan: "free", hasActiveSubscription: false });
      }
      const stripe_customer_id = customers.data[0].id;
      // Continue flow below using this stripe_customer_id without relying on DB mapping
      const subscriptions = await stripe.subscriptions.list({ customer: stripe_customer_id, status: 'active' });
      if (subscriptions.data.length === 0) {
        return res.json({ plan: "free", hasActiveSubscription: false });
      }
      const activeSubscription = subscriptions.data[0];
      const priceId = activeSubscription.items.data[0].price.id;
      let planName = "free";
      if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID) planName = "Student Monthly";
      else if (priceId === process.env.STRIPE_YEARLY_PRICE_ID) planName = "Student Yearly";
      else if (priceId === process.env.STRIPE_TUTOR_MONTHLY) planName = "Tutor Monthly";
      else if (priceId === process.env.STRIPE_TUTOR_PERSEAT) planName = "Tutor per seat";
      return res.json({ plan: planName, hasActiveSubscription: true, subscriptionId: activeSubscription.id, status: activeSubscription.status });
    }

    const customer = customerDocs.documents[0];
    const stripe_customer_id = customer.stripe_customer_id;

    if (!stripe_customer_id) {
      return res.json({
        plan: "free",
        hasActiveSubscription: false
      });
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

    // Map price IDs to plan names (you'll need to adjust these based on your Stripe setup)
    let planName = "free";
    if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID) {
      planName = "Student Monthly";
    } else if (priceId === process.env.STRIPE_YEARLY_PRICE_ID) {
      planName = "Student Yearly";
    } else if (priceId === process.env.STRIPE_SYNOMILO_TUTOR) {
      planName = "Tutor Monthly";
    } else if (priceId === process.env.STRIPE_SYNOMILO_TUTOR) {
      planName = "Tutor per seat";
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
