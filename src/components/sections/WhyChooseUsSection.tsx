import { siteContent } from "@/config/site-content";

export function WhyChooseUsSection() {
  return (
    <section className="py-stack-lg bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="inline-block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            Why Work With Us
          </span>
          <h2 className="font-display-lg text-headline-lg text-primary">
            Senior-Led Embedded Product Engineering
          </h2>
          <p className="text-on-surface-variant font-body-lg">
            {siteContent.locationStatement}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {siteContent.whyChooseUs.map((item) => (
            <div
              key={item.title}
              className="glass-card p-8 rounded-xl flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 text-secondary">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-on-surface-variant font-body-md flex-grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
