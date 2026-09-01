import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductDevelopmentPageContent } from "@/components/pages/product-development/ProductDevelopmentPageContent";

export const metadata: Metadata = pageMetadata("/product-development");

export default function ProductDevelopmentPage() {
  return <ProductDevelopmentPageContent />;
}
