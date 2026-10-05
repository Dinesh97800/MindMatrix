import { IndexPageLayout } from "@/components/pages/shared/IndexPageLayout";
import { siteContent } from "@/config/site-content";

export function TechnologiesPageContent() {
  return <IndexPageLayout pageKey="technologies" items={siteContent.technologies} />;
}
