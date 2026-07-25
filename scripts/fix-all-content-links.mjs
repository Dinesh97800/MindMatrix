import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import {
  getContextText,
  resolveHref,
  slugify,
} from "./link-resolver.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "src/content/pages");
const manifestPath = path.join(root, "src/data/stitch-manifest.json");

function fixHtml(html, manifestSlugs) {
  const $ = cheerio.load(`<wrapper>${html}</wrapper>`, null, false);
  let fixed = 0;

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href !== "#" && !href.startsWith("javascript:")) return;

    const text = $(el).text().trim().replace(/\s+/g, " ");
    const context = getContextText($, el);
    const route = resolveHref(text, context, manifestSlugs);
    if (route) {
      $(el).attr("href", route);
      fixed++;
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
    const $a = $(`<a href="${route}" class="${classes}">${inner}</a>`);
    $(el).replaceWith($a);
    fixed++;
  });

  return { html: $("wrapper").html() || html, fixed };
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const manifestSlugs = new Set(manifest.map((e) => e.slug));

  let totalFixed = 0;
  let remainingHash = 0;

  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith(".html")) continue;
    const filePath = path.join(contentDir, file);
    const html = fs.readFileSync(filePath, "utf8");
    const { html: out, fixed } = fixHtml(html, manifestSlugs);
    fs.writeFileSync(filePath, out, "utf8");
    totalFixed += fixed;
    remainingHash += (out.match(/href="#"/g) || []).length;
  }

  console.log(`Fixed ${totalFixed} links/buttons across content pages.`);
  console.log(`Remaining href="#": ${remainingHash}`);
  process.exit(remainingHash > 0 ? 1 : 0);
}

main();
