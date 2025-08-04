const { Messaging, ID } = require("node-appwrite");

module.exports = async function handleSendEmail({ req, res, client, adminClient }) {
  try {
    const { type, userEmail, userName } = req.bodyJson;

    if (!type || !userEmail || !userName) {
      return res.json({ 
        error: "Missing required fields: type, userEmail, userName" 
      }, 400);
    }

    // Initialize messaging with admin client
    const messaging = new Messaging(adminClient);
    
    // Get the email provider ID from environment variables
    const EMAIL_PROVIDER_ID = process.env.APPWRITE_EMAIL_PROVIDER_ID;
    
    if (!EMAIL_PROVIDER_ID) {
      return res.json({ 
        error: "Email provider not configured" 
      }, 500);
    }

    let subject, content;

    switch (type) {
      case 'welcome':
        subject = 'Welcome to English Website!';
        content = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; }
                ul { padding-left: 20px; }
                li { margin-bottom: 8px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to English Website!</h1>
                </div>
                <div class="content">
                  <h2>Hi ${userName},</h2>
                  <p>Thank you for signing up for our English learning platform. We're excited to have you on board and can't wait to help you improve your English skills!</p>
                  
                  <h3>Here's what you can do next:</h3>
                  <ul>
                    <li>Complete your profile setup</li>
                    <li>Browse our learning materials</li>
                    <li>Start your first lesson</li>
                    <li>Connect with other learners</li>
                  </ul>
                  
                  <p>If you have any questions or need help getting started, feel free to reach out to our support team.</p>
                  
                  <p>Happy learning!</p>
                  <p><strong>The English Website Team</strong></p>
                </div>
                <div class="footer">
                  <p>This email was sent because you signed up for English Website. If you didn't sign up, please ignore this email.</p>
                </div>
              </div>
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
                  <p>We received a request to reset your password for your English Website account.</p>
                  
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

    // Send the email
    const message = await messaging.createEmail(
      ID.unique(),
      subject,
      content,
      [], // topics
      [userEmail], // targets (recipients)
      [], // cc
      [], // bcc
      [], // attachments
      false, // draft
      true, // html
      EMAIL_PROVIDER_ID
    );

    console.log('✅ Email sent successfully:', message);
    
    return res.json({ 
      success: true, 
      messageId: message.$id,
      message: `${type} email sent successfully to ${userEmail}`
    }, 200);
    
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    
    return res.json({ 
      error: "Failed to send email", 
      details: error.message 
    }, 500);
  }
};
