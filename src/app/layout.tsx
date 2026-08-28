import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollEffects } from "@/components/layout/ScrollEffects";
import { buildRootMetadata, SITE_URL } from "@/lib/seo";

const montserrat = localFont({
  src: [
    {
      path: "../../public/fonts/montserrat/montserrat-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/montserrat/montserrat-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/montserrat/montserrat-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = buildRootMetadata();

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
