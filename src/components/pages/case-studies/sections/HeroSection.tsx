import { siteContent } from "@/config/site-content";

export function HeroSection() {
  return (
    <header className="mb-stack-lg border-l-2 border-primary pl-gutter">
      <span className="font-label-sm text-label-sm text-on-primary-container tracking-[0.2em] uppercase">
        Projects
      </span>
      <h1 className="font-display-lg text-display-lg mt-2 mb-4">
        Selected Project Experience
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
        {siteContent.projectsStatement} Summaries below are anonymized and presented without
        customer-identifying information.
      </p>
    </header>
  );
}
