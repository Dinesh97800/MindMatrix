import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AiEnabledEngineeringPageContent } from "@/components/pages/ai-enabled-engineering/AiEnabledEngineeringPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "AI-enabled Engineering",
  description: "Mind Matrix AI-enabled Engineering — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/ai-enabled-engineering",
  keywords: ["mind matrix","embedded systems","ai","enabled","engineering"],
});

export default function AiEnabledEngineeringPage() {
  return <AiEnabledEngineeringPageContent />;
}
