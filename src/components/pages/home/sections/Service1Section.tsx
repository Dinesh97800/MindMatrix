import Link from "next/link";
import { siteContent } from "@/config/site-content";

const serviceCards = [
  {
    title: "Embedded Firmware",
    description:
      "Bare-metal and RTOS firmware, peripheral drivers, bootloaders, diagnostics, and configuration storage.",
    icon: "terminal",
    href: "/embedded-firmware-development",
  },
  {
    title: "Hardware & Integration",
    description:
      "Hardware-firmware integration, prototype bring-up, measurement interfaces, and bench validation.",
    icon: "developer_board",
    href: "/hardware-development",
  },
  {
    title: "Industrial Communication",
    description:
      "CAN, Modbus, RS-485, UART, SPI, I²C, Ethernet, MQTT and SNMP integration where applicable.",
    icon: "router",
    href: "/industrial-communication",
  },
  {
    title: "Engineering Consultation",
    description:
      "Requirement analysis, architecture review, debugging, redesign, and long-term engineering support.",
    icon: "engineering",
    href: "/engineering-consulting",
  },
];

export function Service1Section() {
  return (
    <section className="py-stack-lg bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-gutter mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-display-lg text-headline-lg text-primary">Core Engineering Services</h2>
            <p className="text-on-surface-variant font-body-lg">{siteContent.intro}</p>
          </div>
          <div className="pb-2">
            <Link
              href="/services"
              className="text-label-sm font-label-sm font-bold border-b border-primary text-primary pb-1"
            >
              View All Services
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {serviceCards.map((item) => (
            <div
              key={item.title}
              className="glass-card p-8 rounded-xl flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4 text-primary">{item.title}</h3>
              <p className="text-on-surface-variant mb-8 flex-grow">{item.description}</p>
              <Link
                href={item.href}
                className="flex items-center gap-2 text-primary font-label-sm text-label-sm hover:gap-4 transition-all"
              >
                Learn more
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
