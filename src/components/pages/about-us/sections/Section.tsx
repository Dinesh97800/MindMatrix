import { siteContent } from "@/config/site-content";

export function Section() {
  return (
    <section className="py-24 bg-white">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          <div className="md:col-span-5 space-y-stack-md">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-md">
              How We Work
            </h2>
            {siteContent.aboutUs.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="font-body-md text-body-md text-on-surface-variant"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="md:col-span-6 md:col-start-7 grid grid-cols-1 gap-base">
            <div className="glass-card p-8 md:p-10 border border-outline-variant/30 rounded-lg">
              <span className="material-symbols-outlined text-primary mb-4 block text-4xl">
                handyman
              </span>
              <h3 className="font-headline-md text-headline-md mb-2">Engagement Scope</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Complete product development or focused support such as firmware, communication
                integration, prototype bring-up, debugging, calibration tools, or long-term
                engineering assistance.
              </p>
            </div>
            <div className="glass-card p-8 md:p-10 border border-outline-variant/30 rounded-lg">
              <span className="material-symbols-outlined text-primary mb-4 block text-4xl">
                verified_user
              </span>
              <h3 className="font-headline-md text-headline-md mb-2">Confidentiality</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {siteContent.confidentialityStatement}
              </p>
            </div>
            <div className="glass-card p-8 md:p-10 border border-outline-variant/30 rounded-lg">
              <span className="material-symbols-outlined text-primary mb-4 block text-4xl">
                description
              </span>
              <h3 className="font-headline-md text-headline-md mb-2">Deliverables &amp; IP</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {siteContent.deliverablesStatement}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
