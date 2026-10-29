import "server-only";
import { Account, Client, Databases, Tokens, Users } from "node-appwrite";

export class AccessError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

function setting(name: string) {
  const value = process.env[name] ?? process.env['NEXT_PUBLIC_' + name];
  if (!value) throw new AccessError("Server data access is not configured.", 503);
  return value;
}

export function getServerConfig() {
  return {
    endpoint: setting("APPWRITE_ENDPOINT").replace(/\/$/, ""),
    projectId: setting("APPWRITE_PROJECT_ID"),
    databaseId: setting("APPWRITE_DATABASE_ID"),
    usersId: setting("APPWRITE_USERS_COLLECTION_ID"),
    conversationsId: setting("APPWRITE_CONVERSATIONS_COLLECTION_ID"),
    decksId: process.env.APPWRITE_DECKS_COLLECTION_ID ?? process.env.NEXT_PUBLIC_APPWRITE_DECKS_COLLECTION_ID,
    feedbackId: process.env.APPWRITE_FEEDBACK_COLLECTION_ID ?? process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID,
    audioBucketId: process.env.APPWRITE_AUDIO_BUCKET_ID ?? process.env.NEXT_PUBLIC_APPWRITE_AUDIO_BUCKET_ID,
  };
}

// A fresh, unprivileged client verifies the caller on every operation.
export async function getUserContext(jwt: string) {
  if (typeof jwt !== "string" || !jwt.trim() || jwt.length > 4096) {
    throw new AccessError("Please sign in to continue.", 401);
  }
  const config = getServerConfig();
  const client = new Client().setEndpoint(config.endpoint).setProject(config.projectId).setJWT(jwt);
  let user;
  try {
    user = await new Account(client).get();
  } catch (error) {
    const code = errorCode(error);
    if (code === 401 || code === 403) throw new AccessError("Please sign in again.", 401);
    throw new AccessError("Unable to verify your session. Please try again.", 503);
  }
  if (!user?.$id || user.status === false) throw new AccessError("Please sign in again.", 401);

  // Privileged services are constructed only after authentication succeeds.
  const key = process.env.APPWRITE_API_KEY;
  if (!key) throw new AccessError("Server data access is not configured.", 503);
  const admin = new Client().setEndpoint(config.endpoint).setProject(config.projectId).setKey(key);
  return { user, config, databases: new Databases(admin), users: new Users(admin), tokens: new Tokens(admin) };
}

export type UserContext = Awaited<ReturnType<typeof getUserContext>>;
export function errorCode(error: unknown): number | undefined {
  return typeof error === "object" && error !== null && "code" in error && typeof error.code === "number" ? error.code : undefined;
}
