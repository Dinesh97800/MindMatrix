import fs from "node:fs";
import path from "node:path";
import { heroPageConfigs } from "@/config/hero-pages";
import { HERO_IMAGES } from "@/config/hero-content";
import { getHeroAsset } from "@/config/hero-images";

export type LegacyMediaSpec = {
  sourceKey: string;
  publicPath: string;
  storagePath: string;
  originalFilename: string;
  mimeType: string;
  altText?: string;
  source: string;
};

const IMAGE_EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg"]);

function mimeForExt(ext: string): string {
  switch (ext.toLowerCase()) {
    case ".webp":
      return "image/webp";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

function walkPublicImages(dir: string, basePublic = ""): LegacyMediaSpec[] {
  const results: LegacyMediaSpec[] = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const publicPath = `${basePublic}/${entry.name}`.replace(/\\/g, "/");

    if (entry.isDirectory()) {
      results.push(...walkPublicImages(full, publicPath));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) continue;

    const normalizedPublic = publicPath.startsWith("/") ? publicPath : `/${publicPath}`;
    results.push({
      sourceKey: `public:${normalizedPublic}`,
      publicPath: normalizedPublic,
      storagePath: `legacy/public${normalizedPublic}`,
      originalFilename: entry.name,
      mimeType: mimeForExt(ext),
      source: "public/",
    });
  }

  return results;
}

function collectReferencedPublicPaths(): LegacyMediaSpec[] {
  const paths = new Set<string>();

  for (const value of Object.values(HERO_IMAGES)) {
    if (typeof value === "string" && value.startsWith("/")) paths.add(value);
  }

  for (const config of Object.values(heroPageConfigs)) {
    if (config.image?.startsWith("/")) paths.add(config.image);
  }

  for (const slug of Object.keys(heroPageConfigs)) {
    const asset = getHeroAsset(slug);
    if (asset.image.startsWith("/")) paths.add(asset.image);
  }

  return [...paths].map((publicPath) => {
    const filename = path.basename(publicPath);
    const ext = path.extname(filename);
    return {
      sourceKey: `public:${publicPath}`,
      publicPath,
      storagePath: `legacy/public${publicPath}`,
      originalFilename: filename,
      mimeType: mimeForExt(ext),
      source: "hero-pages.ts|hero-content.ts",
    };
  });
}

/** Discover local repository images for CMS media records (reference-only, no file copy). */
export function discoverLegacyMedia(): LegacyMediaSpec[] {
  const publicRoot = path.join(process.cwd(), "public");
  const fromDisk = walkPublicImages(publicRoot);
  const fromRefs = collectReferencedPublicPaths();

  const byKey = new Map<string, LegacyMediaSpec>();
  for (const item of [...fromDisk, ...fromRefs]) {
    byKey.set(item.sourceKey, item);
  }

  return [...byKey.values()].sort((a, b) => a.sourceKey.localeCompare(b.sourceKey));
}

export function isRemoteMediaUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
