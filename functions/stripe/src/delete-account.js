const { Users } = require("node-appwrite");

module.exports = async function handleDeleteAccount({ req, res, adminClient, log, error }) {
  try {
    const { userId } = req.bodyJson || {};

    if (!userId) {
      return res.json({ error: "Missing userId" }, 400);
    }

    // Delete the Appwrite auth user (requires users.write on API key)
    // Document cleanup is handled client-side before this function is called
    const users = new Users(adminClient);
    await users.delete(userId);

    log && log("Deleted auth user:", userId);
    return res.json({ success: true, userId }, 200);
  } catch (err) {
    error && error("Delete account failed:", err);
    const msg = (err && (err.message || err.response?.message)) || "Unknown error";
    return res.json({ error: "Failed to delete account", details: msg }, 500);
  }
};
