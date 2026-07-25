import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ProductDevelopmentPageContent } from "@/components/pages/product-development/ProductDevelopmentPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Product Development",
  description: "Mind Matrix Product Development — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/product-development",
  keywords: ["mind matrix","embedded systems","product","development"],
});

export default function ProductDevelopmentPage() {
  return <ProductDevelopmentPageContent />;
}
