import { siteContent } from "@/config/site-content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="relative z-10 mx-auto max-w-container-max">
        <div className="max-w-3xl">
          <span className="mb-6 inline-block rounded-full bg-primary-container/10 px-3 py-1 font-label-sm text-label-sm text-on-primary-container">
            Expert Engineering Services
          </span>
          <h1 className="mb-6 font-display-lg text-[48px] leading-tight md:text-display-lg">
            {siteContent.hero.headline}
          </h1>
          <p className="mb-4 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {siteContent.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
