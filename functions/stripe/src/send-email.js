const sdk = require("node-appwrite");

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


    let subject, content;

    switch (type) {
      case 'welcome':
        subject = 'Welcome to Synomilo!';
        content = `
          <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Synomilo</title>
  </head>

  <body style="margin:0; padding:0; background:#f6f7fb; font-family:Arial, Helvetica, sans-serif; color:#111111;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7fb; padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e5e7eb;">

            <tr>
              <td style="padding:40px 28px 28px; text-align:center; background:#1e1e1e;">
                <img
                  src="https://synomilo.com/favicon-96x96.png"
                  alt="Synomilo"
                  width="64"
                  height="64"
                  style="display:block; margin:0 auto 20px; border:0; outline:none;"
                />

                <h1 style="margin:0; color:#ffffff; font-size:30px; line-height:1.2; font-weight:700;">
                  Welcome to Synomilo
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:32px 28px; background:#ffffff;">
                <h2 style="margin:0 0 16px; font-size:22px; line-height:1.3; color:#111111;">
                  Hi ${userName},
                </h2>

                <p style="margin:0 0 20px; font-size:16px; line-height:1.6; color:#333333;">
                  Thanks for signing up to Synomilo. I'm excited to have you join during early access.
                </p>

                <div style="text-align:center; margin:28px 0;">
                  <a
                    href="https://synomilo.com/home"
                    style="background:#1e1e1e; color:#ffffff; text-decoration:none; padding:14px 24px; border-radius:10px; display:inline-block; font-size:15px; font-weight:bold;"
                  >
                    Go to Synomilo
                  </a>
                </div>

                <h2 style="margin:32px 0 12px; font-size:24px; line-height:1.3; color:#111111;">
                  What you can do next
                </h2>

                <h3 style="margin:20px 0 8px; font-size:18px; color:#111111;">
                  Students
                </h3>

                <ul style="margin:0; padding-left:20px; font-size:15px; line-height:1.7; color:#333333;">
                  <li>Start your first conversation</li>
                  <li>Add a word to your Dictionary</li>
                  <li>Add your tutor on the Assignments page</li>
                  <li>Build and maintain your learning streak</li>
                  <li>Send feedback on what was good, bad, or needs to change for student users. I'm actively shaping Synomilo around early users.</li>
                </ul>

                <h3 style="margin:24px 0 8px; font-size:18px; color:#111111;">
                  Tutors
                </h3>

                <ul style="margin:0; padding-left:20px; font-size:15px; line-height:1.7; color:#333333;">
                  <li>Add your students on the Assignments page</li>
                  <li>Browse the learning materials</li>
                  <li>Use Synomilo during one of your lessons</li>
                  <li>Send feedback on what was good, bad, or needs to change for tutors. I want Synomilo to be as useful as possible for your lessons.</li>
                </ul>

                <h2 style="margin:32px 0 12px; font-size:24px; line-height:1.3; color:#111111;">
                  Coming soon
                </h2>

                <ul style="margin:0; padding-left:20px; font-size:15px; line-height:1.7; color:#333333;">
                  <li>New link sharing, so tutors can share a conversation with a student without requiring an account.</li>
                  <li>More progress tracking for tutors and students</li>
                  <li>More features shaped by user feedback</li>
                </ul>

                <p style="margin:28px 0 0; font-size:16px; line-height:1.6; color:#333333;">
                  Thanks again for joining early.
                </p>

                <p style="margin:18px 0 0; font-size:16px; color:#111111;">
                  <strong>The Synomilo Team</strong>
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 28px; text-align:center; background:#f9fafb; color:#6b7280; font-size:12px; line-height:1.5;">
                This email was sent because you signed up for Synomilo.
                If you didn’t sign up, you can ignore this email.
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
