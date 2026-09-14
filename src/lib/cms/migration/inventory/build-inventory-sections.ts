import type { SectionType } from "@/cms/sections/types";
import type { ImportSectionSpec } from "@/lib/cms/legacy-content-map";
import {
  LEGACY_PAGE_INVENTORY,
  LEGACY_SECTION_CONTENT,
  type LegacyPageInventoryEntry,
} from "@/lib/cms/migration/data/legacy-section-content.generated";
import { getPageContent, type PageContentKey } from "@/config/page-content";
import { getHeroPageConfig } from "@/config/hero-pages";
import { siteContent } from "@/config/site-content";
import { withMigrationMeta, stripMigrationFields, normalizeSectionData } from "@/lib/cms/migration/metadata";
import {
  enrichSectionContent,
  isSectionContentEmpty,
} from "@/lib/cms/migration/inventory/content-enrichment";
import {
  makeSourceKey,
  resolveSectionType,
} from "@/lib/cms/migration/inventory/section-type-map";

export type InventoryBuildResult = {
  sections: ImportSectionSpec[];
  unsupported: string[];
  legacyInstancesDiscovered: number;
};

function wrapInventorySection(
  slug: string,
  type: SectionType,
  componentKey: string,
  sourceFile: string,
  data: Record<string, unknown>,
  sortOrder: number
): ImportSectionSpec {
  const sourceKey = makeSourceKey(slug, componentKey);
  return {
    type,
    source: sourceFile,
    sourceKey,
    sortOrder,
    data: withMigrationMeta(
      {
        ...data,
        componentKey,
        sourceComponent: componentKey,
        lockedLayout: true,
      },
      { source: sourceFile, sourceKey }
    ),
  };
}

function approvedLayoutSections(slug: string, pageKey: string): ImportSectionSpec[] {
  const content = getPageContent(pageKey as PageContentKey);
  if (!content) return [];

  const heroConfig = getHeroPageConfig(pageKey);
  const sections: ImportSectionSpec[] = [];

  sections.push(
    wrapInventorySection(
      slug,
      "hero",
      "PageContentHero",
      "ApprovedPageLayout.tsx",
      {
        variant: heroConfig?.variant ?? "split",
        eyebrow: heroConfig?.eyebrow ?? content.eyebrow,
        title: heroConfig?.titleLines?.join("\n") ?? heroConfig?.title ?? content.title,
        description: heroConfig?.description ?? content.description,
        imageUrl: heroConfig?.image ?? "",
        imageAlt: heroConfig?.imageAlt ?? content.title,
        ctaText: heroConfig?.ctas?.[0]?.label ?? "",
        ctaUrl: heroConfig?.ctas?.[0]?.href ?? "",
        lockedVariant: true,
      },
      0
    )
  );

  sections.push(
    wrapInventorySection(
      slug,
      "capabilities",
      "ApprovedTypicalScope",
      "ApprovedPageLayout.tsx",
      {
        heading: pageKey === "faq" ? "Questions" : "Typical Scope",
        items: [...content.capabilities],
      },
      1
    )
  );

  if (pageKey !== "faq") {
    sections.push(
      wrapInventorySection(
        slug,
        "info_card_pair",
        "ApprovedInfoCards",
        "ApprovedPageLayout.tsx",
        {
          cards: [
            { title: "Deliverables", description: siteContent.deliverablesStatement },
            { title: "Confidentiality", description: siteContent.confidentialityShort },
          ],
        },
        2
      )
    );
  } else {
    sections.push(
      wrapInventorySection(
        slug,
        "faq_list",
        "ApprovedFaqList",
        "ApprovedPageLayout.tsx",
        { title: "FAQ", faqs: siteContent.consultationFaq },
        2
      )
    );
  }

  sections.push(
    wrapInventorySection(
      slug,
      "cta",
      "ApprovedCta",
      "ApprovedPageLayout.tsx",
      {
        title: "Discuss Your Requirement",
        description: siteContent.contactCta,
        buttonText: "Engineering Consultation",
        buttonUrl: "/contact-us-and-engineering-consultation",
        secondaryButtonText: "Contact Us",
        secondaryButtonUrl: "/contact-us",
        variant: "primary",
      },
      3
    )
  );

  return sections;
}

