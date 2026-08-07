import Link from "next/link";
import { siteContent } from "@/config/site-content";

export function Block2Section() {
  return (
    <section className="relative overflow-hidden px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="absolute inset-0 blueprint-pattern opacity-5" />
      <div className="relative z-10 mx-auto max-w-container-max overflow-hidden rounded-3xl border border-outline-variant bg-surface py-stack-lg text-center">
        <h2 className="mb-6 font-display-lg text-headline-lg">Discuss Your Requirement</h2>
        <p className="mx-auto mb-12 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          {siteContent.contactCta}
        </p>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <Link
            href="/contact-us-and-engineering-consultation"
            className="rounded-full bg-primary px-10 py-4 font-label-sm text-label-sm text-on-primary shadow-lg shadow-primary/10 transition-all hover:bg-primary-container hover:text-on-primary-container active:scale-[0.98]"
          >
            Engineering Consultation
          </Link>
          <Link
            href="/case-studies"
            className="rounded-full border border-outline bg-transparent px-10 py-4 font-label-sm text-label-sm transition-all hover:bg-surface-container-low"
          >
            View Project Experience
          </Link>
        </div>
      </div>
    </section>
  );
}
