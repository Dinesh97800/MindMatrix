import Link from "next/link";
import { siteContent } from "@/config/site-content";

const coreCompetencies = siteContent.serviceGroups.map((service, index) => {
  const icons = [
    "analytics",
    "architecture",
    "memory",
    "settings_input_component",
    "science",
    "bug_report",
    "upgrade",
    "router",
    "straighten",
    "factory",
    "support_agent",
  ] as const;

  return {
    ...service,
    icon: icons[index] ?? "engineering",
  };
});

export function Card1Section() {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-headline-lg text-headline-lg mb-4">Core Services</h2>
            <p className="text-on-surface-variant font-body-md text-body-md">
              {siteContent.tagline}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
          {coreCompetencies.map((item) => (
            <div
              key={item.label}
              className="group bg-white border border-outline-variant p-8 technical-glow transition-all duration-300 flex flex-col h-full"
            >
              <div className="mb-6">
                <span className="material-symbols-outlined text-4xl text-primary font-thin">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">{item.label}</h3>
              <Link
                href={item.href}
                className="flex items-center gap-2 text-primary font-label-sm text-label-sm group-hover:gap-4 transition-all mt-auto"
              >
                View service
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
