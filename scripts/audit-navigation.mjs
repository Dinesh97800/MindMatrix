import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/stitch-manifest.json"), "utf8")
);
const navSource = fs.readFileSync(
  path.join(root, "src/config/navigation.ts"),
  "utf8"
);

const hrefs = new Set();
for (const match of navSource.matchAll(/href:\s*"(\/[^"#]*)"/g)) {
  hrefs.add(match[1]);
}
for (const match of navSource.matchAll(/link\([^,]+,\s*"(\/[^"]*)"\)/g)) {
  hrefs.add(match[1]);
}

const routePaths = manifest.map((e) =>
  e.slug === "home" ? "/" : `/${e.slug}`
);

const orphans = routePaths.filter((p) => !hrefs.has(p));

console.log("Routes in manifest:", routePaths.length);
console.log("Nav/footer hrefs found:", hrefs.size);
console.log("Orphan routes:", orphans.length);
if (orphans.length) orphans.forEach((p) => console.log("  -", p));

process.exit(orphans.length > 0 ? 1 : 0);
