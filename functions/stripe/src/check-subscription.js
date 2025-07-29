const { Account } = require("node-appwrite");
const Stripe = require("stripe");

module.exports = async function handleCheckSubscription({
  req,
  res,
  client,
}) {
  const account = new Account(client);

  try {
    // Debug environment variables
    console.log("Environment variables check:");
    console.log("NEXT_PUBLIC_STRIPE_SECRET_KEY:", process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ? "✓ Present" : "✗ Missing");
    console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "✓ Present" : "✗ Missing");
    
    // Get the current user
    const user = await account.get();
    console.log("User found:", user.email);
    
    if (!user) {
      return res.json({ isSubscribed: false }, 401);
    }

    // Initialize Stripe (try both possible env var names)
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;
    
    if (!stripeKey) {
      console.error("No Stripe secret key found in environment variables");
      return res.json({ isSubscribed: false, error: "Missing Stripe key" }, 500);
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-08-16",
    });
    
    console.log("Stripe initialized successfully");

    // Find customer by email
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    console.log(`Found ${customers.data.length} customers for email:`, user.email);

    if (customers.data.length === 0) {
      console.log("No customer found in Stripe");
      return res.json({ isSubscribed: false, reason: "No customer found" });
    }

    const customerId = customers.data[0].id;
    console.log("Customer ID:", customerId);

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    console.log(`Found ${subscriptions.data.length} active subscriptions`);
    
    // Also check for all subscriptions (to debug)
    const allSubscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
    });
    
    console.log(`Total subscriptions (all statuses): ${allSubscriptions.data.length}`);
    allSubscriptions.data.forEach((sub, index) => {
      console.log(`Subscription ${index + 1}: Status=${sub.status}, Created=${new Date(sub.created * 1000).toISOString()}`);
    });

    const isSubscribed = subscriptions.data.length > 0;

    return res.json({ 
      isSubscribed,
      planCount: subscriptions.data.length,
      totalSubscriptions: allSubscriptions.data.length,
      customerId 
    });

  } catch (error) {
    console.error("Check subscription error:", error);
    return res.json({ isSubscribed: false }, 500);
  }
};
