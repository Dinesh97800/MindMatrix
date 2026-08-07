import Link from "next/link";
import { getPageContent, type PageContentKey } from "@/config/page-content";
import { siteContent } from "@/config/site-content";

interface ApprovedPageLayoutProps {
  pageKey: PageContentKey;
  showDeliverables?: boolean;
}

export function ApprovedPageLayout({
  pageKey,
  showDeliverables = true,
}: ApprovedPageLayoutProps) {
  const content = getPageContent(pageKey);
  if (!content) return null;

  return (
    <main>
      <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-primary-container/10 px-3 py-1 font-label-sm text-label-sm uppercase tracking-widest text-primary">
              {content.eyebrow}
            </span>
            <h1 className="mb-6 font-display-lg text-display-lg text-primary">{content.title}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {content.description}
            </p>
          </div>
        </div>
      </section>

      {pageKey !== "faq" && (
        <section className="border-y border-outline-variant/10 bg-surface-container-low px-margin-mobile py-stack-lg md:px-margin-desktop">
          <div className="mx-auto max-w-container-max">
            <h2 className="mb-8 font-headline-lg text-headline-lg">Typical Scope</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {content.capabilities.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4"
                >
                  <span
                    className="material-symbols-outlined shrink-0 text-primary"
                    aria-hidden
                  >
                    check_circle
                  </span>
                  <span className="font-body-md text-on-surface">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {showDeliverables && pageKey !== "faq" && (
        <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
          <div className="mx-auto max-w-container-max grid grid-cols-1 gap-gutter lg:grid-cols-2">
            <div className="rounded-xl border border-outline-variant/30 p-stack-md">
              <h3 className="mb-3 font-headline-md text-headline-md">Deliverables</h3>
              <p className="font-body-md text-on-surface-variant">
                {siteContent.deliverablesStatement}
              </p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-primary-container p-stack-md text-on-primary-container">
              <h3 className="mb-3 font-headline-md text-headline-md text-on-primary">
                Confidentiality
              </h3>
              <p className="font-body-md text-on-primary-container/90">
                {siteContent.confidentialityShort}
              </p>
            </div>
          </div>
        </section>
      )}

      {pageKey === "faq" && (
        <section className="border-y border-outline-variant/10 bg-surface-container-low px-margin-mobile py-stack-lg md:px-margin-desktop">
          <div className="mx-auto max-w-3xl space-y-stack-md">
            {siteContent.consultationFaq.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-md"
              >
                <h3 className="mb-2 font-headline-md text-headline-md">{item.question}</h3>
                <p className="font-body-md text-on-surface-variant">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="mx-auto max-w-container-max rounded-3xl border border-outline-variant bg-surface py-stack-lg text-center">
          <h2 className="mb-4 font-headline-lg text-headline-lg">Discuss Your Requirement</h2>
          <p className="mx-auto mb-8 max-w-2xl font-body-md text-on-surface-variant">
            {siteContent.contactCta}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact-us-and-engineering-consultation"
              className="rounded-full bg-primary px-8 py-3 font-label-sm text-label-sm text-on-primary transition-colors hover:bg-primary/90"
            >
              Engineering Consultation
            </Link>
            <Link
              href="/contact-us"
              className="rounded-full border border-outline px-8 py-3 font-label-sm text-label-sm transition-colors hover:bg-surface-container-low"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
