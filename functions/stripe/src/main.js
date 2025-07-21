const { Client } = require("node-appwrite");

// Import your handlers
const handlePayments = require("./payments.js");
const handleWebhook = require("./webhook.js");
const handleCheckPayment = require("./check.js");
const handleGetSubscription = require("./get-subscription.js");
const handleUnsubscribe = require("./unsubscribe.js");
const handleCheckSubscription = require("./check-subscription.js");


// Main handler
module.exports = async function main({
  req,
  res,
  log,
  error,
}) {
  log("Function started with path:", req.path);
  log("Request method:", req.method);
  log("Request headers:", JSON.stringify(req.headers));

 let bodyJson = {};
try {
  bodyJson = req.bodyJson ?? {};
  log("Parsed request body:", bodyJson);
} catch (err) {
  log("No valid JSON body (this is normal for GET requests):", err.message);
}




  // Admin client: privileged access using API Key
  const adminClient = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(req.headers["x-appwrite-key"] || "");

  // Authenticated user client: using JWT
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setJWT(req.headers["x-appwrite-user-jwt"] || "");

  // Check if JWT is provided for user authentication (except for webhook)
  if (req.path !== "/webhook" && !req.headers["x-appwrite-user-jwt"]) {
    error("No JWT token provided");
    return res.json({ error: "Authentication required" }, 401);
  }

  try {
    log("Routing to handler for path:", req.path);
    switch (req.path) {
      case "/payments":
        log("Calling payments handler");
        return await handlePayments({ req, res, client, adminClient });

      case "/webhook":
        log("Calling webhook handler");
        return await handleWebhook({ req, res, client, adminClient });

      case "/check":
        log("Calling check handler");
        return await handleCheckPayment({ req, res, client, adminClient });

      case "/get-subscription":
        log("Calling get-subscription handler");
        return await handleGetSubscription({ req, res, client, adminClient });

      case "/unsubscribe":
        log("Calling unsubscribe handler");
        return await handleUnsubscribe({ req, res, client, adminClient, log, error });

      case "/check-subscription":
        log("Calling check-subscription handler");
        return await handleCheckSubscription({ req, res, client });

      default:
        error("Invalid path provided:", req.path);
        return res.json({ error: "Invalid path", path: req.path }, 404);


    }
  } catch (err) {
    error("Function Error:", err);
    return res.json({ error: "Internal server error", details: err.message }, 500);
  }
}
