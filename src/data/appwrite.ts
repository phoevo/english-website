import { Client, Databases, Account, ID } from 'appwrite'

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')  // Your Appwrite endpoint
  .setProject('67f8ef4d001bf840a8a4')           // Your Project ID

// Services
export const databases = new Databases(client)
export const account = new Account(client)

// IDs
export const databaseId = '67f9017b002808c927aa'     // Replace with your DB ID
export const conversationsCollectionId = '67f9244b00193b15fd04' // Your collection ID

// Example util
export const getConversationFromDB = async (documentId: string) => {
  try {
    const response = await databases.getDocument(databaseId, conversationsCollectionId, documentId)
    return response
  } catch (error) {
    console.error("Error fetching from DB:", error)
    throw new Error("Failed to fetch conversation.")
  }
}
