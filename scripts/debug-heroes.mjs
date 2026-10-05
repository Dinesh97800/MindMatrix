import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = path.join(root, "src/components/pages");
const heroPagesSource = fs.readFileSync(path.join(root, "src/config/hero-pages.ts"), "utf8");
const slugs = [...heroPagesSource.matchAll(/^\s+"([^"]+)":/gm)].map((m) => m[1]);

for (const slug of slugs) {
  const heroPath = path.join(pagesDir, slug, "sections", "HeroSection.tsx");
  const exists = fs.existsSync(heroPath);
  const content = exists ? fs.readFileSync(heroPath, "utf8") : "";
  const migrated = content.includes("ConfiguredHero");
  if (!exists || !migrated) {
    console.log(`${slug}: exists=${exists} migrated=${migrated}`);
  }
}

console.log("Total slugs:", slugs.length);
console.log("Has connectivity:", slugs.includes("connectivity"));
console.log("Has services:", slugs.includes("services"));
