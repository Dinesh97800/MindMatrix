import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Renewable Energy",
  description: "Mind Matrix Renewable Energy — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/renewable-energy",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/renewable-energy.html"),
    "utf8"
  );
}

export default function RenewableEnergyPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
