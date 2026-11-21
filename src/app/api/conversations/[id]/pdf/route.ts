import { AccessError, getPublicReadContext, getUserContext } from "@/lib/server/appwrite";
import { getAccessibleConversation, getPublicConversationPreview } from "@/lib/server/profiles";
import { pdfFileName, renderConversationPdf } from "@/lib/server/conversationPdf";

export const runtime = "nodejs";

// Same access rules as reading the conversation: Free conversations for everyone,
// Plus conversations only for signed-in subscribers (checked by the server).
async function loadConversation(id: string, jwt: string | null) {
  return jwt
    ? getAccessibleConversation(await getUserContext(jwt), id)
    : getPublicConversationPreview(await getPublicReadContext(), id);
}

async function pdfResponse(id: string, jwt: string | null, disposition: "inline" | "attachment") {
  const conversation = await loadConversation(id, jwt);
  const pdf = await renderConversationPdf(conversation);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${pdfFileName(conversation.title)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

function failure(error: unknown) {
  const status = error instanceof AccessError ? error.status : 500;
  const message = error instanceof AccessError ? error.message : "The PDF could not be created. Please try again.";
  if (!(error instanceof AccessError)) console.error("PDF generation failed:", error);
  return { status, message };
}

// Download with an optional "Authorization: Bearer <jwt>" header.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const jwt = request.headers.get("authorization")?.match(/^Bearer (.+)$/)?.[1] ?? null;
    return await pdfResponse(id, jwt, "attachment");
  } catch (error) {
    const { status, message } = failure(error);
    return Response.json({ error: message }, { status, headers: { "Cache-Control": "private, no-store" } });
  }
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]!));

// Opened in a new tab by the download button: the form posts the session token
// (so it never appears in the URL) and the browser shows the PDF in its viewer.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const form = await request.formData().catch(() => null);
    const token = form?.get("jwt");
    return await pdfResponse(id, typeof token === "string" && token ? token : null, "inline");
  } catch (error) {
    const { status, message } = failure(error);
    const plusLink = status === 403 ? `<p><a href="/pricing">View Plus</a></p>` : "";
    const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>PDF unavailable</title></head>`
      + `<body style="margin:0;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#111;background:#fff;">`
      + `<main style="max-width:480px;margin:15vh auto;padding:0 24px;line-height:1.6;"><h1 style="font-size:22px;font-weight:500;">The PDF couldn&rsquo;t be opened</h1>`
      + `<p style="color:#57534e;">${escapeHtml(message)}</p>${plusLink}<p><a href="/home/conversations">Back to conversations</a></p></main></body></html>`;
    return new Response(page, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store" } });
  }
}
