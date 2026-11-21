"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { account } from "@/data/appwrite";
import { useUserStore } from "@/data/useUserStore";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = {
  conversationId: string;
  level?: string;
  isPlus?: boolean;
  /** Where the button is shown, for analytics. */
  source: "conversation" | "guide";
  className?: string;
};

// Opens the conversation PDF in a new tab, where the browser's viewer offers
// download and print. The server applies the same access rules as reading:
// anyone for Free conversations, Plus subscribers for Plus ones.
export default function DownloadPdfButton({ conversationId, level, isPlus = false, source, className }: Props) {
  const storeUser = useUserStore(state => state.user);
  const [pending, setPending] = useState(false);
  // null until known, so signed-in visitors never see the sign-up line flash.
  const [signedIn, setSignedIn] = useState<boolean | null>(storeUser ? true : null);

  // Guide pages don't load the user store, so check the session directly.
  useEffect(() => {
    if (storeUser) { setSignedIn(true); return; }
    let cancelled = false;
    account.get().then(() => !cancelled && setSignedIn(true), () => !cancelled && setSignedIn(false));
    return () => { cancelled = true; };
  }, [storeUser]);

  async function openPdf() {
    if (pending) return;
    // Open the tab during the click itself so pop-up blockers allow it, then
    // load the PDF into it once we know whether the visitor is signed in.
    const tabName = `synomilo-pdf-${Date.now()}`;
    const tab = window.open("", tabName);
    if (!tab) {
      toast.error("Your browser blocked the new tab. Allow pop-ups for this site and try again.");
      return;
    }
    tab.document.title = "Preparing PDF…";
    tab.document.body.innerHTML = '<p style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#57534e;margin:15vh auto;max-width:480px;padding:0 24px;">Preparing PDF…</p>';

    setPending(true);
    try {
      // Re-check at click time: the session may have changed since the page loaded.
      const isSignedIn = Boolean(storeUser) || Boolean(await account.get().catch(() => null));
      setSignedIn(isSignedIn);

      // A form post keeps the session token out of the URL (and browser history).
      const form = document.createElement("form");
      form.method = "POST";
      form.action = `/api/conversations/${encodeURIComponent(conversationId)}/pdf`;
      form.target = tabName;
      if (isSignedIn) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "jwt";
        input.value = (await account.createJWT()).jwt;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
      form.remove();

      trackEvent("pdf_download", { conversation_id: conversationId, ...(level ? { level } : {}), plus: isPlus, signed_in: isSignedIn, source });
    } catch {
      tab.close();
      toast.error("The PDF could not be opened. Please try again.");
    } finally {
      setPending(false);
    }
  }

  // Block + inline button: follows the surrounding text alignment (left in a
  // section, centred in a centred call-to-action box).
  return <span className={cn("block", className)}>
    <Button type="button" variant="default" onClick={openPdf} disabled={pending} aria-busy={pending} className="cursor-pointer text-sm font-medium">
      {pending ? <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}
      {pending ? "Preparing PDF…" : "Download PDF"}
    </Button>
    {/* Guides only, for signed-out visitors: the conversation page already has a
        sign-up banner. Free accounts save words; audio is Plus; definitions on
        hover are open to everyone. */}
    {source === "guide" && signedIn === false && <span className="mt-2 block text-xs leading-5 text-muted-foreground">
      <Link href={`/home/conversations/${encodeURIComponent(conversationId)}`} className="underline underline-offset-4">Read it online</Link> with definitions on hover.{" "}
      <Link href="/register" className="underline underline-offset-4">Create a free account</Link> to save words, or get <Link href="/pricing" className="underline underline-offset-4">Plus</Link> for audio.
    </span>}
  </span>;
}
