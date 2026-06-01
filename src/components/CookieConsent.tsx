"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import { Geist, DM_Sans } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const STORAGE_KEY = "cookie-consent";

type Consent = "granted" | "denied" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    setConsent(stored);
    setLoaded(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "granted");
    setConsent("granted");
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "denied");
    setConsent("denied");
  };

  // Don't render anything until we've checked localStorage
  if (!loaded) return null;

  return (
    <div className={geist.className}>
      {consent === "granted" && GA_ID && <GoogleAnalytics gaId={GA_ID} />}

      {consent === null && (
        <div className={`fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg${geist.className}`}>
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              We use cookies to understand how you use Synomilo and improve your
              experience. You can accept or decline analytics cookies.
            </p>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" onClick={handleDecline}>
                Decline
              </Button>
              <Button size="sm" onClick={handleAccept}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
