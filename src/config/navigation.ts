export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  links?: NavLink[];
  groups?: NavGroup[];
}

const link = (label: string, href: string): NavLink => ({ label, href });

/** No dedicated portal page yet — route inquiries to contact until launch. */
export const CLIENT_PORTAL_HREF = "/contact-us";

const resourcesNavItem: NavItem = {
  label: "Resources",
  href: "/resources-and-blog",
  links: [
    link("Engineering Whitepapers", "/engineering-whitepapers"),
    link("Application Notes & Design Guides", "/application-notes-and-design-guides"),
    link("Technical Downloads & SDKs", "/technical-downloads-and-sdks"),
    link("Technical Knowledge Base", "/technical-knowledge-base"),
    link("Insights & Engineering Blog", "/insights-and-engineering-blog"),
    link("Resources & Blog", "/resources-and-blog"),
    link("Deterministic Edge Computing", "/the-future-of-deterministic-edge-computing"),
  ],
};

const caseStudiesNavItem: NavItem = {
  label: "Case Studies",
  href: "/case-studies",
  links: [
    link("Hyperloop Beta", "/hyperloop-beta"),
    link("Atacama Solar Reserve", "/atacama-solar-reserve"),
    link("Metropolis EV-Transit", "/metropolis-ev-transit"),
    link("Nanolithography Cluster Control", "/nanolithography-cluster-control"),
  ],
};

