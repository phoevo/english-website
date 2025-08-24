const sdk = require("node-appwrite");

module.exports = async function handleSendResetNotice({ req, res, adminClient }) {
  try {
    if (req.method !== "POST") {
      return res.json({ error: "Method not allowed" }, 405);
    }

    const body = req.bodyJson || {};
    const email = (body.email || "").toString().trim();
    console.log(`[reset-notice] received request for email=${email}`);

    if (!email) {
      return res.json({ error: "Email is required" }, 400);
    }

    const messaging = new sdk.Messaging(adminClient);
    const users = new sdk.Users(adminClient);

    // Try to find the Appwrite User ID by email
    let userId = null;
    try {
      const result = await users.list([sdk.Query.equal('email', email)]);
      console.log(`[reset-notice] lookup total=${result.total}`);
      if (result.total > 0) {
        userId = result.users?.[0]?.$id || result.documents?.[0]?.$id || result.users?.[0]?.$id;
        console.log(`[reset-notice] found userId=${userId}`);
      } else {
        console.log(`[reset-notice] no user found for email=${email}`);
      }
    } catch (lookupErr) {
      console.log(`[reset-notice] lookup error (ignored):`, lookupErr?.message || lookupErr);
      // swallow lookup errors to avoid user enumeration
    }

    const subject = "Password reset request";
    const content = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Password reset requested</h2>
            <p>If you requested a password reset, we just sent you an email with a secure link to reset your password.</p>
            <p>Please check your inbox (and spam folder) for the message. If you didn't request this, you can safely ignore this email.</p>
            <p style="margin-top: 24px;">— English Website</p>
          </div>
        </body>
      </html>
    `;

    try {
      if (userId) {
        console.log(`[reset-notice] sending email via Messaging to userId=${userId}`);
        const msg = await messaging.createEmail(
          sdk.ID.unique(),
          subject,
          content,
          [],           // topics
          [userId],     // users (Appwrite user IDs)
          [],           // targets
          [],           // cc
          [],           // bcc
          [],           // attachments
          false,        // draft
          true          // html
        );
        console.log(`[reset-notice] queued message id=${msg.$id}`);
      } else {
        console.log(`[reset-notice] skipping send (no user for email=${email})`);
      }
    } catch (sendErr) {
      console.error("Failed to send reset notice email:", sendErr);
      // Still respond OK to avoid exposing details about delivery state
      return res.json({ success: true }, 200);
    }

    console.log(`[reset-notice] done`);
    return res.json({ success: true }, 200);
  } catch (err) {
    console.error("Unexpected error in handleSendResetNotice:", err);
    // Respond OK to avoid user enumeration/content disclosure
    return res.json({ success: true }, 200);
  }
};
