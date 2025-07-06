import { ID, Query } from "appwrite";
import { databases, databaseId, friendRequestsId, usersCollectionId } from "./appwrite";
import { toast } from "sonner";

export async function sendFriendRequest(fromUserId: string, toUserId: string) {
  return await databases.createDocument(databaseId, friendRequestsId, ID.unique(), {
    fromUserId,
    toUserId,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
}

export async function hasPendingRequest(fromUserId: string, toUserId: string) {
  const res = await databases.listDocuments(databaseId, friendRequestsId, [
    Query.equal("fromUserId", fromUserId),
    Query.equal("toUserId", toUserId),
    Query.equal("status", "pending"),
  ]);
  return res.documents.length > 0;
}

export async function fetchPendingRequests(userId: string) {
  const res = await databases.listDocuments(databaseId, friendRequestsId, [
    Query.equal("toUserId", userId),
    Query.equal("status", "pending"),
  ]);
  return res.documents;
}

export async function updateRequestStatus(requestId: string, status: "accepted" | "declined") {
  await databases.updateDocument(databaseId, friendRequestsId, requestId, {
    status,
    createdAt: new Date().toISOString(),
  });
}

export const addFriend = async (userId: string, fromUserId: string) => {
   if (!userId || !fromUserId) {
    console.error("Missing userId or fromUserId:", { userId, fromUserId });
    throw new Error("Invalid parameters to addFriend");
  }

  try {
    const userDoc = await databases.getDocument(databaseId, usersCollectionId, userId);
    const currentFriends = userDoc.friendsList || [];

    if (currentFriends.includes(fromUserId || userId)) {
      toast.info("This user is already your friend.");
      return;
    }

    const updatedFriends = [...currentFriends, fromUserId];

    await databases.updateDocument(databaseId, usersCollectionId, userId, {
      friendsList: updatedFriends,
    });

  } catch (err) {
    console.error("Error adding friend:", err);
    toast.error("Failed to add friend. Please try again.");
    throw err;
  }
};

export async function deleteFriendRequest(requestId: string) {
  return await databases.deleteDocument(databaseId, friendRequestsId, requestId);
}
