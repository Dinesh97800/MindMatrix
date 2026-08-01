import Link from "next/link";

const coreCompetencies = [
  {
    title: "Embedded Firmware Development",
    description:
      "Low-level optimization, RTOS integration, and bare-metal programming for mission-critical hardware ecosystems.",
    icon: "memory",
    href: "/embedded-firmware-development",
  },
  {
    title: "Hardware Development",
    description:
      "Advanced PCB design, signal integrity analysis, and high-speed digital electronics engineering.",
    icon: "settings_input_component",
    href: "/hardware-development",
  },
  {
    title: "Product Development",
    description:
      "End-to-end product lifecycle from conceptual prototyping to mass manufacturing readiness.",
    icon: "precision_manufacturing",
    href: "/product-development",
  },
  {
    title: "Industrial IoT",
    description:
      "Secure, scalable sensor networks and edge computing architectures for industrial automation.",
    icon: "hub",
    href: "/industrial-iot-solutions",
  },
  {
    title: "AI Solutions",
    description:
      "Mind Matrix Workspace applies Artificial Intelligence to real engineering, product, and industrial problems. Our focus is on Edge AI, intelligent embedded products, engineering automation, technical knowledge systems, and customer-specific AI workflows.",
    icon: "psychology",
    href: "/ai-enabled-engineering",
  },
  {
    title: "Industrial Communication",
    description:
      "Standardized protocol implementation including EtherCAT, PROFINET, and Modbus TCP/IP.",
    icon: "router",
    href: "/industrial-communication",
  },
  {
    title: "Engineering Consulting",
    description:
      "Strategic technical advisory for digital transformation and legacy system modernization.",
    icon: "analytics",
    href: "/engineering-consulting",
  },
  {
    title: "Manufacturing Support",
    description:
      "Production line optimization, automated testing fixtures, and manufacturing execution systems.",
    icon: "factory",
    href: "/manufacturing",
  },
  {
    title: "PLM",
    description:
      "Product Lifecycle Management implementation to streamline engineering workflows and data integrity.",
    icon: "account_tree",
    // href: "/plm", // Uncomment when PLM page is available
  },
] as const;

export function Card1Section() {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-headline-lg text-headline-lg mb-4">
              Core Competencies
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md">
              High-stakes engineering solutions designed to meet the most
              demanding industrial requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {coreCompetencies.map((item) => (
            <div
              key={item.title}
              className="group bg-white border border-outline-variant p-8 technical-glow transition-all duration-300 flex flex-col h-full"
            >
              <div className="mb-6">
                <span
                  className="material-symbols-outlined text-4xl text-primary font-thin"
                  data-icon={item.icon}
                >
                  {item.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">
                {item.title}
              </h3>
              <p className="text-on-surface-variant font-body-md text-body-md mb-8 flex-grow">
                {item.description}
              </p>
              {"href" in item && item.href ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-primary font-label-sm text-label-sm group-hover:gap-4 transition-all"
                >
                  EXPLORE CAPABILITIES
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
