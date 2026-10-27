"use client";

import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { account } from "@/data/appwrite";
import { checkSubscriptionStatus } from "@/data/getData";
import { useUserStore } from "@/data/useUserStore";
import { Button } from "@/components/ui/button";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ['latin'] });


export default function SubscribeSuccessPage() {
  useEffect(() => {
    let cancelled = false;

    toast.success("Thanks for subscribing! Your Pro access is being activated.");

    // Stripe provisions via the webhook asynchronously, so poll the user doc
    // briefly and flip the local subscribed state once it lands.
    (async () => {
      // This route lives outside the dashboard group and is reached via a full
      // page load from Stripe, so the user store may not be hydrated yet.
      // Resolve the user id directly when it's missing.
      let uid = useUserStore.getState().user?.$id;
      if (!uid) {
        try {
          uid = (await account.get()).$id;
        } catch {
          return;
        }
      }

      for (let attempt = 0; attempt < 8 && !cancelled; attempt++) {
        if (uid && (await checkSubscriptionStatus(uid))) {
          useUserStore.getState().setSubscribed(true);
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
<main className={`w-full h-screen flex flex-col items-center justify-center mx-auto p-6 space-y-4 ${dmSans.className}`}>
  <h1 className="text-3xl font-semibold text-green-500">Payment successful!</h1>
      <p className="text-muted-foreground text-center">
        Thank you for subscribing to Plus! We really appreciate you choosing to support Synomilo. Your Plus access has been activated and is ready to use.
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
