import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScrollEffects } from "@/components/layout/ScrollEffects";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = buildPageMetadata({
  title: "Mind Matrix",
  description:
    "Engineering intelligent embedded products — industrial-grade hardware design, firmware development, and connectivity solutions since 2006.",
  path: "/",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mind Matrix",
  url: SITE_URL,
  description:
    "Industrial-grade embedded engineering partner specializing in hardware design, firmware development, and IoT connectivity.",
  foundingDate: "2006",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}
      style={{ ["--font-geist" as string]: "Geist, Inter, sans-serif" }}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
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
      <body className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-primary overflow-x-hidden">
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
