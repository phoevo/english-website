import { Client, Functions } from 'appwrite';

export interface WelcomeEmailData {
  userEmail: string;
  userName: string;
}

function getUserJWT(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("jwt");
  } catch {
    return null;
  }
}

const FUNCTION_ID = "68794e830018a53dcad6"; // Appwrite function ID

function getEndpoint(): string {
  return (
    process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_API_ENDPOINT ||
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    'https://cloud.appwrite.io/v1'
  );
}

function getProjectId(): string {
  return process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
}

export const sendWelcomeEmail = async (data: WelcomeEmailData) => {
  try {
    const jwt = getUserJWT();
    if (!jwt) throw new Error('Missing user JWT for sending welcome email');

    const client = new Client()
      .setEndpoint(getEndpoint())
      .setProject(getProjectId())
      .setJWT(jwt);

    const functions = new Functions(client);

    const res = await functions.createExecution(
      FUNCTION_ID,
      JSON.stringify({
        type: 'welcome',
        userEmail: data.userEmail,
        userName: data.userName,
      }),
      false,
      '/send-email',
      'POST',
      { 'content-type': 'application/json' }
    );

    if (res.status !== 'completed') {
      throw new Error('Function execution did not complete successfully');
    }

    const result = JSON.parse(res.responseBody || res.response || '{}');
    if (result?.error) throw new Error(result.error);

    console.log('✅ Welcome email sent:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    throw error;
  }
};

// Optional helper if you ever want a custom email via your function
export const sendPasswordResetEmail = async (data: WelcomeEmailData) => {
  try {
    const jwt = getUserJWT();
    if (!jwt) throw new Error('Missing user JWT for sending password reset email');

    const client = new Client()
      .setEndpoint(getEndpoint())
      .setProject(getProjectId())
      .setJWT(jwt);

    const functions = new Functions(client);

    const res = await functions.createExecution(
      FUNCTION_ID,
      JSON.stringify({
        type: 'password-reset',
        userEmail: data.userEmail,
        userName: data.userName,
      }),
      false,
      '/send-email',
      'POST',
      { 'content-type': 'application/json' }
    );

    if (res.status !== 'completed') {
      throw new Error('Function execution did not complete successfully');
    }

    const result = JSON.parse(res.responseBody || res.response || '{}');
    if (result?.error) throw new Error(result.error);

    console.log('✅ Password reset email sent:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to send password reset email:', error);
    throw error;
  }
};
