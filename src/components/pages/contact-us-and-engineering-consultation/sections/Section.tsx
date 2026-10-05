import Link from "next/link";
import { companyContact } from "@/config/company";

export function Section() {
  return (
    <section className="bg-primary px-margin-mobile py-stack-lg text-on-primary md:px-margin-desktop">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-stack-lg md:grid-cols-2">
        <Link
          href="/contact-us"
          className="group cursor-pointer rounded-2xl border border-on-primary/10 bg-white/5 p-stack-lg transition-colors hover:bg-white/10"
        >
          <span className="material-symbols-outlined mb-stack-sm text-3xl text-primary-fixed">
            support_agent
          </span>
          <h3 className="mb-2 font-headline-md text-headline-md">Technical Support</h3>
          <p className="mb-stack-md font-body-md text-on-primary/70">
            Existing customer? Contact us for engineering support, issue diagnosis, or
            follow-up on an active project.
          </p>
          <span className="font-label-sm uppercase tracking-widest text-primary-fixed group-hover:underline">
            Contact Support →
          </span>
        </Link>

        <Link
          href="/about-us"
          className="group cursor-pointer rounded-2xl border border-on-primary/10 bg-white/5 p-stack-lg transition-colors hover:bg-white/10"
        >
          <span className="material-symbols-outlined mb-stack-sm text-3xl text-primary-fixed">
            engineering
          </span>
          <h3 className="mb-2 font-headline-md text-headline-md">About Our Team</h3>
          <p className="mb-stack-md font-body-md text-on-primary/70">
            Learn more about {companyContact.legalName}, our engineering approach, and
            the types of embedded product work we support.
          </p>
          <span className="font-label-sm uppercase tracking-widest text-primary-fixed group-hover:underline">
            About Us →
          </span>
        </Link>
      </div>
    </section>
  );
}
