"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Welcome = "plus" | "pending";

// Shown once after checkout; the success page redirects here with ?welcome=plus|pending.
export default function WelcomePlus() {
  const [welcome, setWelcome] = useState<Welcome | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("welcome");
    if (value !== "plus" && value !== "pending") return;
    setWelcome(value);
    // Drop the param so a refresh doesn't show the window again.
    params.delete("welcome");
    const query = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (query ? `?${query}` : ""));
  }, []);

  return <Dialog open={welcome !== null} onOpenChange={open => { if (!open) setWelcome(null); }}>
    <DialogContent>
      {welcome === "pending" ? <DialogHeader>
        <DialogTitle>Plus is activating</DialogTitle>
        <DialogDescription>Your payment went through. It can take a minute for Plus to switch on. Refresh the page shortly if audio is still locked.</DialogDescription>
      </DialogHeader> : <DialogHeader>
        <DialogTitle>Welcome to Plus</DialogTitle>
        <DialogDescription>Your subscription is active. Here is what you can do now.</DialogDescription>
      </DialogHeader>}
      {welcome === "plus" && <ul className="space-y-3 text-sm leading-6">
        <li className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0" aria-hidden="true" />Listen to the audio for each conversation</li>
        <li className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0" aria-hidden="true" />Open conversations marked Plus</li>
      </ul>}
      <DialogFooter>
        <DialogClose asChild>
          <Link href="/home/conversations" className="inline-flex min-h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background">Browse conversations</Link>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>;
}
