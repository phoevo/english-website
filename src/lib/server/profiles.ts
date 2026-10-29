import "server-only";
import { ID, Models, Permission, Query, Role } from "node-appwrite";
import { z } from "zod";
import { backgroundColors } from "@/data/color";
import type { PersonalDeck, UserProfile } from "@/lib/profileTypes";
import { AccessError, errorCode, type UserContext } from "./appwrite";

const id = z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/, "Invalid identifier.");
const entry = z.string().trim().min(1).max(150).refine(value => {
  const split = value.indexOf("::");
  return split > 0 && value.slice(split + 2).trim().length > 0;
}, "A word and definition are required.");
const operationSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("dictionary.add"), entry }).strict(),
  z.object({ kind: z.literal("dictionary.remove"), entry: z.string().min(1).max(150) }).strict(),
  z.object({ kind: z.literal("colors.save"), colors: z.array(z.string().refine(value => Object.hasOwn(backgroundColors, value), "Invalid highlight color.")).length(13) }).strict(),
  z.object({ kind: z.literal("conversation.open"), conversationId: id.max(25) }).strict(),
  z.object({ kind: z.literal("conversation.remove"), conversationId: id.max(25) }).strict(),
  z.object({ kind: z.literal("conversation.complete"), conversationId: id.max(30) }).strict(),
  z.object({ kind: z.literal("guide.complete"), guideId: id }).strict(),
  z.object({ kind: z.literal("profile.syncName") }).strict(),
  z.object({ kind: z.literal("streak.touch"), timeZone: z.string().min(1).max(80).refine(value => { try { new Intl.DateTimeFormat("en", { timeZone: value }); return true; } catch { return false; } }) }).strict(),
  z.object({ kind: z.literal("challenge.complete"), challengeId: z.enum(["finish-5-conversations", "save-50-dictionary-words", "streak-30"]) }).strict(),
  z.object({ kind: z.literal("task.complete") }).strict(),
]);

const strings = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
const count = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;

export function profileView(context: UserContext, doc: Models.DefaultDocument): UserProfile {
  // Return only the fields used by the UI, never Stripe IDs or permission metadata.
  return {
    $id: context.user.$id, name: typeof doc.name === "string" && doc.name.trim() ? doc.name : context.user.name,
    email: context.user.email, isTeacher: doc.isTeacher === true, isSubscribed: doc.isSubscribed === true,
    recentConversations: strings(doc.recentConversations), dictionaryWords: strings(doc.dictionaryWords),
    completeConversations: strings(doc.completeConversations), customColors: strings(doc.customColors),
    guideTour: strings(doc.guideTour), challengeCount: strings(doc.challengeCount),
    friendsList: strings(doc.friendsList), activeStudents: strings(doc.activeStudents),
    taskCount: count(doc.taskCount), streak: count(doc.streak), lastActive: typeof doc.lastActive === "string" ? doc.lastActive : null,
  };
}

export async function ensureProfile(context: UserContext) {
  const { config, user, databases } = context;
  try {
    const document = await databases.getDocument({ databaseId: config.databaseId, collectionId: config.usersId, documentId: user.$id });
    return { created: false, document };
  } catch (error) { if (errorCode(error) !== 404) throw error; }
  try {
    const document = await databases.createDocument({
      databaseId: config.databaseId, collectionId: config.usersId, documentId: user.$id,
      data: { userId: user.$id, email: user.email, name: (user.name ?? "").slice(0, 30), isTeacher: true, onboardingComplete: true, isSubscribed: false, recentConversations: [] },
      permissions: [Permission.read(Role.user(user.$id))],
    });
    return { created: true, document };
  } catch (error) {
    if (errorCode(error) !== 409) throw error;
    const document = await databases.getDocument({ databaseId: config.databaseId, collectionId: config.usersId, documentId: user.$id });
    return { created: false, document };
  }
}

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw new AccessError(result.error.issues[0]?.message || "Invalid request.");
  return result.data;
}