function indexLayoutSections(
  slug: string,
  pageKey: string,
  items: readonly { label: string; href: string }[]
): ImportSectionSpec[] {
  const content = getPageContent(pageKey as PageContentKey);
  if (!content) return [];

  const heroConfig = getHeroPageConfig(pageKey);
  return [
    wrapInventorySection(
      slug,
      "hero",
      "PageContentHero",
      "IndexPageLayout.tsx",
      {
        variant: heroConfig?.variant ?? "split",
        eyebrow: heroConfig?.eyebrow ?? content.eyebrow,
        title: heroConfig?.titleLines?.join("\n") ?? heroConfig?.title ?? content.title,
        description: heroConfig?.description ?? content.description,
        imageUrl: heroConfig?.image ?? "",
        imageAlt: heroConfig?.imageAlt ?? content.title,
        lockedVariant: true,
      },
      0
    ),
    wrapInventorySection(
      slug,
      "link_index_grid",
      "IndexLinkGrid",
      "IndexPageLayout.tsx",
      {
        title: content.title,
        description: content.description,
        links: items.map((item) => ({ label: item.label, href: item.href })),
      },
      1
    ),
    wrapInventorySection(
      slug,
      "cta",
      "IndexCta",
      "IndexPageLayout.tsx",
      {
        title: "Discuss Your Requirement",
        description: siteContent.contactCta,
        buttonText: "Engineering Consultation",
        buttonUrl: "/contact-us-and-engineering-consultation",
        variant: "primary",
      },
      2
    ),
  ];
}

function resolveIndexItems(page: LegacyPageInventoryEntry): readonly { label: string; href: string }[] {
  if (page.layout !== "index") return [];
  if (page.pageKey === "industries") return siteContent.industries;
  if (page.pageKey === "technologies") return siteContent.technologies;
  return [];
}

function countLegacyInstances(page: LegacyPageInventoryEntry): number {
  if (page.layout === "custom") return page.sections.length;
  if (page.layout === "approved") return page.pageKey === "faq" ? 3 : 4;
  if (page.layout === "index") return 3;
  return 0;
}

const ALIAS_PAGE_INVENTORY: Record<string, string> = {
  "industrial-iot-gateway": "iot",
  rtos: "freertos",
  "32-bit-controller": "stm32",
};

function remapInventorySlug(slug: string, sections: ImportSectionSpec[]): ImportSectionSpec[] {
  return sections.map((section) => {
    const remappedKey = section.sourceKey.replace(`${ALIAS_PAGE_INVENTORY[slug] ?? slug}::`, `${slug}::`);
    return {
      ...section,
      sourceKey: remappedKey,
      data: withMigrationMeta(stripMigrationFields(normalizeSectionData(section.data)), {
        source: section.source,
        sourceKey: remappedKey,
      }),
    };
  });
}

export function buildInventorySectionsForSlug(slug: string): InventoryBuildResult {
  const sourceSlug = ALIAS_PAGE_INVENTORY[slug] ?? slug;
  const page = LEGACY_PAGE_INVENTORY.find((entry) => entry.slug === sourceSlug);
  if (!page) {
    return {
      sections: [],
      unsupported: [`${slug}: page not found in legacy inventory`],
      legacyInstancesDiscovered: 0,
    };
  }

  const unsupported: string[] = [];
  const legacyInstancesDiscovered = countLegacyInstances(page);
  const sections: ImportSectionSpec[] = [];

  if (page.layout === "approved") {
    return {
      sections: approvedLayoutSections(slug, page.pageKey),
      unsupported,
      legacyInstancesDiscovered,
    };
  }

  if (page.layout === "index") {
    return {
      sections: indexLayoutSections(slug, page.pageKey, resolveIndexItems(page)),
      unsupported,
      legacyInstancesDiscovered,
    };
  }

  for (const section of page.sections) {
    const inventorySlug = slug;
    const sourceKey = makeSourceKey(sourceSlug, section.componentKey);
    const base = LEGACY_SECTION_CONTENT[sourceKey];
    const enriched = enrichSectionContent(inventorySlug, section.componentKey, base);

    if (isSectionContentEmpty(enriched)) {
      unsupported.push(`${makeSourceKey(inventorySlug, section.componentKey)}: no extractable static content`);
      continue;
    }

    sections.push(
      wrapInventorySection(
        inventorySlug,
        resolveSectionType(section.componentKey),
        section.componentKey,
        section.sourceFile,
        enriched,
        section.order
      )
    );
  }

  return {
    sections: ALIAS_PAGE_INVENTORY[slug] ? remapInventorySlug(slug, sections) : sections,
    unsupported,
    legacyInstancesDiscovered,
  };
}

export function buildAllInventorySections(): InventoryBuildResult {
  const combined: ImportSectionSpec[] = [];
  const unsupported: string[] = [];
  let legacyInstancesDiscovered = 0;

  for (const page of LEGACY_PAGE_INVENTORY) {
    const result = buildInventorySectionsForSlug(page.slug);
    combined.push(...result.sections);
    unsupported.push(...result.unsupported);
    legacyInstancesDiscovered += result.legacyInstancesDiscovered;
  }

  return { sections: combined, unsupported, legacyInstancesDiscovered };
}

export function getLegacyPageInventory() {
  return LEGACY_PAGE_INVENTORY;
}
