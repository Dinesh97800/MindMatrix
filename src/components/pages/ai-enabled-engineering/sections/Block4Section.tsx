import { siteContent } from "@/config/site-content";

export function Block4Section() {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="font-headline-lg text-headline-lg mb-6">Secondary AI Capability</h2>
          <p className="text-on-surface-variant font-body-md mb-8">
            {siteContent.aiSecondaryStatement}
          </p>
          <p className="text-on-surface-variant font-body-md">
            Primary engineering support remains embedded hardware, firmware, industrial
            communication, monitoring, control, and product debugging.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            {siteContent.whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container p-6 rounded-xl border border-outline-variant/10 flex gap-4"
              >
                <span
                  className="material-symbols-outlined text-3xl text-primary shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
                <div>
                  <h5 className="font-bold mb-2">{item.title}</h5>
                  <p className="text-on-surface-variant text-sm font-body-md">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
