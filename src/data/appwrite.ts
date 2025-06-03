import { Client, Databases, Account, Storage } from 'appwrite'

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const CONVERSATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONVERSATIONS_COLLECTION_ID!;
const DECKS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_DECKS_COLLECTION_ID!;
const AUDIO_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_AUDIO_BUCKET_ID!;

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

// Services
export const databases = new Databases(client)
export const account = new Account(client)
export const storage = new Storage(client);


export const databaseId = DATABASE_ID
export const conversationsCollectionId = CONVERSATIONS_COLLECTION_ID
export const usersCollectionId = USERS_COLLECTION_ID
export const decksCollectionId = DECKS_COLLECTION_ID
export const audioBucketId = AUDIO_BUCKET_ID


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