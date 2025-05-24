import { Client, Databases, Account } from 'appwrite'

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const CONVERSATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONVERSATIONS_COLLECTION_ID!;

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

// Services
export const databases = new Databases(client)
export const account = new Account(client)


export const databaseId = DATABASE_ID
export const conversationsCollectionId = CONVERSATIONS_COLLECTION_ID
export const usersCollectionId = USERS_COLLECTION_ID



export const getConversationFromDB = async (documentId: string) => {
  try {
    const response = await databases.getDocument(databaseId, conversationsCollectionId, documentId)
    return response
  } catch (error) {
    console.error("Error fetching from DB:", error)
    throw new Error("Failed to fetch conversation.")
  }
}
