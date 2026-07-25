import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/stitch-manifest.json"), "utf8")
);

const BASE = "http://localhost:3000";

const pages = manifest
  .map((entry) => {
    const routePath = entry.slug === "home" ? "/" : `/${entry.slug}`;
    const title = entry.title.split("|")[0].trim();
    return { routePath, title, slug: entry.slug };
  })
  .sort((a, b) => {
    if (a.routePath === "/") return -1;
    if (b.routePath === "/") return 1;
    return a.routePath.localeCompare(b.routePath);
  });

const lines = [
  "# Mind Matrix — Local page URLs",
  "",
  `Base URL: ${BASE}`,
  "",
  "Use this list to review every page locally. Start the dev server with `npm run dev` first.",
  "",
  `Total pages: ${pages.length}`,
  "",
  "## Table",
  "",
  "| # | Page | URL |",
  "|---|------|-----|",
];

pages.forEach((page, index) => {
  const url = page.routePath === "/" ? `${BASE}/` : `${BASE}${page.routePath}`;
  lines.push(`| ${index + 1} | ${page.title} | ${url} |`);
});

lines.push("", "## Plain list (copy-friendly)", "");

pages.forEach((page) => {
  const url = page.routePath === "/" ? `${BASE}/` : `${BASE}${page.routePath}`;
  lines.push(url);
});

const outPath = path.join(root, "LOCAL_PAGE_URLS.md");
fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf8");
console.log(`Wrote ${pages.length} URLs to ${outPath}`);
