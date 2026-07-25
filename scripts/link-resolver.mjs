/**
 * Resolves Stitch placeholder links/buttons to real app routes.
 */

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const LABEL_ROUTE_MAP = {
  Services: "/services",
  Industries: "/industries",
  Technology: "/technologies",
  Technologies: "/technologies",
  Insights: "/insights-and-engineering-blog",
  About: "/about-us",
  "About Us": "/about-us",
  "Request Consultation": "/request-consultation",
  "Contact Sales": "/contact-us",
  "Contact Us": "/contact-us",
  "Mind Matrix": "/",
  Home: "/",
  "View All Services": "/services",
  "View All": "/services",
  "View Case Studies": "/case-studies",
  "All Services": "/services",
  "Embedded Firmware Development": "/embedded-firmware-development",
  "Embedded Firmware": "/embedded-firmware-development",
  "Hardware Development": "/hardware-development",
  "Hardware Design": "/hardware-development",
  "Product Development": "/product-development",
  "Industrial IoT": "/industrial-iot-solutions",
  "Industrial IoT Solutions": "/industrial-iot-solutions",
  "AI-enabled Engineering": "/ai-enabled-engineering",
  "Industrial Communication": "/industrial-communication",
  Connectivity: "/connectivity",
  "Engineering Process": "/engineering-process",
  "Engineering Consulting": "/engineering-consulting",
  "Embedded Linux": "/embedded-linux",
  Solutions: "/solutions",
  "Case Studies": "/case-studies",
  Careers: "/careers",
  FAQ: "/faq",
  "Privacy Policy": "/privacy-policy",
  "Terms & Conditions": "/terms-and-conditions",
  "Technical Knowledge Base": "/technical-knowledge-base",
  "Engineering Whitepapers": "/engineering-whitepapers",
  "Technical Downloads & SDKs": "/technical-downloads-and-sdks",
  "Application Notes & Design Guides": "/application-notes-and-design-guides",
  "Resources & Blog": "/resources-and-blog",
  "Insights & Engineering Blog": "/insights-and-engineering-blog",
  STM32: "/stm32",
  ESP32: "/esp32",
  MQTT: "/mqtt",
  FreeRTOS: "/freertos",
  "Renewable Energy": "/renewable-energy",
  "Smart Grid": "/smart-grid",
  Manufacturing: "/manufacturing",
  Telecom: "/telecom",
  "Explore Capabilities": "/services",
  "Explore Industries": "/industries",
  "Explore Methodology": "/engineering-process",
  "View Case Studies": "/case-studies",
  "Schedule a Technical Call": "/request-consultation",
  "Schedule Technical Review": "/request-consultation",
  "Download Service Brochure": "/technical-downloads-and-sdks",
  "Download Capability Statement": "/technical-downloads-and-sdks",
  "Download Services Guide": "/technical-downloads-and-sdks",
  "Contact Engineering Team": "/contact-us",
  "Schedule Tech Demo": "/request-consultation",
  "VIEW ALL SPECIFICATIONS": "/technical-downloads-and-sdks",
  "READ SPECIFICATION": "/mqtt",
  "READ ANALYSIS": "/embedded-firmware-development",
  "VIEW WHITEPAPER": "/engineering-whitepapers",
  "READ CASE STUDY": "/case-studies",
  "Case Study": "/case-studies",
  "Technical Report": "/technical-downloads-and-sdks",
  "Learn More": "/services",
  "Read More": "/insights-and-engineering-blog",
  "Discover More": "/about-us",
  "View Solutions": "/solutions",
  "View All Solutions": "/solutions",
  "EXPLORE CAPABILITIES": "/services",
  Hyperloop: "/hyperloop-beta",
  "Hyperloop Beta": "/hyperloop-beta",
  "Atacama Solar Reserve": "/atacama-solar-reserve",
  "Metropolis EV-Transit": "/metropolis-ev-transit",
  "Nanolithography Cluster Control": "/nanolithography-cluster-control",
  "Deterministic Edge Computing": "/the-future-of-deterministic-edge-computing",
  "Edge AI": "/ai-enabled-engineering",
  "Embedded Systems": "/embedded-firmware-development",
  "Firmware Security": "/embedded-firmware-development",
  "Control Theory": "/engineering-process",
  Articles: "/application-notes-and-design-guides",
  "Engineering Specs": "/application-notes-and-design-guides",
  "API Reference": "/technical-knowledge-base",
  Archives: "/resources-and-blog",
  Support: "/contact-us",
  Feedback: "/contact-us",
  Compliance: "/terms-and-conditions",
  "API Health": "/technical-knowledge-base",
  "Smart Cities Core": "/smart-infrastructure",
  "Read Impact Report": "/case-studies",
  "Documentation Hub": "/technical-knowledge-base",
  "System Status": "/faq",
  "Join Newsletter": "/resources-and-blog",
};

