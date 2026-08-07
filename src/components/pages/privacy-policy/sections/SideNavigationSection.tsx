import Link from "next/link";
import { companyContact, formatCompanyAddress } from "@/config/company";
import { siteContent } from "@/config/site-content";

export function SideNavigationSection() {
  return (
    <div className="grid grid-cols-12 gap-gutter">
      <aside className="hidden md:block col-span-3">
        <div className="sticky top-28">
          <h3 className="font-headline-md text-headline-md mb-6">Contents</h3>
          <nav className="flex flex-col gap-2">
            {[
              ["#introduction", "Introduction"],
              ["#data-collection", "Information We Collect"],
              ["#usage", "How We Use Information"],
              ["#sharing", "Sharing"],
              ["#retention", "Retention"],
              ["#security", "Security"],
              ["#rights", "Your Rights"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a
                key={href}
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary px-4 py-2 border-l border-outline-variant/30 transition-all"
                href={href}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <article className="col-span-12 md:col-span-9 privacy-content space-y-10">
        <header className="mb-4">
          <h1 className="font-display-lg text-display-lg text-primary mb-6">Privacy Policy</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
            This policy describes how {siteContent.legalName} handles information collected
            through this website and related enquiry channels.
          </p>
        </header>

        <section id="introduction" className="space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">1. Introduction</h2>
          <p className="font-body-md text-on-surface-variant">
            {siteContent.legalName} operates this website to provide information about our
            embedded engineering services and to receive business enquiries. We collect only the
            information needed to respond to enquiries and operate the website responsibly.
          </p>
        </section>

        <section id="data-collection" className="space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>Contact details submitted through enquiry forms, such as name, email, phone, and company.</li>
            <li>Technical information you choose to share about a product requirement or project.</li>
            <li>Basic website usage information such as pages visited, browser type, and approximate location derived from IP address, if analytics or server logs are enabled.</li>
            <li>Cookie or similar technology data if used for basic site functionality or analytics.</li>
          </ul>
        </section>

        <section id="usage" className="space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">
            3. How We Use Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>To respond to enquiries and provide requested engineering consultation.</li>
            <li>To communicate about proposals, meetings, or project discussions you request.</li>
            <li>To maintain, secure, and improve the website.</li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
        </section>

        <section id="sharing" className="space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">
            4. Sharing With Service Providers
          </h2>
          <p className="font-body-md text-on-surface-variant">
            We may share information with essential service providers that help us operate the
            website or process enquiries, such as hosting, email delivery, form processing, or
            analytics providers. These providers are expected to handle information only for the
            services they provide to us.
          </p>
        </section>

        <section id="retention" className="space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">5. Retention</h2>
          <p className="font-body-md text-on-surface-variant">
            Enquiry information is retained only as long as reasonably necessary to respond to the
            request, maintain business records, or meet legal requirements. Retention periods may
            vary depending on the nature of the enquiry and any ongoing commercial discussion.
          </p>
        </section>

        <section id="security" className="space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">6. Security</h2>
          <p className="font-body-md text-on-surface-variant">
            We apply reasonable administrative and technical measures to protect information
            submitted through this website. No online transmission or storage system can be
            guaranteed to be completely secure.
          </p>
        </section>

        <section id="rights" className="space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">7. Your Rights</h2>
          <p className="font-body-md text-on-surface-variant">
            You may request access to, correction of, or deletion of personal information we hold
            about you, subject to applicable law and legitimate business record requirements. To
            make a request, contact us using the details below.
          </p>
        </section>

        <section
          id="contact"
          className="bg-primary text-on-primary p-8 md:p-12 rounded-2xl space-y-4"
        >
          <h2 className="font-headline-lg text-headline-lg !mt-0">8. Contact</h2>
          <p className="text-on-primary/80 max-w-xl">
            For privacy-related requests, contact {siteContent.legalName} at{" "}
            <Link href={`mailto:${companyContact.email}`} className="underline">
              {companyContact.email}
            </Link>
            .
          </p>
          <p className="text-on-primary/80">{formatCompanyAddress()}</p>
          <p className="text-on-primary/70 text-sm">
            This website privacy policy should be reviewed against the actual hosting, analytics,
            email, and form services in use. Project-specific commercial terms remain in proposals
            and agreements, not in this general website policy.
          </p>
        </section>
      </article>
    </div>
  );
}
