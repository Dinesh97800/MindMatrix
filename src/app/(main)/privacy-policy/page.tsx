import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Mind Matrix Privacy Policy — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/privacy-policy",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/privacy-policy.html"),
    "utf8"
  );
}

export default function PrivacyPolicyPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
