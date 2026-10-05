import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, "src", "app");

const paths = [
  "/",
  "/services",
  "/product-development",
  "/hardware-development",
  "/embedded-firmware-development",
  "/embedded-linux",
  "/engineering-consulting",
  "/ai-enabled-engineering",
  "/connectivity",
  "/industries",
  "/manufacturing",
  "/industrial-automation",
  "/oil-and-gas",
  "/renewable-energy",
  "/smart-infrastructure",
  "/telecom",
  "/ev-infrastructure",
  "/iot",
  "/industrial-controller",
  "/snmp-alarm-gateway",
  "/energy-monitoring",
  "/energy-management",
  "/remote-monitoring",
  "/building-automation",
  "/smart-grid",
  "/battery-management-system",
  "/battery-energy-storage",
  "/ev-charger-electronics",
  "/embedded-measurement-system",
  "/wireless-sensor-network",
  "/esp32",
  "/nxp",
  "/nordic",
  "/renesas",
  "/microchip",
  "/texas-instruments",
  "/rtos",
  "/mqtt",
  "/aws-iot",
  "/azure-iot",
  "/industrial-protocols",
  "/industrial-communication",
  "/cognitive-core-os",
  "/quantum-ready-data-architecture",
  "/about-us",
  "/engineering-process",
  "/careers",
  "/faq",
  "/contact-us",
  "/request-consultation",
  "/contact-us-and-engineering-consultation",
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name === "page.tsx" ? [full] : [];
  });
}

const pageFiles = walk(appDir);
let updated = 0;

for (const file of pageFiles) {
  let content = fs.readFileSync(file, "utf8");
  const match = content.match(/path:\s*"([^"]+)"/);
  if (!match) continue;

  const pagePath = match[1];
  if (!paths.includes(pagePath)) continue;

  if (content.includes("pageMetadata(")) continue;

  content = content.replace(
    /import \{ buildPageMetadata \} from "@\/lib\/seo";/,
    'import { pageMetadata } from "@/lib/seo";',
  );

  content = content.replace(
    /export const metadata: Metadata = buildPageMetadata\(\{[\s\S]*?\}\);/,
    `export const metadata: Metadata = pageMetadata("${pagePath}");`,
  );

  fs.writeFileSync(file, content);
  updated += 1;
  console.log(`Updated ${path.relative(root, file)} (${pagePath})`);
}

console.log(`Done. Updated ${updated} pages.`);
