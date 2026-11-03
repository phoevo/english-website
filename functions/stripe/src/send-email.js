const sdk = require("node-appwrite");

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));

module.exports = async function handleSendEmail({ req, res, client, adminClient }) {
  try {
    const { type, userEmail, userName } = req.bodyJson;
    console.log(`[send-email] type=${type} userEmail=${userEmail} userName=${userName}`);

    if (!type || !userEmail || !userName) {
      return res.json({
        error: "Missing required fields: type, userEmail, userName"
      }, 400);
    }

    // Initialize messaging with admin client
    const messaging = new sdk.Messaging(adminClient);
    const safeName = escapeHtml(userName);

    let subject, content;

    switch (type) {
      case 'welcome':
        subject = 'Welcome to Synomilo';
        content = `
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Welcome to Synomilo</title>
            </head>
            <body style="margin:0;padding:0;background:#f3f3f3;color:#111;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;padding:32px 16px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid #dedede;border-radius:12px;overflow:hidden;">
                      <tr>
                        <td style="padding:24px 28px;background:#111;color:#fff;font-size:20px;font-weight:600;letter-spacing:-.4px;">
                          synomilo
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:32px 28px 36px;">
                          <h1 style="margin:0 0 22px;font-size:28px;line-height:1.2;font-weight:600;letter-spacing:-.8px;color:#111;">
                            English conversations. No fixed lesson plan.
                          </h1>
                          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#222;">Hi ${safeName},</p>
                          <p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:#444;">
                            Your account is ready. Browse conversations, highlight useful language, and save words to your dictionary. Use the material your way.
                          </p>
                          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                            <tr>
                              <td style="border-radius:6px;background:#111;">
                                <a href="https://synomilo.com/home/conversations" style="display:inline-block;padding:13px 20px;color:#fff;text-decoration:none;font-size:14px;font-weight:600;">
                                  Browse conversations
                                </a>
                              </td>
                            </tr>
                          </table>
                          <div style="border-top:1px solid #e5e5e5;padding-top:20px;">
                            <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#222;"><strong>Free</strong> includes every conversation, highlighting, and your dictionary.</p>
                            <p style="margin:0;font-size:14px;line-height:1.6;color:#666;"><strong style="color:#222;">Plus</strong> includes conversation audio.</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:18px 28px;background:#f7f7f7;border-top:1px solid #e5e5e5;color:#777;font-size:12px;line-height:1.6;">
                          This email was sent because you created a Synomilo account. If you didn’t sign up, you can ignore it.
                          <br /><a href="https://synomilo.com/privacy" style="color:#555;">Privacy</a>
                          &nbsp;·&nbsp;<a href="https://synomilo.com/ToS" style="color:#555;">Terms</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `;
        break;

      case 'password-reset':
        subject = 'Reset Your Password - English Website';
        content = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                  <h2>Hi ${userName},</h2>
                  <p>We received a request to reset your password for your Synomilo account.</p>

                  <p>If you requested this password reset, please click the link below to create a new password:</p>

                  <p><strong>Note:</strong> This is a demo email. Password reset functionality will be implemented soon.</p>

                  <p>If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.</p>

                  <p>Best regards,</p>
                  <p><strong>The English Website Team</strong></p>
                </div>
                <div class="footer">
                  <p>This email was sent because a password reset was requested for your account.</p>
                </div>
              </div>
            </body>
          </html>
        `;
        break;

      default:
        return res.json({
          error: "Invalid email type. Supported types: welcome, password-reset"
        }, 400);
    }

    // Resolve userId primarily from the authenticated user's JWT (Account.get),
    // falling back to admin Users.list by email only if needed.
    let userId = null;
    try {
      const account = new sdk.Account(client);
      const me = await account.get();
      userId = me?.$id || null;
      console.log(`[send-email] userId from JWT account.get=${userId}`);
    } catch (e) {
      console.log(`[send-email] account.get failed (will fall back to admin lookup):`, e?.message || e);
    }

    if (!userId) {
      try {
        const users = new sdk.Users(adminClient);
        const result = await users.list([sdk.Query.equal('email', userEmail)]);
        console.log(`[send-email] admin lookup total=${result.total}`);
        if (result.total > 0) {
          userId = result.users?.[0]?.$id || result.documents?.[0]?.$id || result.users?.[0]?.$id;
          console.log(`[send-email] found userId via admin lookup=${userId}`);
        } else {
          console.log(`[send-email] no user found for email=${userEmail}`);
        }
      } catch (e) {
        console.log(`[send-email] admin lookup error:`, e?.message || e);
      }
    }

    if (!userId) {
      return res.json({ error: "Authenticated user not found", details: "No userId from JWT and no admin match by email" }, 404);
    }

    console.log(`[send-email] sending via Messaging to userId=${userId}`);
    const message = await messaging.createEmail(
      sdk.ID.unique(),
      subject,
      content,
      [], // topics
      [userId], // users (Appwrite user IDs)
      [], // targets
      [], // cc
      [], // bcc
      [], // attachments
      false, // draft
      true   // html
    );

    console.log(`[send-email] queued message id=${message.$id}`);
    return res.json({ success: true, messageId: message.$id, message: `${type} email sent successfully to ${userEmail}` }, 200);

  } catch (error) {
    console.error('❌ Failed to send email:', error);

    return res.json({
      error: "Failed to send email",
      details: error.message
    }, 500);
  }
};
