const { Account, Users, Databases, Query } = require("node-appwrite");

module.exports = async function handleDeleteAccount({ req, res, client, adminClient, log, error }) {
  try {
    // Ensure request is authenticated via JWT
    const account = new Account(client);
    const me = await account.get();
    const userId = me.$id;

    if (!userId) {
      return res.json({ error: "User not found" }, 400);
    }

    // Resolve env configuration (supporting both server-only and NEXT_PUBLIC_ variants)
    const DB_ID = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
    const USERS_COLLECTION_ID = process.env.APPWRITE_USERS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || "";
    const DECKS_COLLECTION_ID = process.env.APPWRITE_DECKS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_DECKS_COLLECTION_ID || "";
    const FRIEND_REQUESTS_ID = process.env.APPWRITE_FRIEND_REQUESTS_ID || process.env.NEXT_PUBLIC_APPWRITE_FRIEND_REQUESTS_ID || "";
    const ASSIGNMENTS_ID = process.env.APPWRITE_ASSIGNMENTS_ID || process.env.NEXT_PUBLIC_APPWRITE_ASSIGNMENTS_ID || "";

    const users = new Users(adminClient);
    const databases = new Databases(adminClient);

    // Helper: best-effort delete of many docs
    const safeDeleteDocs = async (collectionId, queries) => {
      if (!DB_ID || !collectionId) return; // skip if not configured
      try {
        const list = await databases.listDocuments(DB_ID, collectionId, queries);
        for (const doc of list.documents || []) {
          try {
            await databases.deleteDocument(DB_ID, collectionId, doc.$id);
          } catch (e) {
            log && log(`Failed to delete ${collectionId}/${doc.$id}: ${e?.message || e}`);
          }
        }
      } catch (e) {
        log && log(`Failed to list in ${collectionId}: ${e?.message || e}`);
      }
    };

    // 1) Remove user-owned/related docs first (idempotent, best-effort)
    await safeDeleteDocs(DECKS_COLLECTION_ID, [Query.equal('userID', userId)]);
    await safeDeleteDocs(FRIEND_REQUESTS_ID, [Query.equal('fromUserId', userId)]);
    await safeDeleteDocs(FRIEND_REQUESTS_ID, [Query.equal('toUserId', userId)]);
    await safeDeleteDocs(ASSIGNMENTS_ID, [Query.equal('studentId', userId)]);
    await safeDeleteDocs(ASSIGNMENTS_ID, [Query.equal('teacherId', userId)]);

    // 2) Remove Users collection document (ignore if already gone)
    if (DB_ID && USERS_COLLECTION_ID) {
      try {
        await databases.deleteDocument(DB_ID, USERS_COLLECTION_ID, userId);
      } catch (e) {
        // ignore 404s or permission errors; we are deleting the auth record next
        log && log(`Users doc delete skipped/failed: ${e?.message || e}`);
      }
    }

    // 3) Delete the Appwrite auth user (requires users.write on API key)
    await users.delete(userId);

    return res.json({ success: true, userId }, 200);
  } catch (err) {
    error && error("Delete account failed:", err);
    const msg = (err && (err.message || err.response?.message)) || "Unknown error";
    return res.json({ error: "Failed to delete account", details: msg }, 500);
  }
};
