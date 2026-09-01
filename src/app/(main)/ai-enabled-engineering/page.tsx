import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AiEnabledEngineeringPageContent } from "@/components/pages/ai-enabled-engineering/AiEnabledEngineeringPageContent";

export const metadata: Metadata = pageMetadata("/ai-enabled-engineering");

export default function AiEnabledEngineeringPage() {
  return <AiEnabledEngineeringPageContent />;
}
