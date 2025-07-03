import { ID, Query } from "appwrite";
import { databases, databaseId, friendRequestsId } from "./appwrite";

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
    respondedAt: new Date().toISOString(),
  });
}
