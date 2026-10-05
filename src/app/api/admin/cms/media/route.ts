import fs from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { Op } from "sequelize";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { findMediaUsage } from "@/lib/cms/validation";
import {
  inspectImageBuffer,
  optimizeImageBuffer,
  validateImageUpload,
} from "@/lib/cms/media-validation";
import { serializeMedia } from "@/lib/cms/serializers";
import {
  buildSafeStoredFilename,
  ensureCmsUploadDirs,
  getMaxUploadBytes,
  getMediaPublicUrl,
  resolveStoragePath,
} from "@/lib/cms/storage";
import { getDbModels } from "@/lib/db/models";

export async function GET(request: NextRequest) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Media } = getDbModels();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 24)));
  const offset = (page - 1) * limit;

  const where = q
    ? {
        [Op.or]: [
          { filename: { [Op.like]: `%${q}%` } },
          { originalFilename: { [Op.like]: `%${q}%` } },
          { altText: { [Op.like]: `%${q}%` } },
        ],
      }
    : {};

  const { rows, count } = await Media.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return cmsOk({
    media: rows.map(serializeMedia),
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  ensureCmsUploadDirs();

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return cmsError("Image file is required.");
  }

  const maxBytes = getMaxUploadBytes();
  const validation = validateImageUpload(file, maxBytes);
  if (!validation.ok) return cmsError(validation.error);

  const buffer = Buffer.from(await file.arrayBuffer());
  const inspection = await inspectImageBuffer(buffer);
  if (!inspection.ok) return cmsError(inspection.error);

  let outputBuffer: Buffer = Buffer.from(buffer);
  let mimeType = validation.mimeType;
  let extension = validation.extension;

  try {
    outputBuffer = Buffer.from(await optimizeImageBuffer(buffer, mimeType));
    if (mimeType !== "image/png") {
      mimeType = "image/jpeg";
      extension = ".jpg";
    }
  } catch {
    outputBuffer = buffer;
  }

  const storedFilename = buildSafeStoredFilename(file.name, extension);
  const relativePath = path.join("images", storedFilename);
  const absolutePath = resolveStoragePath(relativePath);

  await fs.writeFile(absolutePath, outputBuffer, { mode: 0o640 });

  const { Media } = getDbModels();
  const altText = formData.get("altText")?.toString().trim() || null;
  const caption = formData.get("caption")?.toString().trim() || null;

  const media = await Media.create({
    filename: storedFilename,
    originalFilename: file.name,
    mimeType,
    fileSize: outputBuffer.length,
    width: inspection.width,
    height: inspection.height,
    altText,
    caption,
    storagePath: relativePath.replace(/\\/g, "/"),
    publicUrl: getMediaPublicUrl(0),
    uploadedBy: Number(session!.user.id),
  });

  media.publicUrl = getMediaPublicUrl(media.id);
  await media.save();

  return cmsOk({ media: serializeMedia(media) }, 201);
}
