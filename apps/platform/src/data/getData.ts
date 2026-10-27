import { toast } from "sonner";
import { account, conversationsCollectionId, databaseId, databases, usersCollectionId, functions as appwriteFunctions } from "./appwrite";
import { Client, Functions } from "appwrite";


const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const CONVERSATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONVERSATIONS_COLLECTION_ID!;
const STRIPE_FUNCTION = process.env.NEXT_PUBLIC_APPWRITE_STRIPE_FUNCTION!;


export async function ensureUserDocument(): Promise<{ created: boolean }> {
  const user = await account.get();
  const userId = user.$id;

  try {
    // Try to get the user document by ID
    await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, userId);
    return { created: false };
  } catch (err: unknown) {
    const code = (typeof err === 'object' && err && 'code' in err && typeof (err as { code?: unknown }).code === 'number')
      ? (err as { code: number }).code
      : undefined;
    if (code === 404) {
      // If not found, create it
      await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, {
        userId: userId,
        email: user.email,
        name: user.name ?? "",
        recentConversations: [],
        onboardingComplete: false,
      });
      return { created: true };
    } else {
      throw err; // throw other unexpected errors
    }
  }
}


export async function subscribeUser(documentId: string) {
  try {
    await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      documentId,
      { isSubscribed: true }
    );
    console.log('User is now subscribed!');
  } catch (error) {
    console.error('Subscription update failed:', error);
  }
}

export async function subscribeUser2(documentId: string, plan: string): Promise<void> {
  // Refresh the JWT token to ensure it's valid
  const user = await account.get();
  console.log("Logged in user:", user);


  // First try direct call (best when CORS is correctly configured)
  try {
    const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
    const functions = new Functions(client);

    console.log("Calling Appwrite function with:", { plan, documentId });
    console.log("Project ID:", PROJECT_ID);

    const response = await functions.createExecution(
      (STRIPE_FUNCTION),
      JSON.stringify({ plan, documentId }),
      false,
      "/payments",
      "POST" as unknown as import("appwrite").ExecutionMethod
    );

    if (response.status === "completed") {
      const data = JSON.parse(response.responseBody || "{}");
      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
    }
    // If it didn't complete or no URL, fall through to proxy
  } catch (err) {
    console.warn("Direct Appwrite call failed (likely CORS). Falling back to proxy.", err);
  }

  // Fallback: call same-origin Next.js proxy to bypass CORS
  const resp = await fetch('/api/ checkout', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ plan, documentId }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    toast.dismiss('subscription-loading');
    toast.error(data?.error || 'Checkout failed');
    return;
  }
  if (data?.checkout_url) {
  window.location.href = data.checkout_url;
  }else {
    toast.dismiss('subscription-loading');
    toast.error('No checkout URL returned.');
  }
}


// Manual function to fix subscription status
export async function fixSubscriptionStatus(userId: string): Promise<void> {
  try {
    // Refresh the JWT token to ensure it's valid
    const jwt = await account.createJWT();
    localStorage.setItem('jwt', jwt.jwt);

    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(PROJECT_ID)
      .setJWT(jwt.jwt);

    const functions = new Functions(client);

    const response = await functions.createExecution(
      STRIPE_FUNCTION,
      JSON.stringify({ userId, action: "fix-subscription" }),
      false,
      "/fix-subscription",
      "POST" as unknown as import("appwrite").ExecutionMethod
    );

    console.log("Fix subscription response:", response);
  } catch (error) {
    console.error("Failed to fix subscription:", error);
    throw error;
  }
}


export async function unsubscribeUser(documentId: string) {
  try {
    await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      documentId,
      { isSubscribed: false }
    );
    console.log('User has been unsubscribed!');
  } catch (error) {
    console.error('Unsubscription failed:', error);
  }
}

export async function fetchConversations() {
  try {
    const res = await databases.listDocuments(DATABASE_ID, CONVERSATIONS_COLLECTION_ID);
    return res.documents;
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    throw error;
  }
}


export async function getUserCount() {
  try {
    const response = await databases.listDocuments(
      databaseId,
      usersCollectionId,
    );

    const totalUsers = response.total;
    return totalUsers;
  } catch (err) {
    console.error("Error fetching user count:", err);
    return 0;
  }
}

