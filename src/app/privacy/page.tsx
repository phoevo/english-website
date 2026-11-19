import InfoPage from "@/components/content/InfoPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "We collect a username and email for your account. With your consent, we use Google Analytics to understand how the site is used. Local storage is used only for preferences.",
};

export default function PrivacyPage() {
  const effectiveDate: string = "November 19th, 2026";
  const companyName: string = "Synomilo";
  const contactEmail: string = "synomiloteam@gmail.com";

  return (
    <InfoPage title="Privacy Policy" effectiveDate={effectiveDate} intro={<>
          This Privacy Policy explains how {companyName} (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) collects, uses, stores, and
          protects your personal information when you use our Service. We aim
          to collect only the information needed to operate the Service.
        </>}>
<section>
          <h2>
            Who we are
          </h2>
          <p>
            Data Controller: {companyName}, operating from Greece.
          </p>
          <p>Contact: {contactEmail}</p>
        </section>
<section>
          <h2>
            Information we collect
          </h2>
          <ul>
            <li>
              <strong>Account information:</strong>{" "}
              username and email address.
            </li>
            <li>
              <strong>
                Subscription information:
              </strong>{" "}
              subscription status and billing-related identifiers provided by
              our payment provider.
            </li>
            <li>
              <strong>Usage information (only with your consent):</strong>{" "}
              pages you visit and a few actions on the site, collected through
              Google Analytics. See &quot;Analytics&quot; below.
            </li>
            <li>
              <strong>Local storage:</strong>{" "}
              non-sensitive preferences, such as your cookie choice or whether
              you dismissed a popup.
            </li>
            <li>
              <strong>Cookies:</strong> cookies needed for the site to work
              and, if you accept them, analytics cookies.
            </li>
          </ul>
        </section>
<section>
          <h2>
            How we use your information
          </h2>
          <ul>
            <li>To create, authenticate, and maintain your account.</li>
            <li>
              To provide access to the Service and paid subscription features.
            </li>
            <li>
              To send a welcome email when you create an account, and password
              reset emails when you ask for them. We do not send marketing
              emails or newsletters. Payment receipts are sent by Stripe.
            </li>
            <li>
              With your consent, to understand how the site is used and
              improve it.
            </li>
            <li>To protect the security and integrity of the Service.</li>
            <li>
              To comply with legal obligations and enforce our terms.
            </li>
          </ul>
        </section>
<section>
          <h2>
            Legal bases for processing
          </h2>
          <ul>
            <li>
              <strong>
                Performance of a contract:
              </strong>{" "}
              to create your account and provide the Service.
            </li>
            <li>
              <strong>
                Legitimate interests:
              </strong>{" "}
              to protect the Service, prevent misuse, and maintain security.
            </li>
            <li>
              <strong>Legal obligation:</strong>{" "}
              where we must retain or process information to comply with
              applicable law.
            </li>
            <li>
              <strong>Consent:</strong> for analytics cookies and the usage
              information collected through them. You can decline them, and
              the rest of the site works the same.
            </li>
          </ul>
        </section>
<section>
          <h2>
            Cookies and local storage
          </h2>
          <p>
            <strong>Necessary cookies:</strong> used to keep you signed in and
            for the site to work.
          </p>
          <p>
            <strong>Analytics cookies:</strong> set by Google Analytics only if
            you choose &quot;Accept&quot; on the cookie banner. If you choose
            &quot;Decline&quot;, Google Analytics is not loaded and no
            analytics cookies are set. To change your choice, clear this
            site&apos;s data in your browser and the banner will appear again.
          </p>
          <p>
            We do not use advertising cookies.
          </p>
          <p>
            <strong>Local and session storage:</strong> used for non-sensitive
            preferences, such as your cookie choice, and to remember the
            previous page you viewed in the current tab, so analytics can
            record where a visit came from. This stays on your device, is
            cleared when you close the tab (session storage), and is only
            used in analytics if you accepted analytics cookies.
          </p>
        </section>
<section>
          <h2>
            Analytics
          </h2>
          <p>
            If you accept analytics cookies, we use Google Analytics, provided
            by Google Ireland Limited, to understand how the site is used. It
            records the pages you visit and these actions: viewing a guide,
            opening a conversation, creating an account, viewing the pricing
            page, starting checkout and completing a purchase.
          </p>
          <p>
            We use this in aggregate, to see which parts of the site are
            useful and where visitors stop. We do not send your name, email
            or account details to Google Analytics, and we do not use it for
            advertising.
          </p>
          <p>
            Google may process this information outside the EU under its own
            safeguards. See{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s privacy policy</a>{" "}
            and{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses information from sites that use its services</a>.
          </p>
        </section>
<section>
          <h2>
            Payments
          </h2>
          <p>
            Payments are processed by Stripe. We do not store your full payment
            card details. Stripe may process billing information according to
            its own terms and privacy policy.
          </p>
        </section>
<section>
          <h2>
            Service providers
          </h2>
          <p>
            We use Appwrite Cloud as a backend service provider to host and
            process account data, operate authentication and storage, and send
            the welcome and password reset emails on our behalf.
          </p>
          <p>
            We use Stripe for payments and, if you accept analytics cookies,
            Google Analytics (see above).
          </p>
          <p>
            Your data is stored in Appwrite&apos;s Frankfurt region in the EU.
            Where cross-border transfers are necessary, they will occur in
            accordance with applicable data protection laws and appropriate
            safeguards.
          </p>
        </section>
<section>
          <h2>
            Sharing of information
          </h2>
          <p>
            We do not sell your personal information. We do not share your
            information with third parties for advertising. Service providers
            only process information on our behalf and under appropriate
            safeguards.
          </p>
        </section>
<section>
          <h2>
            Data retention
          </h2>
          <p>
            We retain account information while your account is active or as
            needed to provide the Service. Certain limited information may be
            retained where required by law, to resolve disputes, prevent fraud,
            or enforce our legal rights.
          </p>
        </section>
<section>
          <h2>
            Account deletion
          </h2>
          <p>
            You may delete your account at any time from your account settings.
            Deleted account information is removed from our production systems.
            Residual copies may remain temporarily in secure backups until
            overwritten according to backup retention practices.
          </p>
        </section>
<section>
          <h2>
            Your rights
          </h2>
          <p>
            Depending on your location, you may have the right to access,
            rectify, erase, restrict or object to processing, and request data
            portability. To exercise your rights, contact us at {contactEmail}.
          </p>
          <p>
            You also have the right to lodge a complaint with your local data
            protection authority, including the Hellenic Data Protection
            Authority in Greece.
          </p>
        </section>
<section>
          <h2>
            Children’s privacy
          </h2>
          <p>
            Our Service is not directed to children under 13 or the minimum age
            required by local law. We do not knowingly collect personal
            information from children.
          </p>
        </section>
<section>
          <h2>
            Security
          </h2>
          <p>
            We use reasonable technical and organizational measures to protect
            your information. However, no method of transmission or storage is
            100% secure.
          </p>
        </section>
<section>
          <h2>
            Changes to this policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will post
            the updated version with a new effective date. If changes are
            material, we will provide additional notice where required by law.
          </p>
        </section>
<section>
          <h2>
            Contact us
          </h2>
          <p>
            If you have questions about this Privacy Policy or our data
            practices, contact us at {contactEmail}.
          </p>
        </section>
    </InfoPage>
  );
}
