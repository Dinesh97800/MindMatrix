import {
  CANONICAL_MODELS,
  type CanonicalModel,
  type CanonicalPageManifest,
  type CanonicalSection,
} from "./types";

const IMPLEMENTATION_LEAK_PATTERNS = [
  /className\s*=/i,
  /^(?:(?:sm:|md:|lg:|xl:)?(?:px|py|mx|my|bg|text|grid|flex|rounded|border)-[\w\[\]/.-]+\s*){2,}$/,
  /<\/?[A-Za-z][^>]*>/,
  /\{\s*[A-Za-z_$][\w$]*(?:\.[\w$]+)*(?:\.map)?\s*\(/,
  /fontVariationSettings/i,
  /material-symbols/i,
  /<svg|<path|viewBox=/i,
];

const REQUIRED_CONTENT: Record<CanonicalModel, readonly string[]> = {
  HERO: ["title"],
  CONTENT: ["title|body|paragraphs|items"],
  CARDS: ["title|heading|cards|items"],
  MEDIA: ["title|heading", "media|image|imageUrl"],
  METRICS: ["items"],
  PROCESS: ["title|heading", "steps|items"],
  ARCH: ["title|heading", "nodes|items"],
  TABLE: ["title|heading", "columns", "rows"],
  LOGOS: ["items"],
  CTA: ["title", "actions|buttonText"],
  FAQ: ["items|faqs"],
  LISTING: ["entityType|items|references"],
  ARTICLE: ["title|sections|body"],
  FORM: ["formKey"],
  CONTACT: ["addresses|email|locations|map"],
  NAV: ["items|taxonomy|mode"],
  UTILITY: [],
};

function hasAlternative(content: Record<string, unknown>, expression: string): boolean {
  return expression.split("|").some((key) => {
    const value = content[key];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim().length > 0;
    return value !== null && value !== undefined;
  });
}

function scanImplementationLeaks(
  value: unknown,
  path: string,
  issues: string[]
): void {
  if (typeof value === "string") {
    for (const pattern of IMPLEMENTATION_LEAK_PATTERNS) {
      if (pattern.test(value)) {
        issues.push(`${path}: editable content contains implementation-like text`);
        break;
      }
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      scanImplementationLeaks(item, `${path}[${index}]`, issues)
    );
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      // A source section can intentionally present a code sample as editorial
      // content. It is distinct from JSX, CSS classes, or component props.
      if (key === "codeSnippet") continue;
      scanImplementationLeaks(child, `${path}.${key}`, issues);
    }
  }
}

export function validateCanonicalSection(section: CanonicalSection): string[] {
  const issues: string[] = [];
  if (!section.stableKey.trim()) issues.push("stableKey is required");
  if (!CANONICAL_MODELS.includes(section.model)) issues.push("unknown canonical model");
  if (!section.template.trim()) issues.push("template is required");
  if (!section.source.component.trim()) issues.push("source component is required");
  if (section.model === "UTILITY") {
    if (Object.keys(section.content).length > 0) {
      issues.push("UTILITY must not contain editable content");
    }
    return issues;
  }
  if (section.status === "MISSING_SOURCE") {
    issues.push(`missing structured source data: ${(section.missingData ?? []).join(", ")}`);
    return issues;
  }
  for (const requirement of REQUIRED_CONTENT[section.model]) {
    if (!hasAlternative(section.content, requirement)) {
      issues.push(`content requires ${requirement}`);
    }
  }
  scanImplementationLeaks(section.content, section.stableKey, issues);
  return issues;
}

export function validateCanonicalPage(page: CanonicalPageManifest): string[] {
  const issues: string[] = [];
  if (page.classification === "redirect" && page.publishable) {
    issues.push("redirect route cannot be publishable");
  }
  if (page.classification === "active" && !page.publishable) {
    issues.push("active route must be publishable");
  }
  if (page.classification === "active" && page.sections.length === 0) {
    issues.push("active route has no canonical sections");
  }
  const seen = new Set<string>();
  for (const section of page.sections) {
    if (seen.has(section.stableKey)) {
      issues.push(`duplicate stableKey: ${section.stableKey}`);
    }
    seen.add(section.stableKey);
    issues.push(
      ...validateCanonicalSection(section).map(
        (issue) => `${section.stableKey}: ${issue}`
      )
    );
  }
  return issues;
}
