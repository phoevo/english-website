import { account, databases } from "./appwrite";
import { ID } from "appwrite";

const DATABASE_ID = "67f9017b002808c927aa"; // replace with your real DB ID
const COLLECTION_ID = "67fe6fe9001dc88e2b72"; // replace with your real collection ID

export async function ensureUserDocument() {
  const user = await account.get();
  const userId = user.$id;

  try {
    // Try to get the user document by ID
    await databases.getDocument(DATABASE_ID, COLLECTION_ID, userId);
  } catch (err: any) {
    if (err.code === 404) {
      // If not found, create it
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, userId, {
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
