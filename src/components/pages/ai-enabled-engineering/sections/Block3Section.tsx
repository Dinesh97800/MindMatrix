import Link from "next/link";

const solutionCategories = [
  {
    title: "Edge AI Products",
    description:
      "Intelligent sensor nodes • AI-enabled industrial gateways • On-device anomaly detection • Equipment condition-monitoring devices • Vision-enabled inspection systems",
    icon: "developer_board",
  },
  {
    title: "Engineering & Knowledge Solutions",
    description:
      "Engineering knowledge assistants • Technical support applications • Document intelligence and search • Requirement and test-report automation • Diagnostic support tools",
    icon: "menu_book",
  },
  {
    title: "Industrial & IoT Solutions",
    description:
      "Predictive maintenance support • Smart alarm and diagnostic platforms • AI-powered IoT dashboards • Sensor analytics • Remote monitoring solutions",
    icon: "precision_manufacturing",
  },
  {
    title: "Controlled Agentic Workflows",
    description:
      "Multi-step workflow automation • Tool and API integration • Human approval workflows • Private knowledge access • Audit-ready AI operations",
    icon: "account_tree",
  },
];

export function Block3Section() {
  return (
    <section className="py-stack-lg bg-primary-container text-white">
      <div className="px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg mb-4">
              AI Solutions We Can Develop
            </h2>
            <p className="text-white/70">
              Our AI solutions go beyond general-purpose chatbots by integrating
              customer data, engineering knowledge, software tools, embedded
              products, and controlled workflows.
            </p>
          </div>
          <Link
            href="/engineering-whitepapers"
            className="bg-secondary-fixed text-primary px-8 py-3 font-label-sm text-label-sm font-bold rounded hover:opacity-90 transition-opacity shrink-0"
          >
            Engineering Whitepapers
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {solutionCategories.map((category) => (
            <div
              key={category.title}
              className="p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-4">
                {category.icon}
              </span>
              <h4 className="font-headline-md text-headline-md mb-3">
                {category.title}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
