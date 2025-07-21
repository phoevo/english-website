const { Databases, Client } = require("node-appwrite");

module.exports = async function provision({ plan, userId, adminClient }) {
  const databases = new Databases(adminClient);

  console.log("Provisioning user:", userId, "with plan:", plan);

  // Determine if user should be considered subscribed
  const isSubscribed = plan !== "free";

  // Update the user's isSubscribed field in the users collection
  // This is now our single source of truth (along with Stripe)
  try {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
      userId,
      { isSubscribed }
    );
    console.log("Updated user isSubscribed field to:", isSubscribed);
    console.log("Plan:", plan, "- User is now", isSubscribed ? "subscribed" : "unsubscribed");
  } catch (error) {
    console.error("Error updating user isSubscribed field:", error);
    throw error; // Re-throw to indicate provisioning failed
  }
}
