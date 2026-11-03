const { Account, Users } = require("node-appwrite");

module.exports = async function handleDeleteAccount({ res, client, adminClient, log, error }) {
  try {
    // Only ever delete the signed-in caller's own account.
    let userId;
    try {
      userId = (await new Account(client).get()).$id;
    } catch {
      return res.json({ error: "Authentication required" }, 401);
    }

    // Delete the Appwrite auth user (requires users.write on API key)
    // Document cleanup is handled client-side before this function is called
    const users = new Users(adminClient);
    await users.delete(userId);

    if (log) log("Deleted auth user:", userId);
    return res.json({ success: true, userId }, 200);
  } catch (err) {
    if (error) error("Delete account failed:", err);
    const msg = (err && (err.message || err.response?.message)) || "Unknown error";
    return res.json({ error: "Failed to delete account", details: msg }, 500);
  }
};
