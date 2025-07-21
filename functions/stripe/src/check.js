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
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {

  });

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(checkoutId);

    const subscriptions = await stripe.subscriptions.list({
      customer: checkoutSession.customer,
      limit: 1,
      status: "all",
    });

    const subscriberDoc = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_STRIPE_CUSTOMERS_ID,
      [Query.equal("stripe_customer_id", checkoutSession.customer)]
    );

    if (subscriberDoc.documents.length === 0) {
      return res.json({ error: "No subscriber found for this checkout." }, 404);
    }

    if (subscriptions.data.length === 0) {
      await provision({
        plan: "free",
        userId: subscriberDoc.documents[0].user_id,
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
      default:
        plan = "free";
        break;
    }

    await provision({
      plan,
      userId: subscriberDoc.documents[0].user_id,
      adminClient,
    });

    return res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
  } catch (err) {
    console.error("Error during payment check:", err);
    return res.json({ error: "Unexpected error", details: err.message }, 500);
  }
}