/** Top bar only — Home, Services, Industries, Solutions, Technologies, About, Contact */
export const headerNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    links: [
      link("Product Development", "/product-development"),
      link("Hardware Development", "/hardware-development"),
      link("Embedded Firmware Development", "/embedded-firmware-development"),
      link("Embedded Linux", "/embedded-linux"),
      link("Engineering Consulting", "/engineering-consulting"),
      link("AI-enabled Engineering", "/ai-enabled-engineering"),
      link("Connectivity", "/connectivity"),
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    links: [
      link("Manufacturing", "/manufacturing"),
      link("Industrial Automation", "/industrial-automation"),
      link("Oil & Gas", "/oil-and-gas"),
      link("Renewable Energy", "/renewable-energy"),
      link("Smart Infrastructure", "/smart-infrastructure"),
      link("Telecom", "/telecom"),
      link("EV Infrastructure", "/ev-infrastructure"),
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    groups: [
      {
        label: "IoT & Edge",
        links: [
          link("Industrial IoT Solutions", "/industrial-iot-solutions"),
          link("Industrial IoT Gateway", "/industrial-iot-gateway"),
          link("Industrial Controller", "/industrial-controller"),
          link("SNMP Alarm Gateway", "/snmp-alarm-gateway"),
        ],
      },
      {
        label: "Monitoring",
        links: [
          link("Energy Monitoring", "/energy-monitoring"),
          link("Energy Management", "/energy-management"),
          link("Remote Monitoring", "/remote-monitoring"),
          link("Environmental Monitoring", "/environmental-monitoring"),
          link("Pipeline Monitoring", "/pipeline-monitoring"),
          link("Earth Resistance Monitoring", "/earth-resistance-monitoring"),
        ],
      },
      {
        label: "Infrastructure",
        links: [
          link("Building Automation", "/building-automation"),
          link("Smart Grid", "/smart-grid"),
          link("Battery Management System", "/battery-management-system"),
          link("Battery Energy Storage", "/battery-energy-storage"),
          link("EV Charger Electronics", "/ev-charger-electronics"),
          link("Embedded Measurement System", "/embedded-measurement-system"),
          link("Wireless Sensor Network", "/wireless-sensor-network"),
        ],
      },
    ],
  },
  {
    label: "Technologies",
    href: "/technologies",
    groups: [
      {
        label: "Embedded Platforms",
        links: [
          link("STM32", "/stm32"),
          link("ESP32", "/esp32"),
          link("NXP", "/nxp"),
          link("Nordic", "/nordic"),
          link("Renesas", "/renesas"),
          link("Microchip", "/microchip"),
          link("Texas Instruments", "/texas-instruments"),
        ],
      },
      {
        label: "Operating Systems",
        links: [
          link("FreeRTOS", "/freertos"),
          link("Embedded Linux", "/embedded-linux"),
        ],
      },
      {
        label: "Connectivity",
        links: [
          link("MQTT", "/mqtt"),
          link("AWS IoT", "/aws-iot"),
          link("Azure IoT", "/azure-iot"),
          link("Industrial Protocols", "/industrial-protocols"),
          link("Industrial Communication", "/industrial-communication"),
        ],
      },
      {
        label: "AI & Software",
        links: [
          link("AI-enabled Engineering", "/ai-enabled-engineering"),
          link("Cognitive Core OS", "/cognitive-core-os"),
          link("Quantum-Ready Data Architecture", "/quantum-ready-data-architecture"),
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about-us",
    links: [
      link("About Us", "/about-us"),
      link("Engineering Process", "/engineering-process"),
      link("Careers", "/careers"),
      link("FAQ", "/faq"),
    ],
  },
  {
    label: "Contact",
    href: "/contact-us",
    links: [
      link("Contact Us", "/contact-us"),
      link("Request Consultation", "/request-consultation"),
      link("Engineering Consultation", "/contact-us-and-engineering-consultation"),
    ],
  },
];

/** Header + footer-only sections (Resources, Case Studies) for routing helpers */
export const mainNavItems: NavItem[] = [
  ...headerNavItems,
  resourcesNavItem,
  caseStudiesNavItem,
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      link("All Services", "/services"),
      link("Product Development", "/product-development"),
      link("Hardware Development", "/hardware-development"),
      link("Embedded Firmware", "/embedded-firmware-development"),
      link("Embedded Linux", "/embedded-linux"),
      link("Engineering Consulting", "/engineering-consulting"),
      link("Connectivity", "/connectivity"),
    ],
  },
  {
    title: "Industries",
    links: [
      link("All Industries", "/industries"),
      link("Manufacturing", "/manufacturing"),
      link("Industrial Automation", "/industrial-automation"),
      link("Oil & Gas", "/oil-and-gas"),
      link("Renewable Energy", "/renewable-energy"),
      link("Telecom", "/telecom"),
    ],
  },
  {
    title: "Technologies",
    links: [
      link("Tech Stack", "/technologies"),
      link("STM32", "/stm32"),
      link("ESP32", "/esp32"),
      link("FreeRTOS", "/freertos"),
      link("MQTT", "/mqtt"),
      link("Industrial Protocols", "/industrial-protocols"),
    ],
  },
  {
    title: "Solutions",
    links: [
      link("All Solutions", "/solutions"),
      link("Industrial IoT", "/industrial-iot-solutions"),
      link("Smart Grid", "/smart-grid"),
      link("Energy Monitoring", "/energy-monitoring"),
      link("Building Automation", "/building-automation"),
      link("SNMP Alarm Gateway", "/snmp-alarm-gateway"),
    ],
  },
  {
    title: "Resources",
    links: [
      link("Whitepapers", "/engineering-whitepapers"),
      link("Application Notes", "/application-notes-and-design-guides"),
      link("Downloads & SDKs", "/technical-downloads-and-sdks"),
      link("Knowledge Base", "/technical-knowledge-base"),
      link("Insights & Blog", "/insights-and-engineering-blog"),
    ],
  },
  {
    title: "Case Studies",
    links: [
      link("All Case Studies", "/case-studies"),
      link("Hyperloop Beta", "/hyperloop-beta"),
      link("Atacama Solar Reserve", "/atacama-solar-reserve"),
      link("Metropolis EV-Transit", "/metropolis-ev-transit"),
      link("Nanolithography", "/nanolithography-cluster-control"),
    ],
  },
  {
    title: "Company",
    links: [
      link("About Us", "/about-us"),
      link("Engineering Process", "/engineering-process"),
      link("Careers", "/careers"),
      link("FAQ", "/faq"),
    ],
  },
  {
    title: "Legal",
    links: [
      link("Privacy Policy", "/privacy-policy"),
      link("Terms & Conditions", "/terms-and-conditions"),
    ],
  },
  {
    title: "Contact",
    links: [
      link("Contact Us", "/contact-us"),
      link("Request Consultation", "/request-consultation"),
      link("Client Portal", CLIENT_PORTAL_HREF),
    ],
  },
];

/** @deprecated Use footerColumns — kept for minimal imports */
export const homeFooterServiceLinks = footerColumns[0].links.slice(1, 5);
export const homeFooterCompanyLinks = footerColumns[6].links.concat(
  footerColumns[7].links.slice(0, 1)
);
export const defaultFooterExpertiseLinks = footerColumns[0].links
  .slice(0, 1)
  .concat(footerColumns[1].links.slice(0, 1), footerColumns[2].links.slice(0, 1));
export const defaultFooterResourceLinks = footerColumns[4].links;
export const defaultFooterCompanyLinks = footerColumns[6].links.concat(
  footerColumns[8].links.slice(0, 1)
);

export function collectNavHrefs(items: NavItem[] = mainNavItems): string[] {
  const hrefs = new Set<string>();

  const add = (href: string) => {
    if (href && href !== "#" && href.startsWith("/")) hrefs.add(href);
  };

  for (const item of items) {
    add(item.href);
    item.links?.forEach((l) => add(l.href));
    item.groups?.forEach((g) => {
      if (g.href) add(g.href);
      g.links.forEach((l) => add(l.href));
    });
  }

  return [...hrefs];
}

/** All in-app routes linked from main nav and footer (for audits). */
export function collectAllSiteHrefs(): string[] {
  const hrefs = new Set(collectNavHrefs(mainNavItems));
  footerColumns.forEach((col) =>
    col.links.forEach((l) => {
      if (l.href && l.href !== "#" && l.href.startsWith("/")) hrefs.add(l.href);
    })
  );
  return [...hrefs];
}

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`))) {
    return true;
  }
  const hrefs = collectNavHrefs([item]);
  return hrefs.some(
    (href) =>
      href !== item.href &&
      (pathname === href || pathname.startsWith(`${href}/`))
  );
}

export function isLinkActive(pathname: string, href: string): boolean {
  if (href === "#" || !href.startsWith("/")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === "/") return [{ label: "Home", href: "/" }];

  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  for (const item of mainNavItems) {
    if (item.href === "/") continue;

    const allLinks: NavLink[] = [
      { label: item.label, href: item.href },
      ...(item.links ?? []),
      ...(item.groups?.flatMap((g) => g.links) ?? []),
    ];

    const match = allLinks.find((l) => isLinkActive(pathname, l.href));
    if (match) {
      if (item.href !== match.href) {
        crumbs.push({ label: item.label, href: item.href });
      }
      crumbs.push({ label: match.label, href: match.href });
      return crumbs;
    }
  }

  crumbs.push({ label: "Page", href: pathname });
  return crumbs;
}

export type MobileNavNode = {
  id: string;
  label: string;
  href?: string;
  children?: MobileNavNode[];
};

export function buildMobileNavTree(): MobileNavNode[] {
  return headerNavItems.map((item) => {
    const children: MobileNavNode[] = [];

    item.links?.forEach((l) => {
      children.push({
        id: l.href,
        label: l.label,
        href: l.href,
      });
    });

    item.groups?.forEach((group) => {
      children.push({
        id: `group-${item.label}-${group.label}`,
        label: group.label,
        href: group.href,
        children: group.links.map((l) => ({
          id: l.href,
          label: l.label,
          href: l.href,
        })),
      });
    });

    return {
      id: item.href || item.label,
      label: item.label,
      href: item.href,
      children: children.length > 0 ? children : undefined,
    };
  });
}
