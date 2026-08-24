import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AiEnabledEngineeringPageContent } from "@/components/pages/ai-enabled-engineering/AiEnabledEngineeringPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "AI-enabled Engineering",
  description:
    "Mind Matrix AI-enabled Engineering — Edge AI and intelligent embedded-system development for industrial applications.",
  path: "/ai-enabled-engineering",
  keywords: ["mind matrix", "embedded systems", "edge ai", "iot", "ai-enabled engineering"],
});

export default function AiEnabledEngineeringPage() {
  return <AiEnabledEngineeringPageContent />;
}
