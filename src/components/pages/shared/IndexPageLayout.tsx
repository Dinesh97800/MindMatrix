import Link from "next/link";
import { getPageContent } from "@/config/page-content";
import { siteContent } from "@/config/site-content";

interface IndexPageLayoutProps {
  pageKey: "industries" | "technologies";
  items: readonly { label: string; href: string }[];
}

export function IndexPageLayout({ pageKey, items }: IndexPageLayoutProps) {
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

      <section className="border-y border-outline-variant/10 bg-surface-container-low px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-stack-md transition-colors hover:border-primary/30 hover:bg-surface"
              >
                <h2 className="mb-3 font-headline-md text-headline-md group-hover:text-primary">
                  {item.label}
                </h2>
                <span className="mt-auto inline-flex items-center gap-2 font-label-sm text-label-sm text-primary">
                  Learn more
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="mx-auto max-w-container-max rounded-3xl border border-outline-variant bg-surface py-stack-lg text-center">
          <h2 className="mb-4 font-headline-lg text-headline-lg">Discuss Your Requirement</h2>
          <p className="mx-auto mb-8 max-w-2xl font-body-md text-on-surface-variant">
            {siteContent.contactCta}
          </p>
          <Link
            href="/contact-us-and-engineering-consultation"
            className="inline-block rounded-full bg-primary px-8 py-3 font-label-sm text-label-sm text-on-primary transition-colors hover:bg-primary/90"
          >
            Engineering Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
