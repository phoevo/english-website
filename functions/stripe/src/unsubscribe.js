const { Databases, Query } = require("node-appwrite");
const Stripe = require("stripe");

async function handleUnsubscribe({ req, res, adminClient, log, error }) {
  log("Request body:", req.bodyJson);
  try {
    // Use the already parsed body from main.js
    const body = req.bodyJson || {};
    const { user_id } = body;
    log("Processing user_id:", user_id);

    if (!user_id) {
      error("ERROR: Missing user_id");
      return res.json({ error: "Missing user_id" }, 400);
    }

    log("Initializing Stripe and Appwrite clients...");
    
    // Debug environment variables
    log("Environment variables check:");
    log("NEXT_PUBLIC_STRIPE_SECRET_KEY:", process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ? "✓ Present" : "✗ Missing");
    log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "✓ Present" : "✗ Missing");
    
    // Use the same key pattern as other working functions
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;
    
    if (!stripeKey) {
      error("ERROR: No Stripe secret key found in environment variables");
      return res.json({ error: "Missing Stripe API key" }, 500);
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-08-16",
    });
    
    log("Stripe initialized successfully with key");
    const databases = new Databases(adminClient);

    const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const stripeCustomersCollectionId = '687a74fb003d6808b5fd';
    const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

    log("Environment variables:", {
      dbId: !!dbId,
      usersCollectionId: !!usersCollectionId
    });

    if (!dbId || !usersCollectionId) {
      error("ERROR: Missing environment variables");
      throw new Error("Missing required environment variables");
    }

    // ✅ Step 1: Get Stripe customer ID from stripe_customers collection
    log("Step 1: Looking up Stripe customer ID...");
    const customerDocs = await databases.listDocuments(dbId, stripeCustomersCollectionId, [
      Query.equal("user_id", user_id),
    ]);
    log("Customer docs found:", customerDocs.total);

    if (customerDocs.total === 0) {
      error("ERROR: No Stripe customer found for user");
      return res.json({ error: "No Stripe customer found for this user." }, 404);
    }

    const customer = customerDocs.documents[0];
    const stripe_customer_id = customer.stripe_customer_id;
    log("Found Stripe customer ID:", !!stripe_customer_id);

    if (!stripe_customer_id) {
      error("ERROR: No stripe_customer_id found in customer document");
      return res.json({ error: "No stripe_customer_id found for user." }, 400);
    }

    // ✅ Step 2: Get active subscriptions from Stripe and cancel them
    log("Step 2: Fetching active subscriptions from Stripe...");
    const subscriptions = await stripe.subscriptions.list({
      customer: stripe_customer_id,
      status: 'active'
    });
    log("Active subscriptions found:", subscriptions.data.length);

    if (subscriptions.data.length === 0) {
      log("No active subscriptions found for customer");
      // Still continue to update user profile
    } else {
      // Cancel all active subscriptions
      log("Step 3: Canceling active subscriptions...");
      await Promise.all(
        subscriptions.data.map(async (subscription) => {
          log(`Canceling subscription: ${subscription.id}`);
          return await stripe.subscriptions.cancel(subscription.id);
        })
      );
      log("All active subscriptions canceled");
    }

    // ✅ Step 4: Update user's profile to set isSubscribed to false
    log("Step 4: Updating user profile...");
    try {
      await databases.updateDocument(
        dbId,
        usersCollectionId,
        user_id,
        {
          isSubscribed: false
        }
      );
      log("User profile updated: isSubscribed=false");
    } catch (updateError) {
      error("Error updating user profile:", updateError);
      // Still return success since Stripe subscriptions were handled
    }

    log("Unsubscribe process completed successfully");
    return res.json({ success: true });
  } catch (err) {
    error("Unsubscribe error:", err);
    return res.json({ error: "Unsubscribe failed", details: err.message }, 500);
  }
}

module.exports = handleUnsubscribe;
