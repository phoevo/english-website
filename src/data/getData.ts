import { account, conversationsCollectionId, databaseId, databases, usersCollectionId, } from "./appwrite";
import { Client, Functions, Query } from "appwrite";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const CONVERSATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONVERSATIONS_COLLECTION_ID!;

export async function ensureUserDocument() {
  const user = await account.get();
  const userId = user.$id;


  try {
    // Try to get the user document by ID
    await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, userId);
  } catch (err: any) {
    if (err.code === 404) {
      // If not found, create it
      await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, {
        userId: userId,
        email: user.email,
        name: user.name ?? "",
        recentConversations: [],
      });
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
  try {
    // Refresh the JWT token to ensure it's valid
    const jwt = await account.createJWT();
    localStorage.setItem('jwt', jwt.jwt);

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID)
      .setJWT(jwt.jwt);

    const functions = new Functions(client);

    console.log("Calling Appwrite function with:", { plan, documentId });
    console.log("JWT token refreshed and exists:", !!jwt.jwt);
    console.log("Project ID:", PROJECT_ID);

    const response = await functions.createExecution(
      "68794e830018a53dcad6", // Function ID
      JSON.stringify({ plan, documentId }),
      false,
      "/payments",
      "POST"
    );

    console.log("Full Appwrite response:", response);
    console.log("Response status:", response.status);
    console.log("Response errors:", response.errors);
    console.log("Response logs:", response.logs);
    console.log("Raw response body:", response.response);
    console.log("Response object keys:", Object.keys(response));
    console.log("Response data:", response.responseBody || response.body || response.data);

    if (response.status !== "completed") {
      console.warn("Appwrite function did not complete successfully.");
      console.log("Function may have failed with errors:", response.errors);
      return;
    }

    // Try to get response data from multiple possible fields
    const responseData = response.responseBody || response.response || response.body;

    if (!responseData) {
      console.warn("No response data found in function response.");
      return;
    }

    try {
      const data = JSON.parse(responseData);
      console.log("Function response data:", data);
      if (data?.checkout_url) {
        console.log("Redirecting to checkout URL:", data.checkout_url);
        window.location.href = data.checkout_url;
      } else {
        console.warn("No checkout URL returned from server.", data);
      }
    } catch (parseErr) {
      console.error("Invalid JSON response from Appwrite function:", responseData);
      console.error("Parse error:", parseErr);
    }
  } catch (error) {
    console.error("Subscription failed:", error);
  }
}


// Manual function to fix subscription status
export async function fixSubscriptionStatus(userId: string): Promise<void> {
  try {
    // Refresh the JWT token to ensure it's valid
    const jwt = await account.createJWT();
    localStorage.setItem('jwt', jwt.jwt);

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(PROJECT_ID)
      .setJWT(jwt.jwt);

    const functions = new Functions(client);

    const response = await functions.createExecution(
      "68794e830018a53dcad6",
      JSON.stringify({ userId, action: "fix-subscription" }),
      false,
      "/fix-subscription",
      "POST"
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
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setJWT(jwt.jwt);

    const functions = new Functions(client);

    const response = await functions.createExecution(
      "68794e830018a53dcad6", // Function ID of get-subscription
      undefined,
      false,
      "/get-subscription", // Your function route
      "GET"
    );

    const result = JSON.parse(response.responseBody || response.response || "{}");

    // List your paid plans here
    const paidPlans = ["Student Monthly", "Student Yearly"];

    // Return 'pro' if user has one of these paid plans, otherwise 'free'
    return paidPlans.includes(result.plan) ? "pro" : "free";
  } catch (err) {
    console.error("Failed to fetch subscription plan:", err);
    return "free"; // Default to free on error
  }
}


export async function unsubscribeUser2(userId: string) {
  const jwt = await account.createJWT();
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setJWT(jwt.jwt);

  const functions = new Functions(client);

  // Send only user_id in the payload
  const payload = JSON.stringify({ user_id: userId });

 const response = await functions.createExecution(
  "68794e830018a53dcad6",
  payload,
  false,
  "/unsubscribe",
  "POST",
  { "content-type": "application/json" }  // Add this headers param
);


  if (response.status !== "completed") {
    throw new Error("Failed to unsubscribe user");
  }

  return JSON.parse(response.responseBody);
}

// Simple function to check subscription via Appwrite function
export async function checkSubscriptionFromStripe(userEmail: string): Promise<boolean> {
  try {
    const jwt = await account.createJWT();
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setJWT(jwt.jwt);

    const functions = new Functions(client);

    const response = await functions.createExecution(
      "68794e830018a53dcad6",
      JSON.stringify({ email: userEmail }),
      false,
      "/check-subscription", // Simple endpoint
      "POST"
    );

    if (response.status !== "completed") {
      return false;
    }

    const result = JSON.parse(response.responseBody || "{}");
    return result.isSubscribed || false;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
}

// Function to sync user's isSubscribed field with Stripe
export async function syncUserSubscriptionStatusWithStripe(userId: string): Promise<void> {
  try {
    const hasActiveSubscription = await checkSubscriptionStatusFromStripe(userId);
    
    // Update the user's isSubscribed field based on Stripe
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      userId,
      { isSubscribed: hasActiveSubscription }
    );
    
    console.log(`User ${userId} isSubscribed status synced with Stripe to:`, hasActiveSubscription);
  } catch (error) {
    console.error("Error syncing user subscription status with Stripe:", error);
    throw error;
  }
}

// Legacy function - keeping for backward compatibility but will use user document instead
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
