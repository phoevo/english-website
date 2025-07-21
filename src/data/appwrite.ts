import { Client, Databases, Account, Storage, Query } from 'appwrite'

const ENDPOINT_ID = process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_API_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const CONVERSATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONVERSATIONS_COLLECTION_ID!;
const DECKS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_DECKS_COLLECTION_ID!;
const AUDIO_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_AUDIO_BUCKET_ID!;
const FRIEND_REQUESTS_ID = process.env.NEXT_PUBLIC_APPWRITE_FRIEND_REQUESTS_ID!;
const ASSIGNMENTS_ID = process.env.NEXT_PUBLIC_APPWRITE_ASSIGNMENTS_ID!;
const STRIPE_CUSTOMERS_ID = process.env.NEXT_PUBLIC_APPWRITE_STRIPE_CUSTOMERS_ID!;
// SUBSCRIPTIONS_ID removed - no longer using subscriptions collection
const STRIPE_SECRET_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

const client = new Client()
  .setEndpoint(ENDPOINT_ID)
  .setProject(PROJECT_ID)



export const databases = new Databases(client)
export const account = new Account(client)
export const storage = new Storage(client);


export const databaseId = DATABASE_ID
export const conversationsCollectionId = CONVERSATIONS_COLLECTION_ID
export const usersCollectionId = USERS_COLLECTION_ID
export const decksCollectionId = DECKS_COLLECTION_ID
export const audioBucketId = AUDIO_BUCKET_ID
export const friendRequestsId = FRIEND_REQUESTS_ID
export const assignmentsId = ASSIGNMENTS_ID
// subscriptionsId removed - no longer using subscriptions collection
export const stripeCustomersId = STRIPE_CUSTOMERS_ID
export const stripeSecretKey = STRIPE_SECRET_KEY
export const stripeWebhookSecret = STRIPE_WEBHOOK_SECRET


export const getConversationFromDB = async (documentId: string) => {
  try {
    const response = await databases.getDocument(databaseId, conversationsCollectionId, documentId)
    return response
  } catch (error: any) {
    console.warn(`Conversation ${documentId} could not be fetched. It may have been deleted.`)
    return null
  }
};

export const getAudioFileUrl = (fileId: string) => {
  return storage.getFileView(audioBucketId, fileId);
};

export const searchUsers = async (searchText: string) => {
  try {
    const res = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [
        Query.or([
          Query.search("name", searchText),
          Query.search("email", searchText)
        ])
      ]
    );
    return res.documents;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};

export async function getUserById(userId: string) {
  try {
    const res = await databases.getDocument(databaseId, usersCollectionId, userId);
    return res;
  } catch (error) {
    console.error("Failed to fetch user by ID:", error);
    throw error;
  }
}