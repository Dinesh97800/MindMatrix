import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pagesDir = path.join(root, "src/components/pages");

const SKIP = new Set(["insights-and-engineering-blog", "faq"]);

const heroPagesPath = path.join(root, "src/config/hero-pages.ts");
const heroPagesSource = fs.readFileSync(heroPagesPath, "utf8");
const slugMatches = [...heroPagesSource.matchAll(/^\s+"([^"]+)":/gm)].map((m) => m[1]);

const wrapper = (slug) => `import { ConfiguredHero } from "@/components/sections/hero/ConfiguredHero";

export function HeroSection() {
  return <ConfiguredHero slug="${slug}" />;
}
`;

let updated = 0;
let skipped = 0;

for (const slug of slugMatches) {
  const heroPath = path.join(pagesDir, slug, "sections", "HeroSection.tsx");
  if (!fs.existsSync(heroPath)) {
    skipped++;
    continue;
  }
  if (SKIP.has(slug)) {
    skipped++;
    continue;
  }
  fs.writeFileSync(heroPath, wrapper(slug), "utf8");
  updated++;
}

console.log(`Updated ${updated} HeroSection files, skipped ${skipped}.`);
