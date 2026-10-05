import Link from "next/link";
import { companyContact } from "@/config/company";
import { siteContent } from "@/config/site-content";

export function TermsContentSection() {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="rounded-xl border border-outline-variant/30 bg-white p-8 md:p-12">
        <div className="prose prose-slate max-w-none space-y-stack-lg font-body-md text-on-surface-variant">
          <div id="acceptance">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the website of {siteContent.legalName} ({siteContent.mmisAbbrev}),
              you agree to these Terms of Website Use. If you do not agree, please do not use this
              website.
            </p>
          </div>

          <div id="website-use">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              2. Website Use
            </h2>
            <p>
              This website provides general information about {siteContent.legalName}, its engineering
              services, and contact options. Content is provided for information purposes and does
              not constitute a binding offer unless confirmed in a separate written proposal or
              agreement.
            </p>
          </div>

          <div id="enquiries">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              3. Enquiries and Submissions
            </h2>
            <p>
              Information submitted through contact or consultation forms may be used to respond to
              your enquiry. {siteContent.confidentialityShort} Detailed confidentiality, data handling,
              and project terms are defined in the applicable proposal or agreement.
            </p>
          </div>

          <div id="intellectual-property">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              4. Intellectual Property
            </h2>
            <p>
              Website content, branding, and materials published by {siteContent.legalName} remain
              the property of the company unless otherwise stated. Customer project materials,
              designs, and deliverables are handled according to the applicable project agreement.
            </p>
          </div>

          <div id="liability">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              5. Limitation of Liability
            </h2>
            <p>
              To the extent permitted by applicable law, {siteContent.legalName} provides this
              website on an &quot;as is&quot; basis and does not warrant uninterrupted or error-free
              operation. The company is not liable for indirect or consequential loss arising from
              use of this website.
            </p>
          </div>

          <div id="governing-law">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              6. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be subject to the
              jurisdiction of courts in Gurugram, Haryana, unless otherwise agreed in writing.
            </p>
          </div>

          <div id="contact">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">7. Contact</h2>
            <p>
              For questions about these terms, contact{" "}
              <Link href={`mailto:${companyContact.email}`} className="text-primary hover:underline">
                {companyContact.email}
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
