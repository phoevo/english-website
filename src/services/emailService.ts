export interface WelcomeEmailData {
  userEmail: string;
  userName: string;
}

export const sendWelcomeEmail = async (data: WelcomeEmailData) => {
  try {
    const FUNCTION_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_API_ENDPOINT!;
    
    const response = await fetch(`${FUNCTION_ENDPOINT}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'welcome',
        userEmail: data.userEmail,
        userName: data.userName
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    console.log('✅ Welcome email sent:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (data: WelcomeEmailData) => {
  try {
    const FUNCTION_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_API_ENDPOINT!;
    
    const response = await fetch(`${FUNCTION_ENDPOINT}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'password-reset',
        userEmail: data.userEmail,
        userName: data.userName
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send password reset email');
    }

    console.log('✅ Password reset email sent:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to send password reset email:', error);
    throw error;
  }
};
