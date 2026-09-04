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
  const effectiveDate: string = "July 4th, 2026"; // update when needed
  const companyName: string = "Synomilo";
  const contactEmail: string = "synomiloteam@gmail.com";

  return (
    <main
      className={`pt-10 max-w-4xl mx-auto prose prose-neutral ${geist.className} text-foreground`}
    >
      <ScrollArea className="h-screen overflow-y-auto px-2">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-normal mb-3 text-foreground ${dmSans.className}`}
        >
          Terms of Service
        </h1>

        <p className="mb-2 text-muted-foreground">
          Effective date: {effectiveDate}
        </p>

        <p className="mb-6 text-muted-foreground">
          These Terms of Service (“Terms”) govern your use of {companyName} (“we”,
          “us”, or “our”). By creating an account or using our Service, you
          agree to these Terms. If you do not agree, you may not use the
          Service.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Eligibility
          </h2>
          <p className="text-muted-foreground">
            You must be at least 13 years old (or the minimum age required by
            your local law) to use the Service. By using the Service, you
            confirm that you meet this requirement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Account registration
          </h2>
          <p className="text-muted-foreground">
            To use the Service, you must provide a username and email address.
            You are responsible for maintaining the security of your account
            and password, and for all activity that occurs under your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Intellectual property
          </h2>
          <p className="text-muted-foreground">
            The Service, including its software, design, branding, text,
            conversations, graphics, and other materials, belongs to{" "}
            {companyName} or its licensors. You may not copy, resell,
            redistribute, or exploit any part of the Service without our
            permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Subscriptions and payments
          </h2>
          <p className="text-muted-foreground">
            Some features of the Service may require a paid subscription.
            Payments are processed by Stripe. We do not store your payment card
            details.
          </p>
          <p className="mt-2 text-muted-foreground">
            Subscriptions renew automatically unless cancelled before the next
            billing date. You may cancel your subscription at any time.
            Cancellation stops future renewals, but you will keep access until
            the end of your current paid billing period.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Refunds and digital access
          </h2>
          <p className="text-muted-foreground">
            Because the Service provides immediate access to digital content
            and subscription features, refunds are generally not provided once
            access has been granted, except where required by applicable law or
            where there has been an error, duplicate charge, or incorrect
            billing.
          </p>
          <p className="mt-2 text-muted-foreground">
            Where required by law, you may be asked before purchase to
            expressly request immediate access and acknowledge that you lose
            your statutory right of withdrawal once access begins.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Acceptable use
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              You may not use the Service for unlawful purposes or to violate
              any laws.
            </li>
            <li>You may not harass, abuse, or harm other users.</li>
            <li>
              You may not attempt to hack, disrupt, or reverse engineer the
              Service.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Account termination
          </h2>
          <p className="text-muted-foreground">
            You may delete your account at any time in your account settings.
            Account deletion removes your access to the Service and deletes
            your account data in accordance with our Privacy Policy.
          </p>
          <p className="mt-2 text-muted-foreground">
            We may suspend or terminate your account if you violate these
            Terms, misuse the Service, or use the Service in a way that may
            harm us, other users, or the platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Disclaimer of warranties
          </h2>
          <p className="text-muted-foreground">
            The Service is provided “as is” and “as available.” We make no
            guarantees about uptime, reliability, or suitability for your
            purposes, especially while in early access.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Limitation of liability
          </h2>
          <p className="text-muted-foreground">
            To the maximum extent permitted by law, {companyName} shall not be
            liable for any indirect, incidental, special, or consequential
            damages arising out of or relating to your use of the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Changes to the Service
          </h2>
          <p className="text-muted-foreground">
            We may modify, suspend, or discontinue parts of the Service at any
            time, especially while the Service is in early access. We will try
            to avoid unnecessary disruption, but we do not guarantee that all
            features will remain available permanently.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Consumer rights
          </h2>
          <p className="text-muted-foreground">
            Nothing in these Terms limits any mandatory consumer rights that
            you may have under applicable law.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Governing law
          </h2>
          <p className="text-muted-foreground">
            These Terms are governed by the laws of Greece, without limiting
            any mandatory consumer protection rights available to you under
            applicable law.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Changes to these Terms
          </h2>
          <p className="text-muted-foreground">
            We may update these Terms from time to time. We will post the
            updated version with a new effective date. If changes are material,
            we will provide additional notice where required by law. Your
            continued use of the Service means you accept the updated Terms.
          </p>
        </section>

        <section className="mb-15">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Contact us
          </h2>
          <p className="text-muted-foreground">
            If you have questions about these Terms, contact us at{" "}
            {contactEmail}.
          </p>
        </section>
      </ScrollArea>
    </main>
  );
}
