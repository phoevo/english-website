import { databases, databaseId, usersCollectionId } from "./appwrite";

export const updateRecentConversations = async ({
  userId,
  conversationId,
}: {
  userId: string;
  conversationId: string | number; // conversationId can be either string or number
}) => {
  try {
    // Get the current user document
    const userDoc = await databases.getDocument(databaseId, usersCollectionId, userId);
    const existing: string[] = userDoc.recentConversations || [];

    // Ensure that the new conversationId is added at the front
    const updated = [String(conversationId), ...existing.filter((id) => id !== String(conversationId))];

    // Slice the array to limit it to 5 most recent conversations
    const finalUpdated = updated.slice(0, 5);

    // Update the recentConversations field in the database
    await databases.updateDocument(databaseId, usersCollectionId, userId, {
      recentConversations: finalUpdated,
    });


  } catch (err) {

  }
};
