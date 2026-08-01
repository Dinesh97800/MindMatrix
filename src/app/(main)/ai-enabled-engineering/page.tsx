import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AiEnabledEngineeringPageContent } from "@/components/pages/ai-enabled-engineering/AiEnabledEngineeringPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Solutions",
  description:
    "Edge AI, intelligent automation, and custom AI solutions from Mind Matrix Workspace — combining AI with embedded systems, IoT, industrial data, and customer knowledge for practical engineering applications.",
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
