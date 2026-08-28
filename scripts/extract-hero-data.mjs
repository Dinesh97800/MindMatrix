import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = path.join(root, "src/components/pages");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "HeroSection.tsx") {
      const rel = path.relative(pagesDir, full).replace(/\\/g, "/");
      const slug = rel.split("/")[0];
      const src = fs.readFileSync(full, "utf8");
      const bg = src.match(/backgroundImage:\s*["']url\(['"]([^'"]+)['"]\)/)?.[1]
        ?? src.match(/bg-\[url\(['"]([^'"]+)['"]\)\]/)?.[1];
      const hasSplit = /grid-cols-12|lg:col-span/.test(src);
      const hasBg = !!bg || /absolute inset-0/.test(src);
      const navy = /bg-primary-container/.test(src);
      console.log(JSON.stringify({ slug, hasSplit, hasBg, navy, bg: bg?.slice(0, 80) }));
    }
  }
}

walk(pagesDir);
