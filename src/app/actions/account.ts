"use server";

import type { ActionResult } from "@/lib/profileTypes";
import { AccessError, getUserContext } from "@/lib/server/appwrite";
import { createAudioAccess, createDeck, deleteDeck, ensureProfile, listDecks, mutateProfile, profileView, submitFeedback } from "@/lib/server/profiles";

async function run<T>(jwt: string, operation: (context: Awaited<ReturnType<typeof getUserContext>>) => Promise<T>): Promise<ActionResult<T>> {
  try { return { ok: true, data: await operation(await getUserContext(jwt)) }; }
  catch (error) {
    if (error instanceof AccessError) return { ok: false, error: error.message, status: error.status };
    // No SDK response bodies, credentials, tokens, or database internals reach the browser.
    return { ok: false, error: "The request could not be completed. Please try again.", status: 500 };
  }
}

export async function getProfileAction(jwt: string) {
  return run(jwt, async context => { const result = await ensureProfile(context); return { created: result.created, document: profileView(context, result.document) }; });
}
export async function updateProfileAction(jwt: string, input: unknown) { return run(jwt, context => mutateProfile(context, input)); }
export async function listDecksAction(jwt: string) { return run(jwt, listDecks); }
export async function createDeckAction(jwt: string, input: unknown) { return run(jwt, context => createDeck(context, input)); }
export async function deleteDeckAction(jwt: string, input: unknown) { return run(jwt, context => deleteDeck(context, input)); }
export async function feedbackAction(jwt: string, input: unknown) { return run(jwt, context => submitFeedback(context, input)); }
export async function audioAccessAction(jwt: string, conversationId: string) { return run(jwt, context => createAudioAccess(context, conversationId)); }
