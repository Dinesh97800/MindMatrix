/**
 * Scans PageContent components and section TSX files to build legacy section content data.
 * Output: src/lib/cms/migration/data/legacy-section-content.generated.ts
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "src", "components", "pages");
const OUT_FILE = path.join(
  ROOT,
  "src",
  "lib",
  "cms",
  "migration",
  "data",
  "legacy-section-content.generated.ts"
);

function walkPageContentFiles(dir, base = "") {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkPageContentFiles(full, rel));
      continue;
    }
    if (entry.name.endsWith("PageContent.tsx")) {
      results.push({ full, rel });
    }
  }
  return results;
}

function slugFromPath(rel) {
  const parts = rel.split("/");
  parts.pop();
  return parts.join("/") || "home";
}

function resolveModulePath(importPath, fromDir) {
  let resolved = importPath;
  if (importPath.startsWith("@/")) {
    resolved = path.join("src", importPath.slice(2));
  } else if (importPath.startsWith(".")) {
    resolved = path.resolve(fromDir, importPath);
  } else {
    resolved = path.join(ROOT, importPath);
  }

  if (path.extname(resolved)) {
    return fs.existsSync(resolved) ? resolved : null;
  }

  for (const suffix of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
    const candidate = resolved.endsWith(suffix)
      ? resolved
      : `${resolved}${suffix}`;
    if (fs.existsSync(candidate)) return candidate;
  }

  return null;
}

function readModuleSource(importPath, fromDir) {
  const resolved = resolveModulePath(importPath, fromDir);
  if (!resolved) return "";
  return fs.readFileSync(resolved, "utf8");
}

function parsePageContent(filePath, slug) {
  const source = fs.readFileSync(filePath, "utf8");
  const sections = [];
  const dir = path.dirname(filePath);

  const importMap = new Map();
  for (const match of source.matchAll(/import\s+\{\s*([^}]+)\s*\}\s+from\s+["']([^"']+)["']/g)) {
    const names = match[1].split(",").map((n) => n.trim().split(/\s+as\s+/).pop().trim());
    const importPath = match[2];
    for (const name of names) {
      if (!name || name === "ApprovedPageLayout" || name === "IndexPageLayout") continue;
      importMap.set(name, importPath);
    }
  }

  if (source.includes("ApprovedPageLayout")) {
    const keyMatch = source.match(/pageKey=["']([^"']+)["']/);
    return {
      slug,
      layout: "approved",
      pageKey: keyMatch?.[1] ?? slug,
      sections: [],
    };
  }

  if (source.includes("IndexPageLayout")) {
    const keyMatch = source.match(/pageKey=["']([^"']+)["']/);
    return {
      slug,
      layout: "index",
      pageKey: keyMatch?.[1] ?? slug,
      sections: [],
    };
  }

  if (source.includes("<ConfiguredHero")) {
    sections.push({ componentKey: "ConfiguredHero", sourceFile: "hero-pages.ts", order: sections.length });
  }

  const jsxPattern = /<([A-Z][A-Za-z0-9]+)\s*\/?>/g;
  let match;
  while ((match = jsxPattern.exec(source)) !== null) {
    const name = match[1];
    if (name === "main" || name === "Link" || name === "StitchImage") continue;
    if (name === "ConfiguredHero") continue;
    const importPath = importMap.get(name);
    const resolved = importPath ? resolveModulePath(importPath, dir) : null;
    sections.push({
      componentKey: name,
      sourceFile: resolved
        ? path.relative(ROOT, resolved).replace(/\\/g, "/")
        : importPath ?? name,
      order: sections.length,
    });
  }

  return { slug, layout: "custom", sections };
}

function extractJsxStrings(content) {
  const strings = [];
  const patterns = [
    /\{"((?:\\.|[^"\\])*)"\}/g,
    /\{'((?:\\.|[^'\\])*)'\}/g,
    /\{[\s\n]*"((?:\\.|[^"\\])*)"[\s\n]*\}/g,
    /\{[\s\n]*'((?:\\.|[^'\\])*)'[\s\n]*\}/g,
    /title:\s*"((?:\\.|[^"\\])*)"/g,
    /description:\s*"((?:\\.|[^"\\])*)"/g,
    /label:\s*"((?:\\.|[^"\\])*)"/g,
    /question:\s*"((?:\\.|[^"\\])*)"/g,
    /answer:\s*"((?:\\.|[^"\\])*)"/g,
    /eyebrow:\s*"((?:\\.|[^"\\])*)"/g,
    /headline:\s*"((?:\\.|[^"\\])*)"/g,
    /href:\s*"((?:\\.|[^"\\])*)"/g,
    /href=\{?"((?:\\.|[^"\\])*)"/g,
    /data-alt=\{?"((?:\\.|[^"\\])*)"/g,
    /backgroundImage:\s*[`'"]url\(['"]?([^'"`)]+)/g,
    /url\(['"]?([^'"`)]+)/g,
  ];

  for (const pattern of patterns) {
    for (const m of content.matchAll(pattern)) {
      const text = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\'/g, "'").trim();
      if (text.length > 1 && !text.startsWith("material-symbols") && !text.includes("fontVariationSettings")) {
        strings.push(text);
      }
    }
  }

  for (const m of content.matchAll(/>([^<{][^<]*?)</g)) {
    const text = m[1].replace(/\s+/g, " ").trim();
    if (
      text.length > 2 &&
      !text.startsWith("className") &&
      !/^[\d\s./:-]+$/.test(text) &&
      !text.includes("material-symbols")
    ) {
      strings.push(text);
    }
  }

  return [...new Set(strings)];
}

function extractObjectArrays(content) {
  const arrays = [];
  const arrayPattern = /const\s+(\w+)\s*=\s*(\[[\s\S]*?\])(?:\s*as\s+const)?;/g;
  for (const m of content.matchAll(arrayPattern)) {
    try {
      const evaluated = Function(`"use strict"; return (${m[2]});`)();
      if (Array.isArray(evaluated)) arrays.push({ name: m[1], items: evaluated });
    } catch {
      // skip unparseable arrays
    }
  }
  return arrays;
}

function extractImages(content) {
  const images = [];
  for (const m of content.matchAll(/src=\{?\s*["'`]([^"'`]+)["'`]/g)) {
    images.push(m[1]);
  }
  for (const m of content.matchAll(/backgroundImage:\s*[`'"]url\(['"]?([^'"`)]+)/g)) {
    images.push(m[1]);
  }
  for (const m of content.matchAll(/url\(['"]?(\/[^'"`)]+)/g)) {
    images.push(m[1]);
  }
  return [...new Set(images)];
}

function extractLinks(content) {
  const links = [];
  for (const m of content.matchAll(/href=\{?\s*["'`]([^"'`]+)["'`]/g)) {
    links.push({ label: "", href: m[1] });
  }
  for (const m of content.matchAll(/href:\s*["'`]([^"'`]+)["'`]/g)) {
    links.push({ label: "", href: m[1] });
  }
  return links;
}

function buildContentBlock(componentKey, sourceFile, fileContent) {
  const strings = extractJsxStrings(fileContent);
  const arrays = extractObjectArrays(fileContent);
  const images = extractImages(fileContent);
  const links = extractLinks(fileContent);

  const headingCandidates = strings.filter((s) => s.length > 3 && s.length < 120);
  const title =
    headingCandidates.find((s) => /^[A-Z]/.test(s) && !s.startsWith("http")) ??
    headingCandidates[0] ??
    "";
  const description =
    strings.find((s) => s.length > 40 && s !== title) ??
    strings.find((s) => s.length > 20 && s !== title) ??
    "";

  const cards =
    arrays.find((a) => /card|service|logo|step|stat|faq|study/i.test(a.name))?.items ??
    arrays[0]?.items ??
    [];

  const items = arrays.flatMap((a) =>
    a.items.map((item) =>
      typeof item === "string" ? item : typeof item === "object" && item ? item : String(item)
    )
  );

  return {
    componentKey,
    sourceFile,
    title,
    description,
    strings,
    items,
    cards,
    images,
    links,
  };
}

const pageFiles = walkPageContentFiles(PAGES_DIR);
const inventory = [];
const contentByKey = {};

for (const { full, rel } of pageFiles) {
  const slug = slugFromPath(rel);
  const parsed = parsePageContent(full, slug);
  inventory.push(parsed);

  for (const section of parsed.sections) {
    const sourceKey = `${slug}::${section.componentKey}`;
    let fileContent = "";
    if (section.sourceFile === "hero-pages.ts") {
      fileContent = fs.readFileSync(path.join(ROOT, "src/config/hero-pages.ts"), "utf8");
    } else if (section.sourceFile.endsWith(".tsx") || section.sourceFile.endsWith(".ts")) {
      const abs = path.join(ROOT, section.sourceFile);
      if (fs.existsSync(abs)) fileContent = fs.readFileSync(abs, "utf8");
    } else {
      const dir = path.dirname(full);
      const importPath = [...full.matchAll(/import[\s\S]*?from\s+["']([^"']+)["']/g)]
        .map((m) => m[1])
        .find((p) => p.includes(section.componentKey.replace("Section", "").toLowerCase()));
      if (importPath) fileContent = readModuleSource(importPath, dir);
    }

    contentByKey[sourceKey] = buildContentBlock(section.componentKey, section.sourceFile, fileContent);
  }
}

const header = `/** AUTO-GENERATED by scripts/generate-legacy-section-content.mjs — do not edit manually */\n\n`;
const body = `export const LEGACY_PAGE_INVENTORY = ${JSON.stringify(inventory, null, 2)} as const;\n\nexport type LegacyPageInventoryEntry = (typeof LEGACY_PAGE_INVENTORY)[number];\n\nexport type LegacySectionInventoryEntry = LegacyPageInventoryEntry extends { sections: infer S }
  ? S extends readonly (infer U)[]
    ? U
    : never
  : never;\n\nexport const LEGACY_SECTION_CONTENT: Record<string, {
  componentKey: string;
  sourceFile: string;
  title: string;
  description: string;
  strings: string[];
  items: unknown[];
  cards: unknown[];
  images: string[];
  links: Array<{ label: string; href: string }>;
}> = ${JSON.stringify(contentByKey, null, 2)};\n`;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, header + body);
console.log(
  `Generated ${Object.keys(contentByKey).length} section content entries for ${inventory.length} pages.`
);
