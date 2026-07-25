import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import {
  getContextText,
  resolveHref,
  LABEL_ROUTE_MAP,
} from "./link-resolver.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlDir = path.join(root, "stitch-html");
const contentDir = path.join(root, "src/content/pages");
const manifestPath = path.join(root, "src/data/stitch-manifest.json");
const pagesDir = path.join(root, "src/app");

/** Stitch mobile-only screens — not published as routes */
const EXCLUDED_SLUGS = new Set([
  "home-mobile",
  "services-mobile",
  "industries-mobile",
  "contact-us-mobile",
  "knowledge-base-mobile",
]);

const ROUTE_MAP = { ...LABEL_ROUTE_MAP };

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Lc9ek2leanWwsnuRipJWXMkKpeEomytTsKi2PmjiHjwcqZxRZZBc3hpFzZbkxg6nZoxtarHI-Oxh7sxD4jjdbyG65FO4sLfKo5HukLyU_56vyQWcBTVVXbPrz8Lp1mU0ukUC2OhIrZRlcvlQvDR-dIe5jp15vZYR2CgeujidebRP4FboY0JwmNOmJEIaHEiKDDRiTl9KMcJmKAyszHz8G3KSh6mNGGKneBYG1v4E2PAFcb90mDHjEgSoa49RN1-pI81RN7LjaMc";

function isStickyNavHeader($, el) {
  const cls = $(el).attr("class") || "";
  return (
    cls.includes("sticky") ||
    cls.includes("docked") ||
    (cls.includes("backdrop-blur") && !cls.includes("relative"))
  );
}

function extractMainContent(html) {
  const $ = cheerio.load(html);
  $("script").remove();
  $("link[rel='stylesheet']").remove();

  $("body > footer").remove();
  $("body > nav").remove();

  $("body > header").each((_, el) => {
    if (isStickyNavHeader($, el)) {
      $(el).remove();
    }
  });

  const parts = [];
  $("body")
    .children()
    .each((_, el) => {
      if (el.tagName?.toLowerCase() === "script") return;
      parts.push($.html(el));
    });

  return parts.join("\n").trim();
}

function fixPlaceholders(html, slug) {
  let out = html.replace(
    /bg-\[url\('placeholder'\)\]/g,
    `bg-[url('${HERO_BG}')]`
  );

  out = out.replace(
    /<button([^>]*)>\s*Request Consultation\s*<\/button>/gi,
    '<a$1 href="/request-consultation">Request Consultation</a>'
  );

  if (slug === "technologies") {
    out = out.replace(
      '<div class="absolute inset-0 z-0">\n\n</div>',
      '<div class="absolute inset-0 z-0 technical-grid opacity-40"></div>'
    );
  }

  return out;
}

function fixInternalLinks(html) {
  const $ = cheerio.load(`<wrapper>${html}</wrapper>`, null, false);

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (ROUTE_MAP[text]) {
      $(el).attr("href", ROUTE_MAP[text]);
      return;
    }
    if (!href || href === "#" || href.startsWith("javascript:")) {
      const context = getContextText($, el);
      const route = resolveHref(text, context, manifestSlugs);
      if (route) {
        $(el).attr("href", route);
        return;
      }
      const slug = text
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (slug && manifestSlugs.has(slug)) {
        $(el).attr("href", `/${slug}`);
      }
    }
  });

  $("button").each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (!text || text.length > 120) return;
    const context = getContextText($, el);
    const route = resolveHref(text, context, manifestSlugs);
    if (!route) return;
    const classes = $(el).attr("class") || "";
    const inner = $(el).html();
    $(el).replaceWith(`<a href="${route}" class="${classes}">${inner}</a>`);
  });

  return $("wrapper").html() || html;
}

let manifestSlugs = new Set();

function slugToDescription(title) {
  const name = title.split("|")[0].trim();
  return `Mind Matrix ${name} — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.`;
}

function toComponentName(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function pageTemplate(slug, title) {
  const componentName = toComponentName(slug);
  const description = slugToDescription(title);
  const path = slug === "home" ? "/" : `/${slug}`;

  return `import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: ${JSON.stringify(title.split("|")[0].trim())},
  description: ${JSON.stringify(description)},
  path: ${JSON.stringify(path)},
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/${slug}.html"),
    "utf8"
  );
}

export default function ${componentName}Page() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
`;
}

const KEEP_APP_ENTRIES = new Set([
  "(home)",
  "(main)",
  "globals.css",
  "layout.tsx",
  "robots.ts",
  "sitemap.ts",
]);

function removeExcludedPages() {
  for (const slug of EXCLUDED_SLUGS) {
    const routeDir = path.join(pagesDir, "(main)", slug);
    if (fs.existsSync(routeDir)) {
      fs.rmSync(routeDir, { recursive: true, force: true });
    }
    const contentPath = path.join(contentDir, `${slug}.html`);
    if (fs.existsSync(contentPath)) {
      fs.unlinkSync(contentPath);
    }
    const stitchPath = path.join(htmlDir, `${slug}.html`);
    if (fs.existsSync(stitchPath)) {
      fs.unlinkSync(stitchPath);
    }
  }
}

function cleanLegacyRoutes() {
  for (const entry of fs.readdirSync(pagesDir, { withFileTypes: true })) {
    const name = entry.name;
    if (KEEP_APP_ENTRIES.has(name)) continue;

    const fullPath = path.join(pagesDir, name);
    if (entry.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      continue;
    }

    if (name === "page.tsx") {
      fs.unlinkSync(fullPath);
    }
  }
}

function main() {
  if (!fs.existsSync(manifestPath)) {
    console.error("Run npm run stitch:download first.");
    process.exit(1);
  }

  const rawManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const manifest = rawManifest.filter((e) => !EXCLUDED_SLUGS.has(e.slug));
  if (manifest.length !== rawManifest.length) {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  }

  manifestSlugs = new Set(manifest.map((e) => e.slug));
  fs.mkdirSync(contentDir, { recursive: true });
  cleanLegacyRoutes();
  removeExcludedPages();

  let generated = 0;
  for (const entry of manifest) {
    if (EXCLUDED_SLUGS.has(entry.slug)) continue;
    const htmlPath = path.join(htmlDir, entry.filename);
    if (!fs.existsSync(htmlPath)) continue;

    const html = fs.readFileSync(htmlPath, "utf8");
    let mainContent = extractMainContent(html);
    mainContent = fixPlaceholders(mainContent, entry.slug);
    mainContent = fixInternalLinks(mainContent);

    fs.writeFileSync(
      path.join(contentDir, `${entry.slug}.html`),
      mainContent,
      "utf8"
    );

    const routeDir =
      entry.slug === "home"
        ? path.join(pagesDir, "(home)")
        : path.join(pagesDir, "(main)", entry.slug);

    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(
      path.join(routeDir, "page.tsx"),
      pageTemplate(entry.slug, entry.title),
      "utf8"
    );

    console.log(`Generated /${entry.slug === "home" ? "" : entry.slug}`);
    generated++;
  }

  console.log(`\nGenerated ${generated} pages (excluded ${EXCLUDED_SLUGS.size} mobile routes).`);
}

main();
