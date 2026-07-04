const { Databases } = require("node-appwrite");
const Stripe = require("stripe");

module.exports = async function handleUnsubscribe({
  req,
  res,
  adminClient,
  log,
  error,
}) {
  try {
    const { userId } = req.bodyJson || {};

    if (!userId) {
      return res.json({ error: "Missing userId" }, 400);
    }

    const databases = new Databases(adminClient);

    const dbId =
      process.env.APPWRITE_DATABASE_ID ||
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

    const usersCollectionId =
      process.env.APPWRITE_USERS_COLLECTION_ID ||
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

    if (!dbId || !usersCollectionId) {
      throw new Error("Missing DB or Collection env vars");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16",
    });

    // =========================
    // STEP 1: Get user doc
    // =========================
    const userDoc = await databases.getDocument(
      dbId,
      usersCollectionId,
      userId
    );

    const stripeCustomerId = userDoc.stripeCustomerId;

    if (!stripeCustomerId) {
      log("No Stripe customer found → updating Appwrite only");

      await databases.updateDocument(dbId, usersCollectionId, userId, {
        isSubscribed: false,
      });

      return res.json({ success: true });
    }

    // =========================
    // STEP 2: Get ALL subscriptions
    // =========================
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: "all",
    });

    const activeSubs = subscriptions.data.filter(
      (sub) => sub.status !== "canceled"
    );

    log("Found subs:", subscriptions.data.length);
    log("Active subs:", activeSubs.length);

    // =========================
    // STEP 3: Cancel subscriptions (safe)
    // =========================
    let stripeError = null;

    try {
      await Promise.allSettled(
        activeSubs.map((sub) =>
          stripe.subscriptions.cancel(sub.id)
        )
      );
    } catch (err) {
      stripeError = err;
      log("Stripe cancel error:", err);
    }

    // =========================
    // STEP 4: ALWAYS update Appwrite (source of UI truth)
    // =========================
    await databases.updateDocument(
  dbId,
  usersCollectionId,
  userDoc.$id,
  {
    isSubscribed: false,
  }
);
    return res.json({
      success: true,
      stripeError: stripeError?.message || null,
    });

  } catch (err) {
    error("Unsubscribe error:", err);

    return res.json(
      {
        error: "Unsubscribe failed",
        details: err.message,
      },
      500
    );
  }
};