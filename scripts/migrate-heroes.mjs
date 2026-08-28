import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = path.join(root, "src/components/pages");

const IMPORTED = new Set([
  "about-us",
  "application-notes-and-design-guides",
  "atacama-solar-reserve",
  "battery-energy-storage",
  "building-automation",
  "careers",
  "case-studies",
  "cognitive-core-os",
  "connectivity",
  "contact-us-and-engineering-consultation",
  "earth-resistance-monitoring",
  "energy-management",
  "engineering-whitepapers",
  "environmental-monitoring",
  "esp32",
  "hyperloop-beta",
  "insights-and-engineering-blog",
  "metropolis-ev-transit",
  "microchip",
  "nordic",
  "quantum-ready-data-architecture",
  "services",
  "technical-downloads-and-sdks",
  "technical-knowledge-base",
  "terms-and-conditions",
  "texas-instruments",
  "the-future-of-deterministic-edge-computing",
]);

function extractQuotedStrings(src) {
  const strings = [];
  const re = /\{"((?:\\.|[^"\\])*)"\}/g;
  let m;
  while ((m = re.exec(src))) {
    const value = m[1].replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
    if (value.length > 2 && !value.startsWith("/") && !value.startsWith("http")) {
      strings.push(value);
    }
  }
  return strings;
}

function extractBg(src) {
  return (
    src.match(/backgroundImage:\s*"url\('([^']+)'\)"/)?.[1] ??
    src.match(/backgroundImage:\s*'url\("([^"]+)"\)'/)?.[1] ??
    src.match(/bg-\[url\('([^']+)'\)\]/)?.[1]
  );
}

function extractLinks(src) {
  const links = [];
  const re = /<Link href=\{?"([^"]+)"\}? className=\{?"([^"]*?)"\}?>\s*\{"?([^"<]+)"?\}?/g;
  let m;
  while ((m = re.exec(src))) {
    links.push({ href: m[1], label: m[3].trim(), className: m[2] });
  }
  return links;
}

function hasSplitGrid(src) {
  return /lg:col-span-[45]/.test(src) && /lg:col-span-[67]/.test(src);
}

function isBackgroundHero(src) {
  const bg = extractBg(src);
  return !!bg && !hasSplitGrid(src);
}

function toTemplate(slug, src) {
  const strings = extractQuotedStrings(src);
  const bg = extractBg(src);
  const links = extractLinks(src);
  const background = isBackgroundHero(src);

  const eyebrow = strings.find((s) => s.length < 60 && s === s.toUpperCase()) ?? strings[0] ?? "Overview";
  const title =
    strings.find((s) => s.length > 20 && s !== eyebrow && !s.includes("arrow_forward")) ??
    strings[1] ??
    "Page Title";
  const description =
    strings.find((s) => s.length > 60 && s !== title) ??
    strings.find((s) => s.length > 30 && s !== title && s !== eyebrow) ??
    "";

  const image = bg ?? "DEFAULT_HERO_IMAGE";
  const imageConst = bg ? JSON.stringify(bg) : "DEFAULT_HERO_IMAGE";
  const imageAlt = `${title} hero image.`;

  const linkBlocks =
    links.length > 0
      ? `\n      ${links
          .map((l) => {
            const isPrimary = /bg-primary|bg-white/.test(l.className);
            const cls = isPrimary
              ? `className="group flex items-center gap-2 bg-primary px-8 py-4 font-label-sm text-label-sm font-bold text-on-primary transition-all"`
              : `className="border border-outline px-8 py-4 font-label-sm text-label-sm font-bold transition-all hover:bg-surface-container"`;
            return `<Link href="${l.href}" ${cls}>\n        ${l.label}\n      </Link>`;
          })
          .join("\n      ")}`
      : "";

  const childrenBlock = links.length
    ? `{${linkBlocks}\n    }`
    : "undefined";

  if (background) {
    return `import Link from "next/link";
import { BackgroundImageHero } from "@/components/sections/hero";
import { getHeroVisual${imageConst === "DEFAULT_HERO_IMAGE" ? ", DEFAULT_HERO_IMAGE" : ""} } from "@/config/hero-content";

export function HeroSection() {
  const visual = getHeroVisual("${slug}");

  return (
    <BackgroundImageHero
      eyebrow=${JSON.stringify(eyebrow)}
      title=${JSON.stringify(title)}
      description=${JSON.stringify(description)}
      backgroundImage={visual.image${bg ? "" : " ?? DEFAULT_HERO_IMAGE"}}
      backgroundAlt={visual.imageAlt}
      overlay={visual.overlay}
      tone={visual.tone}
      ${links.length ? `>\n      ${links.map((l) => `<Link href="${l.href}" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-label-sm text-label-sm text-on-primary">${l.label}</Link>`).join("\n      ")}\n    </BackgroundImageHero>` : "/>"}
  );
}
`;
  }

  return `import Link from "next/link";
import { SplitHero } from "@/components/sections/hero";
import { getHeroVisual${imageConst === "DEFAULT_HERO_IMAGE" ? ", DEFAULT_HERO_IMAGE" : ""} } from "@/config/hero-content";

export function HeroSection() {
  const visual = getHeroVisual("${slug}");

  return (
    <SplitHero
      eyebrow=${JSON.stringify(eyebrow)}
      title=${JSON.stringify(title)}
      description=${JSON.stringify(description)}
      image={visual.image}
      imageAlt={visual.imageAlt}
      tone={visual.tone ?? "dark"}
      ${links.length ? `>\n      ${links.map((l) => `<Link href="${l.href}" className="bg-primary px-8 py-4 font-label-sm text-label-sm font-bold text-on-primary">${l.label}</Link>`).join("\n      ")}\n    </SplitHero>` : "/>"}
  );
}
`;
}

let count = 0;
for (const slug of IMPORTED) {
  const file = path.join(pagesDir, slug, "sections", "HeroSection.tsx");
  if (!fs.existsSync(file)) continue;
  const src = fs.readFileSync(file, "utf8");
  if (src.includes("SplitHero") || src.includes("BackgroundImageHero")) continue;
  fs.writeFileSync(file, toTemplate(slug, src));
  count++;
  console.log("Updated", slug);
}
console.log("Total updated:", count);
