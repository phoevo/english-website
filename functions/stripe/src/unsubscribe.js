const { Databases, Query, Account } = require("node-appwrite");
const Stripe = require("stripe");

async function handleUnsubscribe({ req, res, client, adminClient, log, error }) {
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

    // Environment check (minimal)
    log("Using STRIPE_SECRET_KEY:", Boolean(process.env.STRIPE_SECRET_KEY_TEST));

    // Always use the server-side secret to avoid test/live mismatches
    const stripeKey = process.env.STRIPE_SECRET_KEY_TEST;

    if (!stripeKey) {
      error("ERROR: STRIPE_SECRET_KEY is missing");
      return res.json({ error: "Missing Stripe API key" }, 500);
    }

    if (process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY_TEST) {
      log("Warning: NEXT_PUBLIC_STRIPE_SECRET_KEY is set; ignoring in server function");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-08-16",
    });

    log("Stripe initialized successfully with key");
    // Diagnostics: show which Stripe account/mode this function is using
    try {
      const acct = await stripe.accounts.retrieve();
      log("Stripe account", { id: acct.id, livemode: acct.livemode });
    } catch (acctErr) {
      error("Failed to retrieve Stripe account", { message: acctErr?.message });
    }

    const databases = new Databases(adminClient);

    const dbId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const stripeCustomersCollectionId = process.env.APPWRITE_STRIPE_CUSTOMERS_ID || process.env.NEXT_PUBLIC_APPWRITE_STRIPE_CUSTOMERS_ID || '687a74fb003d6808b5fd';
    const usersCollectionId = process.env.APPWRITE_USERS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

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

    let stripe_customer_id;
    if (customerDocs.total === 0) {
      log("No Stripe customer mapping; attempting email-based lookup...");
      const account = new Account(client);
      let email = undefined;
      try {
        const me = await account.get();
        email = me?.email;
      } catch {}
      if (email) {
        const found = await stripe.customers.list({ email, limit: 1 });
        if (found.data.length > 0) {
          stripe_customer_id = found.data[0].id;
          // Upsert mapping for future operations
          try {
            await databases.createDocument(
              dbId,
              stripeCustomersCollectionId,
              user_id,
              { user_id, stripe_customer_id }
            );
          } catch {
            // If doc exists, update
            try {
              const existing = await databases.listDocuments(dbId, stripeCustomersCollectionId, [Query.equal("user_id", user_id)]);
              if (existing.total > 0) {
                await databases.updateDocument(dbId, stripeCustomersCollectionId, existing.documents[0].$id, { stripe_customer_id });
              }
            } catch {}
          }
        }
      }
      if (!stripe_customer_id) {
        log("No Stripe customer found by email; treating as already unsubscribed.");
        await databases.updateDocument(dbId, usersCollectionId, user_id, { isSubscribed: false });
        return res.json({ success: true });
      }
    } else {
      const customer = customerDocs.documents[0];
      stripe_customer_id = customer.stripe_customer_id;
      log("Found Stripe customer ID:", !!stripe_customer_id);
      if (!stripe_customer_id) {
        log("No stripe_customer_id present in mapping; treating as already unsubscribed.");
        await databases.updateDocument(dbId, usersCollectionId, user_id, { isSubscribed: false });
        return res.json({ success: true });
      }
    }

    // ✅ Step 2: Verify the Stripe customer exists; if not, treat as already unsubscribed
    log("Step 2: Verifying Stripe customer exists...");
    let customerExists = true;
    try {
      await stripe.customers.retrieve(stripe_customer_id);
    } catch (custErr) {
      const msg = custErr && custErr.message ? String(custErr.message) : "";
      const code = custErr && custErr.code ? String(custErr.code) : "";
      if (msg.includes("No such customer") || code === "resource_missing") {
        customerExists = false;
        log("Customer not found in Stripe; proceeding to mark user unsubscribed without Stripe cancellation.");
      } else {
        throw custErr;
      }
    }

    let subscriptions = { data: [] };
    if (customerExists) {
      log("Fetching active subscriptions from Stripe...");
      subscriptions = await stripe.subscriptions.list({
        customer: stripe_customer_id,
        status: 'active'
      });
      log("Active subscriptions found:", subscriptions.data.length);
    } else {
      log("Skipping subscription list because customer does not exist.");
    }

    if (subscriptions.data.length === 0) {
      log("No active subscriptions found for customer or customer missing");
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

    // Optional cleanup: remove stale mapping if customer didn't exist
    if (typeof customerExists !== 'undefined' && !customerExists) {
      try {
        const toDelete = await databases.listDocuments(dbId, stripeCustomersCollectionId, [
          Query.equal("user_id", user_id),
        ]);
        for (const doc of toDelete.documents) {
          await databases.deleteDocument(dbId, stripeCustomersCollectionId, doc.$id);
        }
        log("Removed stale stripe_customers mapping");
      } catch (cleanupErr) {
        error("Failed to remove stale stripe_customers mapping", { message: cleanupErr?.message });
      }
    }

    log("Unsubscribe process completed successfully");
    return res.json({ success: true });
  } catch (err) {
    error("Unsubscribe error:", err);
    return res.json({ error: "Unsubscribe failed", details: err.message }, 500);
  }
}

module.exports = handleUnsubscribe;
