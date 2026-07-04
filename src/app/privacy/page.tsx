import React from "react";
import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";

const geist = Geist({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "We only collect a username and email. We do use cookies for analytics. Local storage is used only for UI preferences.",
};

export default function PrivacyPage() {
  const effectiveDate: string = "July 4th, 2026";
  const companyName: string = "Synomilo";
  const contactEmail: string = "synomiloteam@gmail.com";

  return (
    <main className={`pt-10 max-w-4xl mx-auto prose prose-neutral ${geist.className}`}>
      <ScrollArea className="h-screen overflow-y-auto px-2">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-normal mb-3 ${dmSans.className}`}>
  Privacy Policy
</h1>

<p className="mb-2">Effective date: {effectiveDate}</p>

<p className="mb-6">
  This Privacy Policy explains how {companyName} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
  collects, uses, stores, and protects your personal information when you use our Service.
  We aim to collect only the information needed to operate the Service.
</p>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Who we are</h2>
  <p>Data Controller: {companyName}, operating from Greece.</p>
  <p>Contact: {contactEmail}</p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Information we collect</h2>
  <ul className="list-disc pl-5 space-y-2">
    <li><strong>Account information:</strong> username and email address.</li>
    <li><strong>Subscription information:</strong> subscription status and billing-related identifiers provided by our payment provider.</li>
    <li><strong>Local storage:</strong> non-sensitive UI preferences, such as whether you dismissed a popup.</li>
    <li><strong>Cookies:</strong> cookies necessary for basic website functionality and simple visit counting.</li>
  </ul>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">How we use your information</h2>
  <ul className="list-disc pl-5 space-y-2">
    <li>To create, authenticate, and maintain your account.</li>
    <li>To provide access to the Service and paid subscription features.</li>
    <li>To communicate with you about your account, billing, security, or important Service updates.</li>
    <li>To protect the security and integrity of the Service.</li>
    <li>To comply with legal obligations and enforce our terms.</li>
  </ul>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Legal bases for processing</h2>
  <ul className="list-disc pl-5 space-y-2">
    <li><strong>Performance of a contract:</strong> to create your account and provide the Service.</li>
    <li><strong>Legitimate interests:</strong> to protect the Service, prevent misuse, and maintain security.</li>
    <li><strong>Legal obligation:</strong> where we must retain or process information to comply with applicable law.</li>
    <li><strong>Consent:</strong> where consent is required, such as for non-essential cookies or marketing communications.</li>
  </ul>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Cookies and local storage</h2>
  <p className="mb-2">
    <strong>Cookies:</strong> We use cookies for basic website functionality and simple visit counting. We do not use third-party advertising cookies.
  </p>
  <p>
    <strong>Local storage:</strong> We use local storage only for non-sensitive UI preferences. This stays on your device and is not used for advertising.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Analytics and tracking</h2>
  <p>
    We do not use third-party analytics tools, and we do not track your clicks or page navigations across the site for advertising purposes.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Payments</h2>
  <p>
    Payments are processed by Stripe. We do not store your full payment card details. Stripe may process billing information according to its own terms and privacy policy.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Service providers</h2>
  <p>
    We use Appwrite Cloud as a backend service provider to host and process account data and operate authentication and storage on our behalf.
  </p>
  <p className="mt-2">
    Your data is stored in Appwrite&apos;s Frankfurt region in the EU. Where cross-border transfers are necessary, they will occur in accordance with applicable data protection laws and appropriate safeguards.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Sharing of information</h2>
  <p>
    We do not sell your personal information. We do not share your information with third parties for advertising.
    Service providers only process information on our behalf and under appropriate safeguards.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Data retention</h2>
  <p>
    We retain account information while your account is active or as needed to provide the Service.
    Certain limited information may be retained where required by law, to resolve disputes, prevent fraud, or enforce our legal rights.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Account deletion</h2>
  <p>
    You may delete your account at any time from your account settings. Deleted account information is removed from our production systems.
    Residual copies may remain temporarily in secure backups until overwritten according to backup retention practices.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Your rights</h2>
  <p>
    Depending on your location, you may have the right to access, rectify, erase, restrict or object to processing,
    and request data portability. To exercise your rights, contact us at {contactEmail}.
  </p>
  <p className="mt-2">
    You also have the right to lodge a complaint with your local data protection authority, including the Hellenic Data Protection Authority in Greece.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Children’s privacy</h2>
  <p>
    Our Service is not directed to children under 13 or the minimum age required by local law. We do not knowingly collect personal information from children.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Security</h2>
  <p>
    We use reasonable technical and organizational measures to protect your information. However, no method of transmission or storage is 100% secure.
  </p>
</section>

<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Changes to this policy</h2>
  <p>
    We may update this Privacy Policy from time to time. We will post the updated version with a new effective date.
    If changes are material, we will provide additional notice where required by law.
  </p>
</section>

<section className="mb-15">
  <h2 className="text-2xl font-semibold mb-2">Contact us</h2>
  <p>
    If you have questions about this Privacy Policy or our data practices, contact us at {contactEmail}.
  </p>
</section>
      </ScrollArea>
    </main>
  );
}
