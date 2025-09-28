import React from "react";
import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";

const geist = Geist({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "We only collect a username and email. We do not use cookies or analytics. Local storage is used only for UI preferences.",
};

/* eslint react/no-unescaped-entities: 0 */
export default function PrivacyPage(): JSX.Element {
  const effectiveDate: string = "2025-09-10"; // Update to your actual effective date
  const companyName: string = "Synomilo";
  const contactEmail: string = "synomilo@gmail.com";
  const dpoContact: string | null = null; // e.g., "privacy@example.com" if applicable

  return (
    <main className={`pt-10 max-w-4xl mx-auto prose prose-neutral ${geist.className}`}>
      <ScrollArea className="h-screen overflow-y-auto px-2">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-normal mb-3 ${dmSans.className}`}>
          Privacy Policy
        </h1>
        <p className="mb-2">Effective date: {effectiveDate}</p>
        <p className="mb-6">
          This policy describes how {companyName} ("we", "us", or "our") handles
          your information. Our service is intentionally minimal: we only ask
          for a username and an email address to operate your account. We do not
          use cookies, and we do not track clicks or page navigations. We use
          local storage solely to remember non-sensitive UI preferences (like
          whether you closed a popup).
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Who we are</h2>
          <p>
            Controller: {companyName}. Contact: {contactEmail}
            {dpoContact && <>. Privacy/DPO: {dpoContact}</>}.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Information we collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Account information:</strong> username and email address.
            </li>
            <li>
              <strong>Local storage (on your device):</strong> UI preferences
              such as whether a popup was closed. This information is stored in
              your browser and is not sent to our servers.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">How we use your information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To create and maintain your account and provide the Service.</li>
            <li>To communicate with you about your account or the Service.</li>
            <li>To protect the security and integrity of the Service.</li>
            <li>To comply with legal obligations and enforce our policies.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Cookies and local storage</h2>
          <p className="mb-2">
            <strong>Cookies:</strong> We do not use cookies.
          </p>
          <p>
            <strong>Local storage:</strong> We use local storage only for
            non-sensitive UI preferences (e.g., remembering that you dismissed a
            popup). Local storage stays on your device and is not transmitted to
            us.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Analytics and tracking</h2>
          <p>
            We do not use third-party analytics tools, and we do not track your
            clicks or page navigations across the site.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Service providers (Appwrite Cloud)</h2>
          <p>
            We use Appwrite Cloud as a backend service provider to host and process account data (username and email)
            and to operate authentication and storage on our behalf. Appwrite acts as our data processor and processes
            personal data only according to our instructions for the purposes of providing the Service.
          </p>
          <p className="mt-2">
            Data location: Your data is stored in Appwrite's Frankfurt region (EU). Where cross-border transfers are
            necessary, they will occur in accordance with applicable data protection laws and appropriate safeguards.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Sharing of information</h2>
          <p>
            We do not sell your personal information. We do not share your
            information with third parties for advertising. If we engage service
            providers (for example, to host our service or send transactional
            emails), they will only process your information on our behalf and
            under appropriate safeguards.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Data retention</h2>
          <p>
            We retain your account information while your account is active or
            as needed to provide the Service. You can request deletion of your
            account information at any time by contacting us at {contactEmail}.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Account deletion</h2>
          <p>
            You may delete your account at any time from within your account settings.
            When you delete your account, all personal information (including your
            email, username, and any associated data) is permanently erased from our
            systems. We do not retain backups of deleted accounts.
          </p>
        </section>


        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Your rights</h2>
          <p>
            Depending on your location, you may have rights under applicable
            data protection laws, including the right to access, rectify, erase,
            restrict or object to processing, and data portability. To exercise
            your rights, contact us at {contactEmail}.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Children’s privacy</h2>
          <p>
            Our Service is not directed to children under the age of 13 (or the
            age defined by local law). We do not knowingly collect personal
            information from children.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect
            your information. However, no method of transmission or storage is
            100% secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post
            the updated version with a new effective date. If changes are
            material, we will provide additional notice where required by law.
          </p>
        </section>

        <section className="mb-15">
          <h2 className="text-2xl font-semibold mb-2">Contact us</h2>
          <p>
            If you have questions about this Privacy Policy or our data
            practices, contact us at {contactEmail}.
          </p>
        </section>
      </ScrollArea>
    </main>
  );
}
