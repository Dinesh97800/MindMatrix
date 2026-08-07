import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ScrollEffects } from "@/components/layout/ScrollEffects";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = buildPageMetadata({
  title: "Mind Matrix Intelligent Solutions",
  description:
    "India-based engineering consultancy for custom embedded hardware, firmware, and communication-system development — from requirements and architecture through prototype validation and production support.",
  path: "/",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mind Matrix Intelligent Solutions",
  url: SITE_URL,
  description:
    "Engineering consultancy specializing in embedded electronics, industrial firmware, communication systems, and custom product development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${montserrat.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="bg-background text-on-surface font-body-md font-montserrat selection:bg-brand-teal/20 selection:text-brand-navy overflow-x-hidden">
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