export async function mutateProfile(context: UserContext, input: unknown) {
  const operation = parse(operationSchema, input);
  const { document } = await ensureProfile(context);
  const profile = profileView(context, document);
  const data: Record<string, unknown> = {};
  switch (operation.kind) {
    case "dictionary.add": data.dictionaryWords = [...new Set([...profile.dictionaryWords, operation.entry])]; break;
    case "dictionary.remove": data.dictionaryWords = profile.dictionaryWords.filter(word => word !== operation.entry); break;
    case "colors.save": data.customColors = operation.colors; break;
    case "conversation.open":
    case "conversation.complete": {
      await context.databases.getDocument({ databaseId: context.config.databaseId, collectionId: context.config.conversationsId, documentId: operation.conversationId });
      if (operation.kind === "conversation.open") data.recentConversations = [operation.conversationId, ...profile.recentConversations.filter(value => value !== operation.conversationId)].slice(0, 5);
      else data.completeConversations = [...new Set([...profile.completeConversations, operation.conversationId])];
      break;
    }
    case "conversation.remove": data.recentConversations = profile.recentConversations.filter(value => value !== operation.conversationId); break;
    case "guide.complete": data.guideTour = [...new Set([...profile.guideTour, operation.guideId])]; break;
    case "profile.syncName": data.name = context.user.name.slice(0, 30); break;
    case "streak.touch": {
      const now = new Date();
      const day = (date: Date) => {
        const parts = new Intl.DateTimeFormat("en", { timeZone: operation.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
        const value = (key: string) => Number(parts.find(part => part.type === key)?.value);
        return Date.UTC(value("year"), value("month") - 1, value("day"));
      };
      const last = profile.lastActive ? new Date(profile.lastActive) : null;
      const diff = last && Number.isFinite(last.getTime()) ? Math.round((day(now) - day(last)) / 86400000) : Infinity;
      if (diff <= 0) return profile;
      data.streak = diff === 1 ? profile.streak + 1 : 1;
      data.lastActive = now.toISOString(); break;
    }
    case "challenge.complete": {
      const earned = operation.challengeId === "finish-5-conversations" ? profile.completeConversations.length >= 5
        : operation.challengeId === "save-50-dictionary-words" ? profile.dictionaryWords.length >= 50 : profile.streak >= 30;
      if (!earned) throw new AccessError("This challenge is not complete.");
      data.challengeCount = [...new Set([...profile.challengeCount, operation.challengeId])]; break;
    }
    case "task.complete": data.taskCount = Math.min(profile.taskCount + 1, 100000); break;
  }
  const updated = await context.databases.updateDocument({ databaseId: context.config.databaseId, collectionId: context.config.usersId, documentId: context.user.$id, data });
  return profileView(context, updated);
}

export async function listDecks(context: UserContext): Promise<PersonalDeck[]> {
  const collectionId = context.config.decksId;
  if (!collectionId) throw new AccessError("Deck storage is not configured.", 503);
  const rows: Models.DefaultDocument[] = [];
  let cursor: string | undefined;
  while (true) {
    const page = await context.databases.listDocuments({ databaseId: context.config.databaseId, collectionId, queries: [Query.equal("userID", context.user.$id), Query.orderAsc("$id"), Query.limit(100), ...(cursor ? [Query.cursorAfter(cursor)] : [])] });
    rows.push(...page.documents);
    if (page.documents.length < 100) break;
    const next = page.documents.at(-1)?.$id;
    if (!next || next === cursor) throw new AccessError("Unable to load decks.", 503);
    cursor = next;
  }
  return rows.filter(row => row.userID === context.user.$id).map(row => ({ $id: row.$id, title: row.title, type: row.type, words: strings(row.words), userID: context.user.$id }));
}

export async function createDeck(context: UserContext, input: unknown): Promise<PersonalDeck> {
  const values = parse(z.object({ name: z.string().trim().min(1).max(50), type: z.literal("flashcards"), words: z.array(entry.refine(value => value.length <= 100, "Deck entries must be 100 characters or fewer.")).min(1).max(500) }).strict(), input);
  const { document } = await ensureProfile(context);
  const saved = new Map(strings(document.dictionaryWords).map(word => [word.toLowerCase(), word]));
  const words = values.words.map(word => saved.get(word.toLowerCase()));
  if (words.some(word => !word)) throw new AccessError("Choose words from your dictionary.");
  if (!context.config.decksId) throw new AccessError("Deck storage is not configured.", 503);
  const doc = await context.databases.createDocument({ databaseId: context.config.databaseId, collectionId: context.config.decksId, documentId: ID.unique(), data: { title: values.name, type: values.type, words, userID: context.user.$id }, permissions: [Permission.read(Role.user(context.user.$id))] });
  return { $id: doc.$id, title: doc.title, type: doc.type, words: strings(doc.words), userID: context.user.$id };
}

export async function deleteDeck(context: UserContext, input: unknown) {
  const deckId = parse(id, input);
  if (!context.config.decksId) throw new AccessError("Deck storage is not configured.", 503);
  const doc = await context.databases.getDocument({ databaseId: context.config.databaseId, collectionId: context.config.decksId, documentId: deckId });
  if (doc.userID !== context.user.$id) throw new AccessError("You cannot delete this deck.", 403);
  await context.databases.deleteDocument({ databaseId: context.config.databaseId, collectionId: context.config.decksId, documentId: deckId });
}

export async function submitFeedback(context: UserContext, input: unknown) {
  const data = parse(z.object({ tag: z.enum(["bug", "suggestion", "missing", "general"]), feedback: z.string().trim().min(1).max(1000), name: z.string().trim().max(100).optional(), email: z.union([z.literal(""), z.string().email().max(254)]).optional() }).strict(), input);
  if (!context.config.feedbackId) throw new AccessError("Feedback storage is not configured.", 503);
  await context.databases.createDocument({ databaseId: context.config.databaseId, collectionId: context.config.feedbackId, documentId: ID.unique(), data: { tag: data.tag, feedback: data.feedback, ...(data.name ? { name: data.name } : {}), ...(data.email ? { email: data.email } : {}) }, permissions: [] });
}

export async function createAudioAccess(context: UserContext, input: unknown) {
  const conversationId = parse(id, input);
  const { document } = await ensureProfile(context);
  if (document.isSubscribed !== true) throw new AccessError("Audio is available with Plus.", 403);
  const conversation = await context.databases.getDocument({ databaseId: context.config.databaseId, collectionId: context.config.conversationsId, documentId: conversationId });
  if (!conversation.audioFileId) throw new AccessError("No audio is available for this conversation.", 404);
  const bucketId = context.config.audioBucketId;
  if (!bucketId) throw new AccessError("Audio storage is not configured.", 503);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const token = await context.tokens.createFileToken({ bucketId, fileId: parse(id, conversation.audioFileId), expire: expiresAt });
  const url = new URL(context.config.endpoint + "/storage/buckets/" + encodeURIComponent(bucketId) + "/files/" + encodeURIComponent(conversation.audioFileId) + "/view");
  url.searchParams.set("project", context.config.projectId);
  url.searchParams.set("token", token.secret);
  return { url: url.toString(), expiresAt };
}

export async function deleteCurrentAccount(context: UserContext) {
  // Query only records belonging to the verified caller; repeat the first page as it is removed.
  const collections = [
    [context.config.decksId, "userID"],
    [process.env.APPWRITE_FRIEND_REQUESTS_ID ?? process.env.NEXT_PUBLIC_APPWRITE_FRIEND_REQUESTS_ID, "fromUserId"],
    [process.env.APPWRITE_FRIEND_REQUESTS_ID ?? process.env.NEXT_PUBLIC_APPWRITE_FRIEND_REQUESTS_ID, "toUserId"],
    [process.env.APPWRITE_ASSIGNMENTS_ID ?? process.env.NEXT_PUBLIC_APPWRITE_ASSIGNMENTS_ID, "studentId"],
    [process.env.APPWRITE_ASSIGNMENTS_ID ?? process.env.NEXT_PUBLIC_APPWRITE_ASSIGNMENTS_ID, "teacherId"],
  ];
  for (const [collectionId, field] of collections) {
    if (!collectionId || !field) continue;
    while (true) {
      const page = await context.databases.listDocuments({ databaseId: context.config.databaseId, collectionId, queries: [Query.equal(field, context.user.$id), Query.limit(100)] });
      if (!page.documents.length) break;
      for (const doc of page.documents) {
        if (doc[field] !== context.user.$id) throw new AccessError("Unable to verify ownership of account data.", 403);
        await context.databases.deleteDocument({ databaseId: context.config.databaseId, collectionId, documentId: doc.$id });
      }
    }
  }
  try { await context.databases.deleteDocument({ databaseId: context.config.databaseId, collectionId: context.config.usersId, documentId: context.user.$id }); }
  catch (error) { if (errorCode(error) !== 404) throw error; }
  await context.users.delete({ userId: context.user.$id });
}
