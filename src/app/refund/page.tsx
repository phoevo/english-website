import InfoPage from "@/components/content/InfoPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund Policy for Synomilo subscriptions.",
};

export default function RefundPolicyPage() {
  const effectiveDate: string = "July 4th, 2026";
  const companyName: string = "Synomilo";
  const contactEmail: string = "synomiloteam@gmail.com";

  return (
    <InfoPage title="Refund Policy" effectiveDate={effectiveDate} intro={<>
          This Refund Policy explains when refunds may be available for
          subscriptions purchased through {companyName} (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;). By purchasing a subscription,
          you agree to this Refund Policy.
        </>}>
<section>
          <h2>
            Immediate access to digital content
          </h2>
          <p>
            Where permitted by applicable law, you may be asked during checkout
            to expressly request immediate access to the Service and
            acknowledge that your statutory right of withdrawal no longer
            applies once your paid subscription begins.
          </p>
        </section>
<section>
          <h2>
            When refunds are generally not available
          </h2>
          <ul>
            <li>For subscription renewal payments.</li>
            <li>For unused time remaining in an active subscription.</li>
            <li>
              After you have cancelled your subscription but still have access
              until the end of your paid billing period.
            </li>
          </ul>
        </section>
<section>
          <h2>
            Exceptions
          </h2>
          <p>
            We may issue refunds in situations including, but not limited to:
          </p>
          <ul>
            <li>Duplicate or accidental charges.</li>
            <li>Incorrect billing.</li>
            <li>Technical payment errors.</li>
            <li>Fraudulent transactions.</li>
            <li>Where a refund is required by applicable law.</li>
          </ul>
        </section>
<section>
          <h2>
            Requesting a refund
          </h2>
          <p>
            To request a refund, contact us at {contactEmail} within the
            applicable refund period.
          </p>
          <p>
            Please include the email address associated with your account, the
            date of purchase, and a brief description of your request.
          </p>
        </section>
<section>
          <h2>
            Refund processing
          </h2>
          <p>
            If your refund request is approved, the refund will be issued to the
            original payment method used for the purchase. Processing times may
            vary depending on your payment provider or financial institution.
          </p>
        </section>
<section>
          <h2>
            Changes to this Refund Policy
          </h2>
          <p>
            We may update this Refund Policy from time to time. We will post the
            updated version with a new effective date. If changes are material,
            we will provide additional notice where required by law.
          </p>
        </section>
<section>
          <h2>
            Contact us
          </h2>
          <p>
            If you have any questions about this Refund Policy, contact us at{" "}
            {contactEmail}.
          </p>
        </section>
    </InfoPage>
  );
}
