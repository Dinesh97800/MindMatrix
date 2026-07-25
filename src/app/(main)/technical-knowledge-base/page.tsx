import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TechnicalKnowledgeBasePageContent } from "@/components/pages/technical-knowledge-base/TechnicalKnowledgeBasePageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Technical Knowledge Base",
  description: "Mind Matrix Technical Knowledge Base — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/technical-knowledge-base",
  keywords: ["mind matrix","embedded systems","technical","knowledge","base"],
});

export default function TechnicalKnowledgeBasePage() {
  return <TechnicalKnowledgeBasePageContent />;
}
