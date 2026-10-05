import Link from "next/link";
import { siteContent } from "@/config/site-content";

export function AiSolutionsHighlightSection() {
  return (
    <section className="py-stack-lg bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-label-sm text-label-sm rounded-sm uppercase tracking-widest">
              Secondary Capability
            </span>
            <h2 className="font-display-lg text-headline-lg text-primary leading-tight">
              AI-Assisted Engineering Where Appropriate
            </h2>
            <p className="text-on-surface-variant font-body-lg">
              {siteContent.aiSecondaryStatement}
            </p>
            <p className="text-on-surface-variant font-body-md">
              Our primary focus remains embedded hardware, firmware, industrial communication,
              monitoring, control, and hands-on product engineering.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-outline-variant/20 bg-white p-8 space-y-4">
              <h3 className="font-headline-md text-headline-md text-primary">
                Primary Technology Focus
              </h3>
              <p className="text-on-surface-variant font-body-md">
                {siteContent.hero.technologyLine}
              </p>
              <Link
                href="/technologies"
                className="inline-flex items-center gap-2 text-primary font-label-sm text-label-sm font-bold"
              >
                Explore Technologies
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
