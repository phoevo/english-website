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

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const FUNCTION_ID = process.env.NEXT_PUBLIC_APPWRITE_STRIPE_FUNCTION || '68794e830018a53dcad6';

export const sendWelcomeEmail = async (data: WelcomeEmailData) => {
  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(APPWRITE_PROJECT)

  const functions = new Functions(client);

  const res = await functions.createExecution(
    FUNCTION_ID,
    JSON.stringify({ type: 'welcome', userEmail: data.userEmail, userName: data.userName}),
    false,
    '/send-email',
    'POST' as unknown as import('appwrite').ExecutionMethod,
    { 'content-type': 'application/json' }
  );

  if (res.status !== 'completed') {
    throw new Error('Function execution did not complete successfully');
  }

  const result = JSON.parse(res.responseBody || '{}');
  if (result?.error) throw new Error(result.error);

  console.log('✅ Welcome email sent:', result);
  return result;
};

// Send password reset email
export const sendPasswordResetEmail = async (data: WelcomeEmailData) => {
  const jwt = getUserJWT();
  if (!jwt) throw new Error('Missing user JWT for sending password reset email');

  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT)
    .setJWT(jwt);

  const functions = new Functions(client);

  const res = await functions.createExecution(
    FUNCTION_ID,
    JSON.stringify({ type: 'password-reset', userEmail: data.userEmail, userName: data.userName, jwt }),
    false,
    '/send-email',
    'POST' as unknown as import('appwrite').ExecutionMethod,
    { 'content-type': 'application/json' }
  );

  if (res.status !== 'completed') {
    throw new Error('Function execution did not complete successfully');
  }

  const result = JSON.parse(res.responseBody || '{}');
  if (result?.error) throw new Error(result.error);

  console.log('✅ Password reset email sent:', result);
  return result;
};