/** Longest-match keyword → route (lowercase keys) */
export const KEYWORD_ROUTES = [
  ["embedded firmware development", "/embedded-firmware-development"],
  ["embedded firmware", "/embedded-firmware-development"],
  ["embedded measurement system", "/embedded-measurement-system"],
  ["hardware development", "/hardware-development"],
  ["hardware design", "/hardware-development"],
  ["product development", "/product-development"],
  ["engineering consulting", "/engineering-consulting"],
  ["engineering process", "/engineering-process"],
  ["engineering whitepapers", "/engineering-whitepapers"],
  ["application notes", "/application-notes-and-design-guides"],
  ["technical downloads", "/technical-downloads-and-sdks"],
  ["technical knowledge base", "/technical-knowledge-base"],
  ["knowledge base", "/technical-knowledge-base"],
  ["industrial iot solutions", "/industrial-iot-solutions"],
  ["industrial iot gateway", "/industrial-iot-gateway"],
  ["industrial iot", "/industrial-iot-solutions"],
  ["industrial automation", "/industrial-automation"],
  ["industrial communication", "/industrial-communication"],
  ["industrial protocols", "/industrial-protocols"],
  ["industrial controller", "/industrial-controller"],
  ["renewable energy", "/renewable-energy"],
  ["smart infrastructure", "/smart-infrastructure"],
  ["smart cities", "/smart-infrastructure"],
  ["documentation hub", "/technical-knowledge-base"],
  ["system status", "/faq"],
  ["impact report", "/case-studies"],
  ["api reference", "/technical-knowledge-base"],
  ["engineering specs", "/application-notes-and-design-guides"],
  ["building automation", "/building-automation"],
  ["energy monitoring", "/energy-monitoring"],
  ["energy management", "/energy-management"],
  ["environmental monitoring", "/environmental-monitoring"],
  ["remote monitoring", "/remote-monitoring"],
  ["pipeline monitoring", "/pipeline-monitoring"],
  ["earth resistance", "/earth-resistance-monitoring"],
  ["battery management", "/battery-management-system"],
  ["battery energy storage", "/battery-energy-storage"],
  ["ev charger", "/ev-charger-electronics"],
  ["ev infrastructure", "/ev-infrastructure"],
  ["wireless sensor", "/wireless-sensor-network"],
  ["snmp alarm", "/snmp-alarm-gateway"],
  ["oil and gas", "/oil-and-gas"],
  ["ai-enabled engineering", "/ai-enabled-engineering"],
  ["cognitive core", "/cognitive-core-os"],
  ["quantum-ready", "/quantum-ready-data-architecture"],
  ["deterministic edge", "/the-future-of-deterministic-edge-computing"],
  ["hyperloop", "/hyperloop-beta"],
  ["atacama solar", "/atacama-solar-reserve"],
  ["metropolis ev", "/metropolis-ev-transit"],
  ["nanolithography", "/nanolithography-cluster-control"],
  ["texas instruments", "/texas-instruments"],
  ["connectivity", "/connectivity"],
  ["freertos", "/freertos"],
  ["embedded linux", "/embedded-linux"],
  ["aws iot", "/aws-iot"],
  ["azure iot", "/azure-iot"],
  ["case studies", "/case-studies"],
  ["case study", "/case-studies"],
  ["whitepaper", "/engineering-whitepapers"],
  ["whitepapers", "/engineering-whitepapers"],
  ["stm32", "/stm32"],
  ["esp32", "/esp32"],
  ["mqtt", "/mqtt"],
  ["nxp", "/nxp"],
  ["nordic", "/nordic"],
  ["renesas", "/renesas"],
  ["microchip", "/microchip"],
  ["manufacturing", "/manufacturing"],
  ["telecom", "/telecom"],
  ["contact us", "/contact-us"],
  ["consultation", "/request-consultation"],
  ["careers", "/careers"],
  ["privacy", "/privacy-policy"],
  ["terms", "/terms-and-conditions"],
  ["faq", "/faq"],
  ["services", "/services"],
  ["industries", "/industries"],
  ["technologies", "/technologies"],
  ["solutions", "/solutions"],
  ["resources", "/resources-and-blog"],
  ["blog", "/insights-and-engineering-blog"],
  ["insights", "/insights-and-engineering-blog"],
];

