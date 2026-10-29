"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toast } from "sonner";
import ModeToggle from "@/components/ui/ModeToggle";
import { useUserStore } from "@/data/useUserStore";
import { account } from "@/data/appwrite";
import { subscribeUser2 } from "@/data/getData";

gsap.registerPlugin(useGSAP);

const billingOptions = {
  monthly: { price: "9.99", interval: "month", checkoutPlan: "Tutor Monthly" },
  yearly: { price: "89.99", interval: "year", checkoutPlan: "Tutor Yearly" },
} as const;

// Student.tsx and Tutor.tsx retain the original pricing implementations.
// Checkout still uses the original tutor plan identifiers for Free and Plus.
export default function PricingPage() {
  const page = useRef<HTMLDivElement>(null);
  const [billing, setBilling] = useState<keyof typeof billingOptions>("monthly");
  const [pending, setPending] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const { user, fetchUser, isSubscribed, isTeacher } = useUserStore();
  const selected = billingOptions[billing];
  const subscribed = Boolean(user && isTeacher && isSubscribed);

  useEffect(() => {
    let cancelled = false;
    const restoreSession = async () => {
      try {
        if (!user) { await account.get(); if (!cancelled) await fetchUser(); }
      } catch { /* Visitors can browse prices without signing in. */ }
      finally { if (!cancelled) setCheckingSession(false); }
    };
    void restoreSession();
    return () => { cancelled = true; };
  }, [user, fetchUser]);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-pricing-intro] > *, [data-plan]", {
        autoAlpha: 0, y: 18, duration: 0.65, stagger: 0.09, ease: "power2.out",
      });
    });
    return () => media.revert();
  }, { scope: page });

  async function subscribe() {
    if (!user || !isTeacher || isSubscribed || pending || checkingSession) return;
    setPending(true);
    toast.loading("Redirecting to payment…", { id: "subscription-loading" });
    try {
      await subscribeUser2(user.$id, selected.checkoutPlan);
      toast.dismiss("subscription-loading");
    } catch {
      toast.error("Unable to open checkout. Please try again.", { id: "subscription-loading" });
    } finally { setPending(false); }
  }

  const buttonClass = "inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-md px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

  return (
    <div ref={page} className="min-h-svh bg-background text-foreground [font-family:var(--font-geist-sans,Arial),Arial,sans-serif]">
      <header className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-5 px-6 lg:px-12">
        <Link href="/" className="text-2xl font-medium tracking-tight" aria-label="Synomilo home">synomilo</Link>
        <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm">
          <Link href="/guides" className="hover:underline">Guides</Link>
          <Link href={user ? "/home/conversations" : "/login"} className="hover:underline">{user ? "Conversations" : "Log in"}</Link>
          <ModeToggle />
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-12 pb-20 sm:pt-5 lg:pb-28">
        <div data-pricing-intro className="mb-10 text-center sm:mb-12">
          <h1 className="text-3xl font-medium leading-tight tracking-[-.045em] sm:text-5xl">Free and Plus.</h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-muted-foreground">Read every conversation for free. Choose Plus to listen to the audio too.</p>
          <div role="group" aria-label="Plus billing period" className="mt-7 inline-flex rounded-full border border-border p-1">
            {(["monthly", "yearly"] as const).map(option => (
              <button key={option} type="button" aria-pressed={billing === option} disabled={pending} onClick={() => setBilling(option)} className={`rounded-full px-5 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:opacity-50 ${billing === option ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                {option === "monthly" ? "Monthly" : "Yearly"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 sm:gap-6">
          <article data-plan aria-labelledby="free-plan" className="flex flex-col rounded-2xl border border-border bg-background p-7 sm:p-9">
            <h2 id="free-plan" className="text-2xl font-medium tracking-tight">Free</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Read and work with every conversation.</p>
            <p className="mt-7 text-3xl font-medium tracking-[-.04em]">€0</p>
            <p className="mt-2 text-xs text-muted-foreground">No subscription required.</p>
            <ul className="mt-8 mb-10 space-y-4 border-t border-border pt-6 text-sm leading-6">
              <Feature>Access to all conversations</Feature>
              <Feature>All word types and highlight colors</Feature>
              <Feature>Save vocabulary to your dictionary</Feature>
            </ul>
            <div className="mt-auto">
              <Link href={user ? "/home/conversations" : "/register"} className={`${buttonClass} border border-border bg-accent hover:bg-muted/`}>{user ? "Browse conversations" : "Start free"}<ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </article>

          <article data-plan aria-labelledby="plus-plan" className="flex flex-col rounded-2xl border border-foreground/35 bg-background p-7 sm:p-9">
            <h2 id="plus-plan" className="text-2xl font-medium tracking-tight">Plus</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Everything in Free, with conversation audio.</p>
            <p aria-live="polite" aria-atomic="true" className="mt-7 text-3xl font-medium tracking-[-.04em]">€{selected.price}<span className="ml-1 text-base font-normal tracking-normal text-muted-foreground">/{selected.interval}</span></p>
            <p className="mt-2 text-xs text-muted-foreground">{billing === "yearly" ? "Billed yearly. " : "Billed monthly. "}Plus applicable taxes.</p>
            <ul className="mt-8 mb-10 space-y-4 border-t border-border pt-6 text-sm leading-6">
              <Feature>Everything in Free</Feature>
              <Feature>Listen to conversation audio</Feature>

            </ul>
            <div className="mt-auto">
              {checkingSession ? <button disabled className={`${buttonClass} bg-primary text-primary-foreground opacity-60`}>Checking account…</button>
                : !user ? <Link href="/register" className={`${buttonClass} bg-primary text-primary-foreground hover:bg-primary/90`}>Get Plus<ArrowUpRight size={16} aria-hidden="true" /></Link>
                : <button type="button" onClick={subscribe} disabled={pending || subscribed || !isTeacher} className={`${buttonClass} bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-default disabled:opacity-60`}>{pending ? "Opening checkout…" : subscribed ? "Subscribed" : !isTeacher ? "Requires a tutor account" : "Get Plus"}</button>}
            </div>
          </article>
        </div>
      </main>

      <footer className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-5 border-t border-border px-6 py-8 lg:px-12">
        <Link href="/" className="text-xl font-medium tracking-tight">synomilo</Link>
        <nav aria-label="Legal" className="flex flex-wrap gap-6 text-xs text-muted-foreground"><Link href="/ToS" className="hover:text-foreground">Terms</Link><Link href="/privacy" className="hover:text-foreground">Privacy</Link><Link href="/refund" className="hover:text-foreground">Refunds</Link></nav>
      </footer>
    </div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-3"><Check size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-muted-foreground" aria-hidden="true" /><span>{children}</span></li>;
}
