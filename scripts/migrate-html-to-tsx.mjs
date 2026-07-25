/**
 * Converts src/content/pages/*.html into React section components under
 * src/components/pages/{slug}/ and updates app route page.tsx files.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "src/content/pages");
const pagesComponentsDir = path.join(root, "src/components/pages");
const appDir = path.join(root, "src/app");
const manifestPath = path.join(root, "src/data/stitch-manifest.json");

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "") || "Section";
}

function toComponentName(slug) {
  return (
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("") + "PageContent"
  );
}

function htmlAttrToJsx(name) {
  const map = {
    class: "className",
    for: "htmlFor",
    tabindex: "tabIndex",
    readonly: "readOnly",
    maxlength: "maxLength",
    colspan: "colSpan",
    rowspan: "rowSpan",
    viewbox: "viewBox",
    crossorigin: "crossOrigin",
    autocomplete: "autoComplete",
    enctype: "encType",
  };
  if (map[name]) return map[name];
  if (name.startsWith("data-") || name.startsWith("aria-")) return name;
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function parseStyleString(style) {
  const obj = {};
  for (const rule of style.split(";")) {
    const idx = rule.indexOf(":");
    if (idx === -1) continue;
    const prop = rule.slice(0, idx).trim();
    const val = rule.slice(idx + 1).trim();
    if (!prop || !val) continue;
    const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj[camel] = val;
  }
  return obj;
}

function slugToDescription(title) {
  const name = title.split("|")[0].trim();
  return `Mind Matrix ${name} — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.`;
}

function slugToKeywords(slug) {
  const base = slug === "home" ? ["mind matrix", "embedded engineering"] : slug.split("-");
  return [...new Set(["mind matrix", "embedded systems", ...base])].slice(0, 12);
}

function sanitizeComponentName(name) {
  if (!name || !/^[a-zA-Z]/.test(name)) {
    name = `Block${name.replace(/\D/g, "") || "Section"}`;
  }
  if (!name.endsWith("Section")) name += "Section";
  return name;
}

function inferSectionName(index, html, used) {
  const commentMatch = html.match(/<!--\s*([^-][\s\S]*?)\s*-->/);
  let raw = "Content";
  if (commentMatch) {
    raw =
      toPascalCase(commentMatch[1].replace(/\bsection\b/i, "").trim()) || "Content";
  } else if (index === 0) {
    raw = "Hero";
  } else {
    const $ = cheerio.load(html, null, false);
    raw =
      toPascalCase($("h1").first().text().trim()) ||
      toPascalCase($("h2").first().text().trim()) ||
      `Part${index + 1}`;
  }
  let name = sanitizeComponentName(raw);
  let n = 2;
  const stem = name.replace(/Section$/, "");
  while (used.has(name)) {
    name = sanitizeComponentName(`${stem}${n++}`);
  }
  used.add(name);
  return name;
}

function parseOnClickHandler(onclick) {
  const trimmed = onclick.trim();
  if (trimmed === "toggleAccordion(this)") {
    return {
      needsAccordion: true,
      jsx: "onClick={(e) => toggleAccordion(e.currentTarget)}",
    };
  }
  const nextStep = trimmed.match(/^nextStep\((\d+)\)$/);
  if (nextStep) {
    return {
      needsConsultation: true,
      jsx: `onClick={() => nextStep(${nextStep[1]})}`,
    };
  }
  const filterJobs = trimmed.match(/^filterJobs\((['"])(.*)\1\)$/);
  if (filterJobs) {
    return {
      needsCareersFilter: true,
      jsx: `onClick={() => filterJobs(${JSON.stringify(filterJobs[2])})}`,
    };
  }
  return { jsx: null, raw: trimmed };
}

function buildJsxFromNode(node, ctx) {
  if (node.type === "text") {
    const text = node.data ?? "";
    if (!text.trim()) return "";
    return `{${JSON.stringify(text)}}`;
  }

  if (node.type !== "tag") return "";

  const tag = node.name;
  const attribs = { ...(node.attribs || {}) };

  if (tag === "a" && attribs.href?.startsWith("/")) {
    ctx.needsLink = true;
    const href = attribs.href;
    delete attribs.href;
    const attrs = formatAttrs(attribs, ctx, tag);
    const children = renderChildren(node, ctx);
    return `<Link href={${JSON.stringify(href)}}${attrs}>${children}</Link>`;
  }

  if (tag === "img" && attribs.src) {
    ctx.needsStitchImage = true;
    const src = attribs.src;
    const alt = attribs.alt || attribs["data-alt"] || "";
    const className = attribs.class || attribs.className;
    delete attribs.src;
    delete attribs.alt;
    delete attribs["data-alt"];
    delete attribs.class;
    const extra = className ? ` className={${JSON.stringify(className)}}` : "";
    return `<StitchImage src={${JSON.stringify(src)}} alt={${JSON.stringify(alt)}}${extra} />`;
  }

  let onClickJsx = "";
  if (attribs.onclick) {
    ctx.needsClient = true;
    const parsed = parseOnClickHandler(attribs.onclick);
    if (parsed.needsAccordion) ctx.needsAccordion = true;
    if (parsed.needsConsultation) ctx.needsConsultation = true;
    if (parsed.needsCareersFilter) ctx.needsCareersFilter = true;
    if (parsed.jsx) onClickJsx = parsed.jsx;
    delete attribs.onclick;
  }

  if (VOID_TAGS.has(tag)) {
    const attrs = formatAttrs(attribs, ctx, tag);
    const click = onClickJsx ? ` ${onClickJsx}` : "";
    return `<${tag}${attrs}${click} />`;
  }

  const attrs = formatAttrs(attribs, ctx, tag);
  const click = onClickJsx ? ` ${onClickJsx}` : "";
  const children = renderChildren(node, ctx);
  return `<${tag}${attrs}${click}>${children}</${tag}>`;
}

function formatAttrs(attribs, ctx, tag) {
  const parts = [];
  for (const [key, val] of Object.entries(attribs)) {
    if (key === "class") {
      parts.push(`className={${JSON.stringify(val)}}`);
      continue;
    }
    const jsxName = htmlAttrToJsx(key);
    if (key === "style") {
      parts.push(`style={${JSON.stringify(parseStyleString(val))}}`);
      continue;
    }
    const booleanAttrs = new Set([
      "open",
      "checked",
      "selected",
      "disabled",
      "multiple",
      "readonly",
      "required",
      "hidden",
      "default",
      "defer",
      "async",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
    ]);
    if (booleanAttrs.has(key) && (val === "" || val === key)) {
      parts.push(`${jsxName}={true}`);
      continue;
    }
    const numericAttrs = new Set([
      "rows",
      "cols",
      "colspan",
      "rowspan",
      "maxlength",
      "minlength",
      "size",
      "span",
      "start",
      "width",
      "height",
      "tabindex",
    ]);
    if (numericAttrs.has(key) && /^\d+$/.test(String(val))) {
      parts.push(`${jsxName}={${Number(val)}}`);
      continue;
    }
    if (val === "" && tag === "button") {
      parts.push(`${jsxName}`);
      continue;
    }
    parts.push(`${jsxName}={${JSON.stringify(val)}}`);
  }
  return parts.length ? ` ${parts.join(" ")}` : "";
}

function renderChildren(node, ctx) {
  if (!node.children?.length) return "";
  return node.children.map((c) => buildJsxFromNode(c, ctx)).join("");
}

function htmlFragmentToJsx(html) {
  const ctx = {
    needsLink: false,
    needsStitchImage: false,
    needsClient: false,
    needsAccordion: false,
    needsConsultation: false,
  };
  const $ = cheerio.load(`<wrapper>${html}</wrapper>`, { xml: false }, false);
  const rootEl = $("wrapper")[0];
  const inner = rootEl.children
    .map((c) => buildJsxFromNode(c, ctx))
    .join("");
  return { jsx: inner, ctx };
}

function sectionFileContent(componentName, jsx, ctx) {
  const imports = [];
  if (ctx.needsClient) imports.push('"use client";', "");
  if (ctx.needsLink) imports.push('import Link from "next/link";');
  if (ctx.needsStitchImage) {
    imports.push('import { StitchImage } from "@/components/ui/StitchImage";');
  }
  if (ctx.needsAccordion) {
    imports.push('import { toggleAccordion } from "@/lib/client/accordion";');
  }
  if (ctx.needsConsultation) {
    imports.push(
      'import { nextStep } from "@/components/pages/request-consultation/consultation-form";'
    );
  }
  if (ctx.needsCareersFilter) {
    imports.push('import { filterJobs } from "@/lib/client/careers-filters";');
  }

  return `${imports.join("\n")}${imports.length ? "\n\n" : ""}export function ${componentName}() {
  return (
    <>
${indentJsx(jsx, 6)}
    </>
  );
}
`;
}

function indentJsx(jsx, spaces) {
  const pad = " ".repeat(spaces);
  return jsx
    .split("\n")
    .map((line) => (line.trim() ? pad + line : line))
    .join("\n");
}

function pageContentFile(
  componentName,
  innerSections,
  outerSections,
  mainClassName
) {
  const allSections = [...innerSections, ...outerSections];
  const imports = allSections
    .map((n) => `import { ${n} } from "./sections/${n}";`)
    .join("\n");
  const mainAttr = mainClassName
    ? ` className={${JSON.stringify(mainClassName)}}`
    : "";
  const innerBody = innerSections.map((n) => `      <${n} />`).join("\n");
  const outerBody = outerSections.map((n) => `    <${n} />`).join("\n");

  let returnBody = "";
  if (innerSections.length) {
    returnBody += `    <main${mainAttr}>\n${innerBody}\n    </main>`;
  }
  if (outerSections.length) {
    if (returnBody) returnBody += "\n";
    returnBody += outerBody;
  }

  const wrapFragment = innerSections.length && outerSections.length;

  if (wrapFragment) {
    return `${imports}

export function ${componentName}() {
  return (
    <>
${returnBody}
    </>
  );
}
`;
  }

  return `${imports}

export function ${componentName}() {
  return (
${returnBody || "    null"}
  );
}
`;
}

function routePageFile(slug, title, componentName, contentExportName) {
  const pageTitle = title.split("|")[0].trim();
  const description = slugToDescription(title);
  const path = slug === "home" ? "/" : `/${slug}`;
  const keywords = slugToKeywords(slug);
  const pageFn = toComponentName(slug).replace("PageContent", "Page");

  return `import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ${contentExportName} } from "@/components/pages/${slug}/${contentExportName}";

export const metadata: Metadata = buildPageMetadata({
  title: ${JSON.stringify(pageTitle)},
  description: ${JSON.stringify(description)},
  path: ${JSON.stringify(path)},
  keywords: ${JSON.stringify(keywords)},
});

export default function ${pageFn}() {
  return <${contentExportName} />;
}
`;
}

function migrateSlug(slug, title) {
  const htmlPath = path.join(contentDir, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) {
    console.warn(`Skip ${slug}: no HTML`);
    return false;
  }

  const html = fs.readFileSync(htmlPath, "utf8");
  const $ = cheerio.load(html, { xml: false }, false);
  const main = $("main");
  const mainClass = main.attr("class") || undefined;

  const blocks = [];
  if (main.length) {
    main.children().each((_, el) => blocks.push({ outer: false, el }));
    const rootChildren = $.root().children().toArray();
    const mainEl = main[0];
    const mainIdx = rootChildren.indexOf(mainEl);
    for (let i = mainIdx + 1; i < rootChildren.length; i++) {
      const node = rootChildren[i];
      if (node.type === "tag") blocks.push({ outer: true, el: node });
    }
  } else {
    $.root()
      .children()
      .each((_, el) => blocks.push({ outer: false, el }));
  }

  if (!blocks.length) {
    console.warn(`Skip ${slug}: empty main`);
    return false;
  }

  const slugDir = path.join(pagesComponentsDir, slug);
  const sectionsDir = path.join(slugDir, "sections");
  if (fs.existsSync(sectionsDir)) {
    fs.rmSync(sectionsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(sectionsDir, { recursive: true });

  const usedNames = new Set();
  const innerSections = [];
  const outerSections = [];

  blocks.forEach((block, index) => {
    const outer = block.outer === true;
    const el = block.el ?? block;
    const fragment = $.html(el);
    const sectionName = inferSectionName(index, fragment, usedNames);
    const { jsx, ctx } = htmlFragmentToJsx(fragment);
    const file = sectionFileContent(sectionName, jsx, ctx);
    fs.writeFileSync(path.join(sectionsDir, `${sectionName}.tsx`), file, "utf8");
    if (outer) outerSections.push(sectionName);
    else innerSections.push(sectionName);
  });

  const contentExportName = toComponentName(slug);
  fs.writeFileSync(
    path.join(slugDir, `${contentExportName}.tsx`),
    pageContentFile(contentExportName, innerSections, outerSections, mainClass),
    "utf8"
  );

  const routeDir =
    slug === "home"
      ? path.join(appDir, "(home)")
      : path.join(appDir, "(main)", slug);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(
    path.join(routeDir, "page.tsx"),
    routePageFile(slug, title, toComponentName(slug).replace("PageContent", "Page"), contentExportName),
    "utf8"
  );

  return true;
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  let ok = 0;
  for (const entry of manifest) {
    if (migrateSlug(entry.slug, entry.title)) {
      console.log(`Migrated ${entry.slug}`);
      ok++;
    }
  }
  console.log(`\nMigrated ${ok} pages to TSX components.`);
}

main();
