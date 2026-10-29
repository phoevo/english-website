import { account } from "@/data/appwrite";
import { audioAccessAction, createDeckAction, deleteDeckAction, feedbackAction, getProfileAction, listDecksAction, updateProfileAction } from "@/app/actions/account";
import type { ActionResult, ProfileOperation } from "@/lib/profileTypes";

type Credential = { userId: string; jwt: string; expiresAt: number };
let credential: Credential | undefined;
let pendingCredential: { userId: string; request: Promise<Credential> } | undefined;

async function currentCredential() {
  // Check the current session before reusing a token, including after account changes.
  let user;
  try { user = await account.get(); }
  catch (error) { credential = undefined; pendingCredential = undefined; throw error; }
  if (credential?.userId === user.$id && credential.expiresAt > Date.now()) return credential;
  if (pendingCredential?.userId === user.$id) return pendingCredential.request;
  const request = account.createJWT().then(({ jwt }) => ({ userId: user.$id, jwt, expiresAt: Date.now() + 10 * 60 * 1000 }));
  pendingCredential = { userId: user.$id, request };
  try { credential = await request; return credential; }
  finally { if (pendingCredential?.request === request) pendingCredential = undefined; }
}

// Session credentials stay in memory; the server verifies them on every operation.
export async function withAccount<T>(action: (jwt: string) => Promise<ActionResult<T>>, expectedUserId?: string): Promise<T> {
  let current = await currentCredential();
  const owner = expectedUserId ?? current.userId;
  const assertOwner = () => {
    if (current.userId !== owner || (credential && credential.userId !== owner)) {
      throw new Error("Your account changed. Please try again.");
    }
  };
  assertOwner();
  let result = await action(current.jwt);
  if (!result.ok && result.status === 401) {
    credential = undefined;
    current = await currentCredential();
    assertOwner();
    result = await action(current.jwt);
  }
  assertOwner();
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

// Serialize array edits in this browser so rapid saves cannot overwrite one another.
let profileWrites: Promise<unknown> = Promise.resolve();
export function updateMyProfile(operation: ProfileOperation) {
  // Capture the initiating account before queuing, so old clicks cannot edit a newly signed-in account.
  const owner = account.get().then(
    user => ({ ok: true as const, id: user.$id }),
    error => ({ ok: false as const, error }),
  );
  const request = profileWrites.catch(() => undefined).then(async () => {
    const initiatingAccount = await owner;
    if (!initiatingAccount.ok) throw initiatingAccount.error;
    return withAccount(jwt => updateProfileAction(jwt, operation), initiatingAccount.id);
  });
  profileWrites = request;
  return request;
}
export const getMyProfile = () => withAccount(getProfileAction);
export const getMyDecks = () => withAccount(listDecksAction);
export const createMyDeck = (input: { name: string; type: string; words: string[] }) => withAccount(jwt => createDeckAction(jwt, input));
export const deleteMyDeck = (id: string) => withAccount(jwt => deleteDeckAction(jwt, id));
export const sendMyFeedback = (input: { tag: string; feedback: string; name?: string; email?: string }) => withAccount(jwt => feedbackAction(jwt, input));
export const getMyAudioAccess = (conversationId: string) => withAccount(jwt => audioAccessAction(jwt, conversationId));
