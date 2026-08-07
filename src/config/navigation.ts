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

/** Top navigation aligned with approved site structure */
export const headerNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    links: [
      link("Technical Consultation", "/engineering-consulting"),
      link("Requirement & Architecture Review", "/engineering-process"),
      link("Embedded Firmware Development", "/embedded-firmware-development"),
      link("Hardware & Firmware Development", "/hardware-development"),
      link("Prototype Bring-up", "/product-development"),
      link("Existing-product Debugging", "/engineering-consulting"),
      link("Design Upgrade/Redesign", "/product-development"),
      link("Communication Integration", "/industrial-communication"),
      link("Test & Calibration Utilities", "/embedded-measurement-system"),
      link("Production-transition Support", "/manufacturing"),
      link("Long-term Engineering Support", "/engineering-consulting"),
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    links: [
      link("Industrial Control & Monitoring", "/industrial-automation"),
      link("Power Electronics & Battery Chargers", "/ev-charger-electronics"),
      link("Telecom Power Systems", "/telecom"),
      link("Energy Measurement & Monitoring", "/energy-monitoring"),
      link("Remote Monitoring & Gateways", "/remote-monitoring"),
      link("Custom Instrumentation", "/embedded-measurement-system"),
      link("Data Acquisition & Logging", "/industrial-iot-gateway"),
      link("Embedded Communication Products", "/snmp-alarm-gateway"),
    ],
  },
  {
    label: "Technologies",
    href: "/technologies",
    links: [
      link("STM32", "/stm32"),
      link("FreeRTOS", "/freertos"),
      link("Industrial Protocols", "/industrial-protocols"),
      link("Industrial Communication", "/industrial-communication"),
      link("MQTT", "/mqtt"),
      link("Embedded Linux", "/embedded-linux"),
    ],
  },
  {
    label: "Projects",
    href: "/case-studies",
  },
  {
    label: "About",
    href: "/about-us",
    links: [
      link("About Us", "/about-us"),
      link("Engineering Process", "/engineering-process"),
      link("FAQ", "/faq"),
    ],
  },
  {
    label: "Engineering Consultation",
    href: "/contact-us-and-engineering-consultation",
  },
  {
    label: "Contact",
    href: "/contact-us",
    links: [
      link("Contact Us", "/contact-us"),
      link("Engineering Consultation", "/contact-us-and-engineering-consultation"),
    ],
  },
];

export const mainNavItems: NavItem[] = [...headerNavItems];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      link("All Services", "/services"),
      link("Embedded Firmware", "/embedded-firmware-development"),
      link("Hardware Development", "/hardware-development"),
      link("Engineering Consulting", "/engineering-consulting"),
      link("Industrial Communication", "/industrial-communication"),
    ],
  },
  {
    title: "Industries",
    links: [
      link("All Industries", "/industries"),
      link("Industrial Automation", "/industrial-automation"),
      link("Telecom Power", "/telecom"),
      link("Energy Monitoring", "/energy-monitoring"),
      link("Remote Monitoring", "/remote-monitoring"),
    ],
  },
  {
    title: "Technologies",
    links: [
      link("Tech Stack", "/technologies"),
      link("STM32", "/stm32"),
      link("FreeRTOS", "/freertos"),
      link("Industrial Protocols", "/industrial-protocols"),
      link("MQTT", "/mqtt"),
    ],
  },
  {
    title: "Projects",
    links: [link("Selected Project Experience", "/case-studies")],
  },
  {
    title: "Company",
    links: [
      link("About Us", "/about-us"),
      link("Engineering Process", "/engineering-process"),
      link("FAQ", "/faq"),
    ],
  },
  {
    title: "Legal",
    links: [
      link("Privacy Policy", "/privacy-policy"),
      link("Terms of Website Use", "/terms-and-conditions"),
    ],
  },
  {
    title: "Contact",
    links: [
      link("Contact Us", "/contact-us"),
      link("Engineering Consultation", "/contact-us-and-engineering-consultation"),
    ],
  },
];

export const homeFooterServiceLinks = footerColumns[0].links.slice(1, 5);
export const homeFooterCompanyLinks = footerColumns[4].links.concat(
  footerColumns[5].links.slice(0, 1)
);
export const defaultFooterExpertiseLinks = footerColumns[0].links
  .slice(0, 1)
  .concat(footerColumns[1].links.slice(0, 1), footerColumns[2].links.slice(0, 1));
export const defaultFooterResourceLinks = footerColumns[3].links;
export const defaultFooterCompanyLinks = footerColumns[4].links.concat(
  footerColumns[6].links.slice(0, 1)
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
