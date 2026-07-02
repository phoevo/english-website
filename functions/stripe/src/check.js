const { Databases, Client, Query } = require("node-appwrite");
const Stripe = require("stripe");
const provision = require("./utils/provision.js");

module.exports = async function handleCheckPayment({
  req,
  res,
  adminClient,
}) {
  const checkoutId = req.query.checkout_id;

  if (!checkoutId) {
    return res.json({ error: "Checkout ID is required" }, 400);
  }

  const databases = new Databases(adminClient);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST, {
    apiVersion: "2023-08-16",
  });

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(checkoutId);

    const subscriptions = await stripe.subscriptions.list({
      customer: checkoutSession.customer,
      limit: 1,
      status: "all",
    });

    const dbId = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const usersCollectionId = process.env.APPWRITE_USERS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

    const usersByCustomer = await databases.listDocuments(
      dbId,
      usersCollectionId,
      [Query.equal("stripeCustomerId", checkoutSession.customer)]
    );

    let userId;
    if (usersByCustomer.total > 0) {
      userId = usersByCustomer.documents[0].$id;
    } else {
      // Fallback: resolve by the checkout session email, then backfill.
      let email = checkoutSession.customer_email || checkoutSession.customer_details?.email;
      if (!email && checkoutSession.customer) {
        try {
          const cust = await stripe.customers.retrieve(checkoutSession.customer);
          email = cust?.email;
        } catch {}
      }

      if (!email) {
        return res.json({ error: "No subscriber found for this checkout." }, 404);
      }

      const users = await databases.listDocuments(dbId, usersCollectionId, [
        Query.equal("email", email),
      ]);

      if (users.total === 0) {
        return res.json({ error: "No subscriber found for this checkout." }, 404);
      }

      userId = users.documents[0].$id;

      try {
        await databases.updateDocument(dbId, usersCollectionId, userId, {
          stripeCustomerId: checkoutSession.customer,
        });
      } catch (err) {
        console.error("Failed to backfill stripeCustomerId on user:", err);
      }
    }

    if (subscriptions.data.length === 0) {
      await provision({
        plan: "free",
        userId,
        adminClient,
      });

      return res.redirect(process.env.FRONTEND_URL);
    }

    const priceId = subscriptions.data[0].items.data[0].price.id;

    let plan;

    switch (priceId) {
      case "price_1RjNY6PoApFikZNYFIHlqq3t":
        plan = "Student Monthly";
        break;
      case "price_1RmIPcPoApFikZNYDnmuR2hA":
        plan = "Student Yearly";
        break;
      case "price_1ScV06PoApFikZNYoWPINm74":
        plan = "Tutor Monthly";
        break;
      case "price_1SyYn4PoApFikZNYC69TOcVL":
        plan = "Tutor Yearly";
        break;
      default:
        plan = "free";
        break;
    }



    await provision({
      plan,
      userId,
      adminClient,
    });

    return res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
  } catch (err) {
    console.error("Error during payment check:", err);
    return res.json({ error: "Unexpected error", details: err.message }, 500);
  }
}
