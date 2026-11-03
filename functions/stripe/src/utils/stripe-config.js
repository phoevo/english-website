const Stripe = require("stripe");

function getStripeConfig() {
  const mode = (process.env.STRIPE_MODE || "live").toLowerCase();
  if (mode !== "live" && mode !== "test") {
    throw new Error('STRIPE_MODE must be either "live" or "test"');
  }

  const isTest = mode === "test";
  const secretKey = process.env[isTest ? "STRIPE_SECRET_KEY_TEST" : "STRIPE_SECRET_KEY"];
  const webhookSecret = process.env[isTest ? "STRIPE_WEBHOOK_SECRET_TEST" : "STRIPE_WEBHOOK_SECRET"];
  const monthlyPriceId = process.env[isTest ? "STRIPE_MONTHLY_SANDBOX" : "STRIPE_MONTHLY_LIVE"];
  const yearlyPriceId = process.env[isTest ? "STRIPE_YEARLY_SANDBOX" : "STRIPE_YEARLY_LIVE"];

  const required = {
    [isTest ? "STRIPE_SECRET_KEY_TEST" : "STRIPE_SECRET_KEY"]: secretKey,
    [isTest ? "STRIPE_MONTHLY_SANDBOX" : "STRIPE_MONTHLY_LIVE"]: monthlyPriceId,
    [isTest ? "STRIPE_YEARLY_SANDBOX" : "STRIPE_YEARLY_LIVE"]: yearlyPriceId,
  };
  if (Object.entries(required).some(([, value]) => !value)) {
    const missing = Object.entries(required)
      .filter(([, value]) => !value)
      .map(([name]) => name);
    throw new Error(`Missing Stripe ${mode} environment variables: ${missing.join(", ")}`);
  }

  return {
    mode,
    stripe: new Stripe(secretKey, { apiVersion: "2023-08-16" }),
    webhookSecret,
    priceIds: {
      "Synomilo Monthly": monthlyPriceId,
      "Synomilo Yearly": yearlyPriceId,
    },
    priceToPlan: {
      [monthlyPriceId]: "Synomilo Monthly",
      [yearlyPriceId]: "Synomilo Yearly",
    },
  };
}

module.exports = { getStripeConfig };
