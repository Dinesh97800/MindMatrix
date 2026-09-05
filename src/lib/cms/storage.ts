import fs from "node:fs";
import path from "node:path";

const DEFAULT_VPS_UPLOAD_ROOT = "/var/www/mindmatrix/uploads/cms";

export function getCmsUploadRoot(): string {
  if (process.env.CMS_UPLOAD_DIR) {
    return path.resolve(process.env.CMS_UPLOAD_DIR);
  }

  if (process.platform === "win32") {
    return path.resolve(process.cwd(), "..", "uploads", "cms");
  }

  return DEFAULT_VPS_UPLOAD_ROOT;
}

export function getCmsImagesDir(): string {
  return path.join(getCmsUploadRoot(), "images");
}

export function getCmsDocumentsDir(): string {
  return path.join(getCmsUploadRoot(), "documents");
}

export function ensureCmsUploadDirs() {
  for (const dir of [getCmsUploadRoot(), getCmsImagesDir(), getCmsDocumentsDir()]) {
    fs.mkdirSync(dir, { recursive: true, mode: 0o750 });
  }
}

export function getMediaPublicUrl(mediaId: number): string {
  const base = process.env.CMS_MEDIA_PUBLIC_BASE?.replace(/\/$/, "") ?? "/api/cms/media";
  return `${base}/${mediaId}`;
}

export function getMaxUploadBytes(): number {
  const configured = Number(process.env.CMS_MAX_UPLOAD_BYTES);
  if (Number.isFinite(configured) && configured > 0) {
    return configured;
  }
  return 10 * 1024 * 1024;
}

export function slugifyFilename(input: string): string {
  return input
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function buildSafeStoredFilename(originalName: string, ext: string): string {
  const base = slugifyFilename(originalName) || "upload";
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${base}-${unique}${ext}`;
}

export function resolveStoragePath(relativePath: string): string {
  const root = path.resolve(getCmsUploadRoot());
  const resolved = path.resolve(root, relativePath);

  if (!resolved.startsWith(root + path.sep) && resolved !== root) {
    throw new Error("Invalid storage path");
  }

  return resolved;
}
