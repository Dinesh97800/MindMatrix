import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "EV Charger Electronics",
  description: "Mind Matrix EV Charger Electronics — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/ev-charger-electronics",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/ev-charger-electronics.html"),
    "utf8"
  );
}

export default function EvChargerElectronicsPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
