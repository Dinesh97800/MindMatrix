export const whyChooseItems = [
  {
    title: "Edge-to-cloud engineering",
    description:
      "Ability to connect AI with embedded devices, sensors, gateways, dashboards, and cloud platforms.",
    icon: "cloud_sync",
  },
  {
    title: "Customer-specific integration",
    description:
      "Solutions built around the customer's documents, databases, APIs, products, and workflows.",
    icon: "integration_instructions",
  },
  {
    title: "Controlled automation",
    description:
      "Human approvals, validation, permissions, and audit logging for important actions.",
    icon: "verified_user",
  },
  {
    title: "Domain-driven AI",
    description:
      "Engineering and industrial context is incorporated into the application design.",
    icon: "architecture",
  },
  {
    title: "Flexible deployment",
    description:
      "Cloud, hybrid, edge, or private deployment according to security and operational needs.",
    icon: "deployed_code",
  },
  {
    title: "End-to-end ownership",
    description:
      "Support from architecture and proof of concept through integration, testing, deployment, and improvement.",
    icon: "timeline",
  },
] as const;

export function WhyChooseUsSection() {
  return (
    <section className="py-stack-lg bg-surface">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="inline-block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            Our Advantage
          </span>
          <h2 className="font-display-lg text-headline-lg text-primary">
            Why Choose Mind Matrix Workspace
          </h2>
          <p className="text-on-surface-variant font-body-lg">
            We combine AI with embedded systems, industrial data, and customer
            knowledge to deliver complete, production-ready solutions—not
            isolated tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {whyChooseItems.map((item) => (
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
