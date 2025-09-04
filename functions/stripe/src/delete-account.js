const { Account, Users } = require("node-appwrite");

module.exports = async function handleDeleteAccount({ req, res, client, adminClient, log, error }) {
  try {
    // Ensure request is authenticated via JWT
    const account = new Account(client);
    const me = await account.get();
    const userId = me.$id;

    if (!userId) {
      return res.json({ error: "User not found" }, 400);
    }

    // Use admin privileges to delete the Appwrite user
    const users = new Users(adminClient);
    await users.delete(userId);

    return res.json({ success: true, userId }, 200);
  } catch (err) {
    error("Delete account failed:", err);
    return res.json({ error: "Failed to delete account", details: err?.message }, 500);
  }
};