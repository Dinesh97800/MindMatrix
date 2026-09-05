import fs from "node:fs/promises";
import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { findMediaUsage } from "@/lib/cms/validation";
import { serializeMedia } from "@/lib/cms/serializers";
import { resolveStoragePath } from "@/lib/cms/storage";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Media } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid media id.");

  const media = await Media.findByPk(id);
  if (!media) return cmsError("Media not found.", 404);

  return cmsOk({ media: serializeMedia(media) });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Media } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid media id.");

  const media = await Media.findByPk(id);
  if (!media) return cmsError("Media not found.", 404);

  const body = await request.json();

  if (body.altText !== undefined) {
    media.altText = body.altText ? String(body.altText).trim() : null;
  }
  if (body.caption !== undefined) {
    media.caption = body.caption ? String(body.caption).trim() : null;
  }

  await media.save();
  return cmsOk({ media: serializeMedia(media) });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { Media } = getDbModels();
  const id = Number((await context.params).id);
  if (!Number.isFinite(id)) return cmsError("Invalid media id.");

  const media = await Media.findByPk(id);
  if (!media) return cmsError("Media not found.", 404);

  const force = new URL(request.url).searchParams.get("force") === "true";
  const usage = await findMediaUsage(id);

  if (usage.length > 0 && !force) {
    return cmsOk(
      {
        error: "Media is in use.",
        usage,
        message: `This image is currently used by ${usage.length} item(s).`,
      },
      409
    );
  }

  try {
    const absolutePath = resolveStoragePath(media.storagePath);
    await fs.unlink(absolutePath);
  } catch {
    // File may already be missing; continue with DB cleanup.
  }

  await media.destroy();
  return cmsOk({ success: true, usage: force ? usage : [] });
}
