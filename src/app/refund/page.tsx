import React from "react";
import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";

const geist = Geist({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund Policy for Synomilo subscriptions.",
};

export default function RefundPolicyPage() {
  const effectiveDate: string = "July 4th, 2026";
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
          Refund Policy
        </h1>

        <p className="mb-2 text-muted-foreground">
          Effective date: {effectiveDate}
        </p>

        <p className="mb-6 text-muted-foreground">
          This Refund Policy explains when refunds may be available for
          subscriptions purchased through {companyName} (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;). By purchasing a subscription,
          you agree to this Refund Policy.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Immediate access to digital content
          </h2>
          <p className="mt-2 text-muted-foreground">
            Where permitted by applicable law, you may be asked during checkout
            to expressly request immediate access to the Service and
            acknowledge that your statutory right of withdrawal no longer
            applies once your paid subscription begins.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            When refunds are generally not available
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>For subscription renewal payments.</li>
            <li>For unused time remaining in an active subscription.</li>
            <li>
              After you have cancelled your subscription but still have access
              until the end of your paid billing period.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Exceptions
          </h2>
          <p className="text-muted-foreground">
            We may issue refunds in situations including, but not limited to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
            <li>Duplicate or accidental charges.</li>
            <li>Incorrect billing.</li>
            <li>Technical payment errors.</li>
            <li>Fraudulent transactions.</li>
            <li>Where a refund is required by applicable law.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Requesting a refund
          </h2>
          <p className="text-muted-foreground">
            To request a refund, contact us at {contactEmail} within the
            applicable refund period.
          </p>
          <p className="mt-2 text-muted-foreground">
            Please include the email address associated with your account, the
            date of purchase, and a brief description of your request.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Refund processing
          </h2>
          <p className="text-muted-foreground">
            If your refund request is approved, the refund will be issued to the
            original payment method used for the purchase. Processing times may
            vary depending on your payment provider or financial institution.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Changes to this Refund Policy
          </h2>
          <p className="text-muted-foreground">
            We may update this Refund Policy from time to time. We will post the
            updated version with a new effective date. If changes are material,
            we will provide additional notice where required by law.
          </p>
        </section>

        <section className="mb-15">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Contact us
          </h2>
          <p className="text-muted-foreground">
            If you have any questions about this Refund Policy, contact us at{" "}
            {contactEmail}.
          </p>
        </section>
      </ScrollArea>
    </main>
  );
}
