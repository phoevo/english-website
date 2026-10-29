import { AccessError, getUserContext } from "@/lib/server/appwrite";
import { deleteCurrentAccount } from "@/lib/server/profiles";

export async function POST(request: Request) {
  try {
    const match = request.headers.get("authorization")?.match(/^Bearer (.+)$/);
    if (!match) throw new AccessError("Please sign in to delete your account.", 401);
    const context = await getUserContext(match[1]);
    let body: unknown;
    try { body = await request.json(); } catch { throw new AccessError("Invalid request."); }
    if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(key => key !== "userId")) throw new AccessError("Invalid request.");
    // Support the existing caller, but never use its ID as the deletion target.
    if ("userId" in body && body.userId !== context.user.$id) throw new AccessError("You cannot delete another account.", 403);
    await deleteCurrentAccount(context);
    return Response.json({ success: true }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    const status = error instanceof AccessError ? error.status : 500;
    const message = error instanceof AccessError ? error.message : "Account deletion could not be completed. Please try again.";
    return Response.json({ error: message }, { status, headers: { "Cache-Control": "private, no-store" } });
  }
}
