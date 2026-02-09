import { Client, Databases, Account, Storage, Query, ID } from 'appwrite'

const ENDPOINT_ID = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const CONVERSATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONVERSATIONS_COLLECTION_ID!;
const DECKS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_DECKS_COLLECTION_ID!;
const AUDIO_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_AUDIO_BUCKET_ID!;
const FRIEND_REQUESTS_ID = process.env.NEXT_PUBLIC_APPWRITE_FRIEND_REQUESTS_ID!;
const ASSIGNMENTS_ID = process.env.NEXT_PUBLIC_APPWRITE_ASSIGNMENTS_ID!;
const STRIPE_CUSTOMERS_ID = process.env.NEXT_PUBLIC_APPWRITE_STRIPE_CUSTOMERS_ID!;
const STRIPE_SECRET_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;
const FEEDBACK_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID!;
const NEWS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_NEWS_COLLECTION_ID!;

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
export const feedbackCollectionId = FEEDBACK_COLLECTION_ID
export const newsCollectionId = NEWS_COLLECTION_ID


export const getConversationFromDB = async (documentId: string) => {
  try {
    const response = await databases.getDocument(databaseId, conversationsCollectionId, documentId)
    return response
  } catch {
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

// Check if a conversation is assigned to a student
export async function isConversationAssignedToStudent(studentId: string, conversationId: string): Promise<boolean> {
  try {
    const res = await databases.listDocuments(databaseId, assignmentsId, [
      Query.equal('studentId', studentId),
      Query.equal('conversationId', conversationId),
    ]);
    return res.total > 0;
  } catch (error) {
    console.error('Failed to check assignment for conversation:', error);
    return false;
  }
}

// News helpers
export type NewsDocument = {
  $id: string;
  tag: string;
  title: string;
  color?: string;
  content: string;
  $createdAt: string;
  $updatedAt?: string;
};

export async function listNewsDocuments(): Promise<NewsDocument[]> {
  try {
    const res = await databases.listDocuments(
      databaseId,
      newsCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return res.documents as unknown as NewsDocument[];
  } catch (error) {
    console.error("Failed to list news documents:", error);
    return [];
  }
}

export async function createNewsDocument(data: { tag: string; title?: string; content: string; color?: string; }): Promise<NewsDocument | null> {
  try {
    const res = await databases.createDocument(
      databaseId,
      newsCollectionId,
      ID.unique(),
      data
    );
    return res as unknown as NewsDocument;
  } catch (error) {
    console.error("Failed to create news document:", error);
    return null;
  }
}
