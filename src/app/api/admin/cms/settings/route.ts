import { NextRequest } from "next/server";
import { cmsError, cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializeSiteSetting } from "@/lib/cms/serializers";
import type { SiteSettingGroup } from "@/lib/db/models/SiteSetting";
import { getDbModels } from "@/lib/db/models";

const ALLOWED_GROUPS = new Set<SiteSettingGroup>([
  "general",
  "company",
  "contact",
  "social",
  "seo",
  "footer",
]);

export async function GET(request: NextRequest) {
  const { error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { SiteSetting } = getDbModels();
  const group = request.nextUrl.searchParams.get("group");

  const where = group ? { group } : undefined;
  const settings = await SiteSetting.findAll({
    where,
    order: [
      ["group", "ASC"],
      ["key", "ASC"],
    ],
  });

  const grouped = settings.reduce<Record<string, ReturnType<typeof serializeSiteSetting>[]>>(
    (acc, setting) => {
      const serialized = serializeSiteSetting(setting);
      acc[setting.group] = acc[setting.group] ?? [];
      acc[setting.group].push(serialized);
      return acc;
    },
    {}
  );

  return cmsOk({ settings: grouped });
}

export async function PATCH(request: NextRequest) {
  const { session, error } = await requireCmsAccess();
  if (error) return error;

  await ensureCmsDatabaseReady();
  const { SiteSetting } = getDbModels();
  const body = await request.json();
  const entries = Array.isArray(body.settings) ? body.settings : [];

  if (entries.length === 0) {
    return cmsError("No settings provided.");
  }

  const saved = [];

  for (const entry of entries) {
    const group = String(entry.group ?? "").trim() as SiteSettingGroup;
    const key = String(entry.key ?? "").trim();
    const value = entry.value;

    if (!ALLOWED_GROUPS.has(group)) {
      return cmsError(`Invalid settings group: ${group}`);
    }
    if (!key) return cmsError("Setting key is required.");

    const [setting] = await SiteSetting.upsert(
      {
        group,
        key,
        value,
        updatedBy: Number(session!.user.id),
        updatedAt: new Date(),
      },
      { returning: true }
    );

    saved.push(serializeSiteSetting(setting));
  }

  return cmsOk({ settings: saved });
}
