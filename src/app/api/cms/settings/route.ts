import { cmsOk } from "@/lib/api/cms-auth";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { serializeSiteSetting } from "@/lib/cms/serializers";
import { getDbModels } from "@/lib/db/models";

/**
 * Public read-only CMS settings API.
 * NOT wired to existing company.ts / site-content.ts during Phase 2.
 */
export async function GET() {
  await ensureCmsDatabaseReady();
  const { SiteSetting } = getDbModels();

  const settings = await SiteSetting.findAll({
    order: [
      ["group", "ASC"],
      ["key", "ASC"],
    ],
  });

  const grouped: Record<string, ReturnType<typeof serializeSiteSetting>[]> = {};
  for (const setting of settings) {
    const serialized = serializeSiteSetting(setting);
    grouped[serialized.group] = grouped[serialized.group] ?? [];
    grouped[serialized.group].push(serialized);
  }

  return cmsOk({ settings: grouped });
}
