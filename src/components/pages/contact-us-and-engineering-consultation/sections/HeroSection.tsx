import { siteContent } from "@/config/site-content";

export function HeroSection() {
  return (
    <section className="relative py-stack-lg px-margin-mobile md:px-margin-desktop grid-bg border-b border-outline-variant/10">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="md:col-span-8">
          <span className="inline-block py-1 px-3 bg-secondary-container text-on-secondary-container font-label-sm rounded-full mb-stack-sm">
            Engineering Consultation
          </span>
          <h1 className="font-display-lg text-display-lg mb-stack-md">
            Discuss Your Embedded Product Requirement
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {siteContent.contactCta}
          </p>
        </div>
        <div className="md:col-span-4 hidden md:flex justify-end">
          <div className="w-48 h-48 border border-outline-variant rounded-full flex items-center justify-center">
            <span
              className="material-symbols-outlined text-6xl text-primary/20"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              engineering
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