export const CTA_BUTTON_ROUTES = {
  "request consultation": "/request-consultation",
  "explore capabilities": "/services",
  "view case studies": "/case-studies",
  "view all services": "/services",
  "explore industries": "/industries",
  "explore methodology": "/engineering-process",
  "schedule a technical call": "/request-consultation",
  "schedule technical review": "/request-consultation",
  "download service brochure": "/technical-downloads-and-sdks",
  "download capability statement": "/technical-downloads-and-sdks",
  "download services guide": "/technical-downloads-and-sdks",
  "contact engineering team": "/contact-us",
  "schedule tech demo": "/request-consultation",
  "contact sales": "/contact-us",
  "get started": "/request-consultation",
  "learn more": "/services",
  "read more": "/insights-and-engineering-blog",
  "view all": "/services",
  "discover more": "/about-us",
};

export function resolveHref(text, contextText, manifestSlugs) {
  const normalized = text.trim().replace(/\s+/g, " ");
  const normalizedKey = normalized.replace(/\s*→.*$/, "").trim();

  if (LABEL_ROUTE_MAP[normalizedKey]) {
    return LABEL_ROUTE_MAP[normalizedKey];
  }

  const upper = normalizedKey.toUpperCase();
  if (LABEL_ROUTE_MAP[upper]) return LABEL_ROUTE_MAP[upper];

  const ctaKey = normalizedKey.toLowerCase();
  if (CTA_BUTTON_ROUTES[ctaKey]) return CTA_BUTTON_ROUTES[ctaKey];

  const slugFromText = slugify(normalizedKey);
  if (slugFromText && manifestSlugs.has(slugFromText)) {
    return `/${slugFromText}`;
  }

  const combined = `${normalizedKey} ${contextText}`.toLowerCase();

  for (const [keyword, route] of KEYWORD_ROUTES) {
    if (combined.includes(keyword)) return route;
  }

  if (/read|view|explore|download|schedule|contact/i.test(normalizedKey)) {
    if (combined.includes("case stud")) return "/case-studies";
    if (combined.includes("whitepaper")) return "/engineering-whitepapers";
    if (combined.includes("download") || combined.includes("sdk")) {
      return "/technical-downloads-and-sdks";
    }
    if (combined.includes("consult") || combined.includes("schedule")) {
      return "/request-consultation";
    }
    if (combined.includes("contact")) return "/contact-us";
  }

  return null;
}

export function getContextText($, el) {
  const $el = $(el);
  let context = $el.text();
  let parent = $el.parent();
  for (let i = 0; i < 6 && parent.length; i++) {
    parent.find("h1, h2, h3, h4, h5").each((_, h) => {
      context += " " + $(h).text();
    });
    parent = parent.parent();
  }
  return context.replace(/\s+/g, " ").trim();
}
