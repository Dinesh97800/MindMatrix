import { companyContact } from "@/config/company";
import { footerColumns, headerNavItems, mainNavItems } from "@/config/navigation";
import { PAGE_SEO } from "@/config/page-seo";
import { siteContent, copyrightNotice } from "@/config/site-content";
import { caseStudies, caseStudyConfidentialityNote } from "@/data/case-studies";
import type { SiteSettingGroup } from "@/lib/db/models/SiteSetting";export type SettingSeedSpec = {
  group: SiteSettingGroup;
  key: string;
  value: string;
  source: string;
  sourceKey: string;
};

export function getLegacySiteSettings(): SettingSeedSpec[] {
  const homeSeo = PAGE_SEO["/"];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mmisindia.com";

  return [
    { group: "general", key: "websiteUrl", value: siteUrl, source: "NEXT_PUBLIC_SITE_URL", sourceKey: "general.websiteUrl" },
    { group: "company", key: "legalName", value: companyContact.legalName, source: "company.ts", sourceKey: "company.legalName" },
    { group: "company", key: "shortName", value: companyContact.shortName, source: "company.ts", sourceKey: "company.shortName" },
    { group: "company", key: "gstin", value: companyContact.gstin, source: "company.ts", sourceKey: "company.gstin" },
    { group: "contact", key: "email", value: companyContact.email, source: "company.ts", sourceKey: "contact.email" },
    { group: "contact", key: "addressLine1", value: companyContact.address.line1, source: "company.ts", sourceKey: "contact.addressLine1" },
    { group: "contact", key: "city", value: companyContact.address.city, source: "company.ts", sourceKey: "contact.city" },
    { group: "contact", key: "state", value: companyContact.address.state, source: "company.ts", sourceKey: "contact.state" },
    { group: "seo", key: "defaultTitle", value: homeSeo?.title ?? "", source: "page-seo.ts", sourceKey: "seo.defaultTitle" },
    { group: "seo", key: "defaultDescription", value: homeSeo?.description ?? "", source: "page-seo.ts", sourceKey: "seo.defaultDescription" },
    { group: "footer", key: "description", value: siteContent.footerTagline, source: "site-content.ts", sourceKey: "footer.description" },
    { group: "general", key: "tagline", value: siteContent.tagline, source: "site-content.ts", sourceKey: "general.tagline" },
    { group: "footer", key: "copyright", value: copyrightNotice(), source: "site-content.ts", sourceKey: "footer.copyright" },
    {
      group: "general",
      key: "navigation.header",
      value: JSON.stringify(headerNavItems),
      source: "navigation.ts",
      sourceKey: "navigation.header",
    },
    {
      group: "general",
      key: "navigation.main",
      value: JSON.stringify(mainNavItems),
      source: "navigation.ts",
      sourceKey: "navigation.main",
    },
    {
      group: "footer",
      key: "navigation.columns",
      value: JSON.stringify(footerColumns),
      source: "navigation.ts",
      sourceKey: "navigation.columns",
    },
    {
      group: "general",
      key: "content.caseStudies",
      value: JSON.stringify({ studies: caseStudies, note: caseStudyConfidentialityNote }),
      source: "case-studies.ts",
      sourceKey: "content.caseStudies",
    },
  ];
}
export function unwrapSettingValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return value;
      }
    }
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}
