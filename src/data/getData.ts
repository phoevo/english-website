import { account, conversationsCollectionId, databaseId, databases, usersCollectionId } from "./appwrite";

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
