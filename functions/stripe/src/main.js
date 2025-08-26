const { Client } = require("node-appwrite");

// Import your handlers
const handlePayments = require("./payments.js");
const handleWebhook = require("./webhook.js");
const handleCheckPayment = require("./check.js");
const handleGetSubscription = require("./get-subscription.js");
const handleUnsubscribe = require("./unsubscribe.js");
const handleCheckSubscription = require("./check-subscription.js");
const handleSendEmail = require("./send-email.js");
const handleSendResetNotice = require("./send-reset-notice.js");

// Main handler
module.exports = async function main({ req, res, log, error }) {
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

  const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
  const PROJECT_ID = process.env.APPWRITE_FUNCTION_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
  const API_KEY = process.env.APPWRITE_API_KEY || "";

  log("Has admin API key:", Boolean(API_KEY));
  log("Project ID present:", Boolean(PROJECT_ID));

  // Admin client: privileged access using API Key (from function env, not headers)
  const adminClient = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
  if (API_KEY) {
    adminClient.setKey(API_KEY);
  }

  // Authenticated user client: using JWT
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID)
    .setJWT(req.headers["x-appwrite-user-jwt"] || "");

  // Allow unauthenticated for specific public routes
  const isPublicRoute = ["/webhook", "/send-reset-notice"].includes(req.path);
  if (!isPublicRoute && !req.headers["x-appwrite-user-jwt"]) {
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

      case "/send-email":
        log("Calling send-email handler");
        return await handleSendEmail({ req, res, client, adminClient });

      case "/send-reset-notice":
        log("Calling send-reset-notice handler");
        if (!API_KEY) {
          error("Missing APPWRITE_API_KEY env var; cannot call Messaging (messages.write)");
          return res.json({ success: true }, 200); // avoid leaking config but stop early
        }
        return await handleSendResetNotice({ req, res, adminClient });

      default:
        error("Invalid path provided:", req.path);
        return res.json({ error: "Invalid path", path: req.path }, 404);
    }
  } catch (err) {
    error("Function Error:", err);
    return res.json({ error: "Internal server error", details: err.message }, 500);
  }
}