export async function getConversationCount() {
  try {
    const response = await databases.listDocuments(
      databaseId,
      conversationsCollectionId,
    );

    const totalConvos = response.total;
    return totalConvos;
  } catch (err) {
    console.error("Error fetching convo count:", err);
    return 0;
  }
}

export async function getUserPlan(): Promise<"free" | "pro"> {
  try {
    const jwt = await account.createJWT();
    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setJWT(jwt.jwt);

    const functions = new Functions(client);

    const response = await functions.createExecution(
      STRIPE_FUNCTION, // Function ID of get-subscription
      undefined,
      false,
      "/get-subscription", // Your function route
      "GET" as unknown as import("appwrite").ExecutionMethod
    );

    const result = JSON.parse(response.responseBody || "{}");

    // List your paid plans here
    const paidPlans = ["Student Monthly", "Student Yearly", "Tutor Monthly", "Tutor Yearly"];

    // Return 'pro' if user has one of these paid plans, otherwise 'free'
    return paidPlans.includes(result.plan) ? "pro" : "free";
  } catch (err) {
    console.error("Failed to fetch subscription plan:", err);
    return "free"; // Default to free on error
  }
}


export async function unsubscribeUser2(userId: string) {
  const response = await appwriteFunctions.createExecution(
    STRIPE_FUNCTION,
    JSON.stringify({ userId }),
    false,
    "/unsubscribe",
    "POST" as unknown as import("appwrite").ExecutionMethod
  );

  if (response.status !== "completed") {
    throw new Error(response.responseBody || "Unsubscribe failed in function");
  }

  return JSON.parse(response.responseBody || "{}");
}





export async function deleteAccountServer(userId: string): Promise<void> {
  // Use Next.js API route which calls Appwrite REST API directly
  // No function cold start, no timeout issues
  const resp = await fetch('/api/delete-account', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ userId }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    throw new Error(data?.error || 'Failed to delete account');
  }
}

// Simple function to check subscription via Appwrite function
// export async function checkSubscriptionFromStripe(): Promise<boolean> {
//   try {
//     const jwt = await account.createJWT();
//     const client = new Client()
//       .setEndpoint(APPWRITE_ENDPOINT)
//       .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
//       .setJWT(jwt.jwt);

//     const functions = new Functions(client);


//     const response = await functions.createExecution(
//       "68794e830018a53dcad6",
//       JSON.stringify({ plan, documentId, jwt: jwt.jwt }),
//       false,
//       "/payments",
//       "POST" as unknown as import("appwrite").ExecutionMethod
//     );

//     if (response.status !== "completed") {
//       return false;
//     }

//     const result = JSON.parse(response.responseBody || "{}");
//     return result.isSubscribed || false;
//   } catch (error) {
//     console.error("Error checking subscription:", error);
//     return false;
//   }
// }

// export async function syncUserSubscriptionStatusWithStripe(userId: string): Promise<void> {
//   try {
//     const jwt = await account.createJWT();

//     const client = new Client()
//       .setEndpoint(APPWRITE_ENDPOINT)
//       .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
//       .setJWT(jwt.jwt);

//     const functions = new Functions(client);

//     const response = await functions.createExecution(
//       STRIPE_FUNCTION_ID_CHECK_SUBSCRIPTION,
//       JSON.stringify({ user_id: userId }),
//       false,
//       "/check-subscription",
//       "POST" as any
//     );

//     if (response.status !== "completed") return;

//     const result = JSON.parse(response.responseBody || "{}");

//     await databases.updateDocument(
//       databaseId,
//       usersCollectionId,
//       userId,
//       {
//         isSubscribed: !!result.isSubscribed,
//       }
//     );
//   } catch (err) {
//     console.error("Sync failed:", err);
//   }
// }

export async function checkSubscriptionStatus(userId: string): Promise<boolean> {
  try {
    // Just get the subscription status from the user document instead
    const userDoc = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      userId
    );

    return !!userDoc?.isSubscribed;
  } catch (error) {
    console.error("Error checking subscription status from user document:", error);
    return false; // Default to false on error
  }
}
