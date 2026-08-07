import Link from "next/link";
import { siteContent } from "@/config/site-content";

export function StatsGridSection() {
  const { hero } = siteContent;

  return (
    <section className="relative min-h-[640px] md:min-h-[921px] flex items-center overflow-x-clip bg-primary-container">
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        data-alt="Embedded controller prototype PCB with microcontroller, connectors, and test points on a bench setup."
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8Lc9ek2leanWwsnuRipJWXMkKpeEomytTsKi2PmjiHjwcqZxRZZBc3hpFzZbkxg6nZoxtarHI-Oxh7sxD4jjdbyG65FO4sLfKo5HukLyU_56vyQWcBTVVXbPrz8Lp1mU0ukUC2OhIrZRlcvlQvDR-dIe5jp15vZYR2CgeujidebRP4FboY0JwmNOmJEIaHEiKDDRiTl9KMcJmKAyszHz8G3KSh6mNGGKneBYG1v4E2PAFcb90mDHjEgSoa49RN1-pI81RN7LjaMc')",
        }}
      />
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="max-w-4xl min-w-0 space-y-stack-md">
          <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest">
              {hero.eyebrow}
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-white leading-tight break-words">
            {hero.headline}
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary-container/80 max-w-2xl">
            {hero.subheading}
          </p>
          <p className="font-label-sm text-label-sm text-on-primary-container/70 uppercase tracking-wide break-words">
            {hero.technologyLine}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
            <Link
              href={hero.primaryCta.href}
              className="w-full sm:w-auto bg-white text-primary px-6 sm:px-8 py-4 rounded-full font-label-sm text-label-sm font-bold hover:bg-primary-fixed transition-all flex items-center justify-center gap-2"
            >
              {hero.primaryCta.label}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="w-full sm:w-auto border border-white/20 text-white px-6 sm:px-8 py-4 rounded-full font-label-sm text-label-sm font-bold hover:bg-white/10 backdrop-blur-sm transition-all text-center"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter mt-16 md:mt-32 border-t border-white/10 pt-12">
          <div className="space-y-1">
            <div className="text-headline-lg font-display-lg text-white">Nearly 20 Years</div>
            <div className="text-label-sm font-label-sm text-on-primary-container uppercase tracking-wider">
              Industry Experience
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-headline-lg font-display-lg text-white">Embedded Focus</div>
            <div className="text-label-sm font-label-sm text-on-primary-container uppercase tracking-wider">
              Hardware, Firmware &amp; Communication
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-headline-lg font-display-lg text-white">India-Based</div>
            <div className="text-label-sm font-label-sm text-on-primary-container uppercase tracking-wider">
              Engineering Consultancy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
