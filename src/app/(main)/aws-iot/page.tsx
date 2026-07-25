import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AWS IoT",
  description: "Mind Matrix AWS IoT — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/aws-iot",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/aws-iot.html"),
    "utf8"
  );
}

export default function AwsIotPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
