import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AiEnabledEngineeringPageContent } from "@/components/pages/ai-enabled-engineering/AiEnabledEngineeringPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Solutions",
  description:
    "AI-assisted engineering tools and embedded/industrial AI prototypes may be offered where appropriate to the application.",
  path: "/ai-enabled-engineering",
  keywords: [
    "mind matrix",
    "edge ai",
    "intelligent automation",
    "custom ai solutions",
    "embedded ai",
    "industrial ai",
    "agentic ai",
    "rag",
    "tinyml",
    "engineering automation",
  ],
});

export default function AiEnabledEngineeringPage() {
  return <AiEnabledEngineeringPageContent />;
}
