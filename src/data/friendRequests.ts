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

export const removeFriend = async (userId: string, friendId: string) => {
  if (!userId || !friendId) {
    console.error("Missing userId or friendId:", { userId, friendId });
    throw new Error("Invalid parameters to removeFriend");
  }
  try {
    const userDoc = await databases.getDocument(databaseId, usersCollectionId, userId);
    const updatedUserFriends = (userDoc.friendsList || []).filter((id: string) => id !== friendId);
    await databases.updateDocument(databaseId, usersCollectionId, userId, {
      friendsList: updatedUserFriends,
    });

    const friendDoc = await databases.getDocument(databaseId, usersCollectionId, friendId);
    const updatedFriendFriends = (friendDoc.friendsList || []).filter((id: string) => id !== userId);
    await databases.updateDocument(databaseId, usersCollectionId, friendId, {
      friendsList: updatedFriendFriends,
    });
  } catch (err) {
    console.error("Error removing friend:", err);
    toast.error("Failed to remove connection. Please try again.");
    throw err;
  }
};

export async function deleteFriendRequest(requestId: string) {
  return await databases.deleteDocument(databaseId, friendRequestsId, requestId);
}

export async function addActiveStudent(teacherId: string, studentId: string) {
  if (!teacherId || !studentId) {
    console.error("Missing teacherId or studentId:", { teacherId, studentId });
    throw new Error("Invalid parameters to addActiveStudent");
  }

  try {
    // Fetch the teacher's document
    const teacherDoc = await databases.getDocument(
      databaseId,
      usersCollectionId,
      teacherId
    );

    // Get current list (fallback to empty)
    const currentStudents = teacherDoc.activeStudents || [];

    // Prevent duplicates
    if (currentStudents.includes(studentId)) {
      toast.info("This student is already in your active list.");
      return;
    }

    const updatedStudents = [...currentStudents, studentId];

    // Update teacher document in Appwrite
    await databases.updateDocument(
      databaseId,
      usersCollectionId,
      teacherId,
      { activeStudents: updatedStudents }
    );

    toast.success("Student added to your active list!");

  } catch (err) {
    console.error("Error adding active student:", err);
    toast.error("Failed to add student. Please try again.");
    throw err;
  }
}
