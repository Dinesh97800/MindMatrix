import fs from "node:fs";
import path from "node:path";

const APP_ROOT = path.join(process.cwd(), "src", "app");

function slugFromPageFile(filePath: string, group: string): string | null {
  const relative = path.relative(path.join(APP_ROOT, group), filePath);
  const parts = relative.split(path.sep).filter(Boolean);
  if (parts[parts.length - 1] !== "page.tsx") return null;
  parts.pop();
  if (parts.length === 0) return group === "(home)" ? "home" : null;
  return parts.join("/");
}

function walk(dir: string, group: string, slugs: Set<string>) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, group, slugs);
      continue;
    }
    if (entry.name === "page.tsx") {
      const slug = slugFromPageFile(full, group);
      if (slug) slugs.add(slug);
    }
  }
}

/** All public page slugs discovered from the App Router filesystem. */
export function discoverPublicRouteSlugs(): string[] {
  const slugs = new Set<string>();
  walk(path.join(APP_ROOT, "(main)"), "(main)", slugs);
  walk(path.join(APP_ROOT, "(home)"), "(home)", slugs);
  return [...slugs].sort((a, b) => a.localeCompare(b));
}

export function slugToPublicPath(slug: string): string {
  return slug === "home" ? "/" : `/${slug}`;
}
