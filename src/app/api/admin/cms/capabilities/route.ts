import { cmsOk, requireCmsAccess } from "@/lib/api/cms-auth";
import { CMS_CAPABILITIES } from "@/lib/cms/capabilities";

export async function GET() {
  const { error } = await requireCmsAccess();
  if (error) return error;

  return cmsOk({ capabilities: CMS_CAPABILITIES });
}
