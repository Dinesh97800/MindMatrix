import fs from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { resolveStoragePath } from "@/lib/cms/storage";
import { getDbModels } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  await ensureCmsDatabaseReady();
  const { Media } = getDbModels();
  const id = Number((await context.params).id);

  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid media id." }, { status: 400 });
  }

  const media = await Media.findByPk(id);
  if (!media) {
    return NextResponse.json({ error: "Media not found." }, { status: 404 });
  }

  const candidates: string[] = [];
  try {
    candidates.push(resolveStoragePath(media.storagePath));
  } catch {
    // Invalid stored upload path; try the public URL next.
  }

  if (media.publicUrl?.startsWith("/")) {
    const publicRoot = path.resolve(process.cwd(), "public");
    const publicFile = path.resolve(publicRoot, media.publicUrl.replace(/^\/+/, ""));
    if (publicFile.startsWith(publicRoot + path.sep)) {
      candidates.push(publicFile);
    }
  }

  for (const absolutePath of candidates) {
    try {
      const file = await fs.readFile(absolutePath);
      return new NextResponse(file, {
        status: 200,
        headers: {
          "Content-Type": media.mimeType,
          "Content-Length": String(file.length),
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Disposition": `inline; filename="${media.filename}"`,
        },
      });
    } catch {
      // try next candidate
    }
  }

  return NextResponse.json({ error: "Media file missing." }, { status: 404 });
}
