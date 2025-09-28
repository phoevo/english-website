import React from "react";
import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";

const geist = Geist({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for using Synomilo.",
};

export default function TermsPage() {
  const effectiveDate: string = "2025-09-10"; // update when needed
  const companyName: string = "Synomilo";
  const contactEmail: string = "synomilo@gmail.com";

  return (
    <main className={`pt-10 max-w-4xl mx-auto prose prose-neutral ${geist.className}`}>
      <ScrollArea className="h-screen overflow-y-auto px-2">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-normal mb-3 ${dmSans.className}`}>
          Terms of Service
        </h1>
        <p className="mb-2">Effective date: {effectiveDate}</p>
        <p className="mb-6">
          These Terms of Service (“Terms”) govern your use of {companyName} (“we”, “us”, or “our”). By creating an
          account or using our Service, you agree to these Terms. If you do not agree, you may not use the Service.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Eligibility</h2>
          <p>
            You must be at least 13 years old (or the minimum age required by your local law) to use the Service. By
            using the Service, you confirm that you meet this requirement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Account registration</h2>
          <p>
            To use the Service, you must provide a username and email address. You are responsible for maintaining the
            security of your account and password, and for all activity that occurs under your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Subscriptions and payments</h2>
          <p>
            Some features of the Service may require a paid subscription. Payments are processed by our third-party
            provider (e.g., Stripe) and subject to their terms. We do not store payment card details. Subscription
            details, pricing, and refund policies will be presented at the point of purchase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Acceptable use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You may not use the Service for unlawful purposes or to violate any laws.</li>
            <li>You may not harass, abuse, or harm other users.</li>
            <li>You may not attempt to hack, disrupt, or reverse engineer the Service.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Account termination</h2>
          <p>
            You may delete your account at any time in your account settings, which will permanently erase your data. We
            may suspend or terminate your account if you violate these Terms or misuse the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Disclaimer of warranties</h2>
          <p>
            The Service is provided “as is” and “as available.” We make no guarantees about uptime, reliability, or
            suitability for your purposes, especially while in beta.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {companyName} shall not be liable for any indirect, incidental,
            special, or consequential damages arising out of or relating to your use of the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. We will post the updated version with a new effective date. If
            changes are material, we will provide additional notice where required by law. Your continued use of the
            Service means you accept the updated Terms.
          </p>
        </section>

        <section className="mb-15">
          <h2 className="text-2xl font-semibold mb-2">Contact us</h2>
          <p>
            If you have questions about these Terms, contact us at {contactEmail}.
          </p>
        </section>
      </ScrollArea>
    </main>
  );
}
