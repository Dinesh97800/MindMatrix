import Link from "next/link";
import { siteContent } from "@/config/site-content";

export function Block2006Section() {
  return (
    <section className="py-stack-lg bg-surface-container">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
              Production Transition Support
            </h2>
            <p className="font-body-lg text-on-surface-variant mb-6">
              {siteContent.manufacturingSupport}
            </p>
            <p className="font-body-md text-on-surface-variant">
              {siteContent.confidentialityShort}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {siteContent.coreServices.slice(0, 4).map((service) => (
              <div
                key={service}
                className="rounded-lg border border-outline-variant/20 bg-white p-5 text-sm text-on-surface-variant"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/contact-us-and-engineering-consultation"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-on-primary font-label-sm text-label-sm font-bold hover:bg-primary-container transition-all"
          >
            Discuss Your Requirement
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
