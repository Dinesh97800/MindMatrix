const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const ALLOWED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export function getExtensionFromMime(mimeType: string): string | null {
  return MIME_TO_EXT[mimeType.toLowerCase()] ?? null;
}

export function validateImageUpload(file: File, maxBytes: number) {
  const mimeType = file.type.toLowerCase();
  const extension = pathExtension(file.name).toLowerCase();

  if (!ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) {
    return { ok: false as const, error: "Unsupported image type. Allowed: JPG, PNG, WebP." };
  }

  if (!ALLOWED_IMAGE_EXTENSIONS.has(extension)) {
    return { ok: false as const, error: "Unsupported file extension." };
  }

  if (file.size <= 0) {
    return { ok: false as const, error: "Empty file." };
  }

  if (file.size > maxBytes) {
    return {
      ok: false as const,
      error: `File exceeds maximum size of ${Math.round(maxBytes / (1024 * 1024))} MB.`,
    };
  }

  return { ok: true as const, mimeType, extension };
}

function pathExtension(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot >= 0 ? filename.slice(dot) : "";
}

export async function inspectImageBuffer(buffer: Buffer) {
  try {
    const sharp = (await import("sharp")).default;
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      return { ok: false as const, error: "Invalid image file." };
    }

    return {
      ok: true as const,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    };
  } catch {
    return { ok: false as const, error: "Unable to read image file." };
  }
}

export async function optimizeImageBuffer(buffer: Buffer, mimeType: string) {
  const sharp = (await import("sharp")).default;
  const image = sharp(buffer, { failOn: "error" }).rotate();

  if (mimeType === "image/png") {
    return image.png({ compressionLevel: 9 }).toBuffer();
  }

  if (mimeType === "image/webp") {
    return image.webp({ quality: 85 }).toBuffer();
  }

  return image.jpeg({ quality: 85, mozjpeg: true }).toBuffer();
}
