import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Product Development",
  description: "Mind Matrix Product Development — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/product-development",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/product-development.html"),
    "utf8"
  );
}

export default function ProductDevelopmentPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
