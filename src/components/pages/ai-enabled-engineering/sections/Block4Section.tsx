const whyChooseItems = [
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
];

export function Block4Section() {
  return (
    <section className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="font-headline-lg text-headline-lg mb-6">
            Our Differentiation
          </h2>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">
            AI + Real-World Product Engineering
          </h3>
          <p className="text-on-surface-variant font-body-md mb-8">
            Our strength is the ability to combine AI with embedded hardware,
            firmware, sensors, IoT connectivity, customer knowledge, cloud
            platforms, and industrial systems. This enables us to build complete
            solutions rather than simple prompt-based assistants.
          </p>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">
            Why Choose Mind Matrix Workspace
          </h3>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            {whyChooseItems.map((item) => (
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
