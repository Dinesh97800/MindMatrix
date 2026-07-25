import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Atacama Solar Reserve",
  description: "Mind Matrix Atacama Solar Reserve — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/atacama-solar-reserve",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/atacama-solar-reserve.html"),
    "utf8"
  );
}

export default function AtacamaSolarReservePage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
