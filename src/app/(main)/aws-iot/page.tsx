import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AwsIotPageContent } from "@/components/pages/aws-iot/AwsIotPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "AWS IoT",
  description: "Mind Matrix AWS IoT — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/aws-iot",
  keywords: ["mind matrix","embedded systems","aws","iot"],
});

export default function AwsIotPage() {
  return <AwsIotPageContent />;
}
