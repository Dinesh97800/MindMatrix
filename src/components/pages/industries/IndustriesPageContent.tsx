import { IndexPageLayout } from "@/components/pages/shared/IndexPageLayout";
import { siteContent } from "@/config/site-content";

export function IndustriesPageContent() {
  return <IndexPageLayout pageKey="industries" items={siteContent.industries} />;
}
