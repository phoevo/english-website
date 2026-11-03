"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { account } from "@/data/appwrite";
import { checkSubscriptionStatus, confirmCheckoutAndSync } from "@/data/getData";
import { useUserStore } from "@/data/useUserStore";
import { Button } from "@/components/ui/button";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ['latin'] });


export default function SubscribeSuccessPage() {
  const router = useRouter();
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // The webhook remains responsible for ongoing subscription changes. The
    // authenticated session check also confirms access after the redirect.
    (async () => {
      // This route lives outside the dashboard group and is reached via a full
      // page load from Stripe, so the user store may not be hydrated yet.
      // Resolve the user id directly when it's missing.
      let uid = useUserStore.getState().user?.$id;
      if (!uid) {
        try {
          uid = (await account.get()).$id;
        } catch {
          setSignedOut(true);
          return;
        }
      }

      const checkoutId = new URLSearchParams(window.location.search).get("checkout_id");
      for (let attempt = 0; attempt < 10 && !cancelled; attempt++) {
        let confirmed = false;
        if (checkoutId) {
          try {
            confirmed = await confirmCheckoutAndSync(checkoutId);
          } catch (error) {
            console.error("Could not confirm the Checkout Session yet.", error);
          }
        }
        if (!confirmed && uid) confirmed = await checkSubscriptionStatus(uid);
        if (confirmed) {
          useUserStore.getState().setSubscribed(true);
          router.replace("/home?welcome=plus");
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      // Still not confirmed after ~20s: the webhook may be delayed, so let
      // the user continue and explain on /home.
      if (!cancelled) router.replace("/home?welcome=pending");
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
<main className={`w-full h-screen flex flex-col items-center justify-center mx-auto p-6 space-y-4 ${dmSans.className}`}>
  <h1 className="text-3xl font-semibold">{signedOut ? "Payment received." : "Activating Plus…"}</h1>
      <p className="text-center text-muted-foreground">
        {signedOut
          ? "Log in to start using Plus."
          : "This usually takes a few seconds. You’ll be taken to your home page."}
      </p>
      <div className="flex gap-3">
        <Link href="/pricing">
          <Button variant="outline" className="cursor-pointer">Back to Pricing</Button>
        </Link>
        <Link href="/home">
          <Button className="cursor-pointer">Go to Home</Button>
        </Link>
      </div>
    </main>
  );
}
