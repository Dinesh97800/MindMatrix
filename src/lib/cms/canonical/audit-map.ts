import fs from "node:fs";
import path from "node:path";
import type {
  CanonicalModel,
  CanonicalSource,
  MappingStatus,
  RouteClassification,
} from "./types";

export type AuditedSectionPlan = {
  stableKey: string;
  model: CanonicalModel;
  template: string;
  source: CanonicalSource;
  auditStatus: MappingStatus;
  entityType?: "case_study" | "blog" | "resource" | "job" | "navigation";
};

export type AuditedRoutePlan = {
  slug: string;
  path: string;
  classification: RouteClassification;
  redirectTarget?: string;
  pageTemplate: string;
  pageKey?: string;
  sections: AuditedSectionPlan[];
};

type LegacyInventoryPage = {
  slug: string;
  layout: "custom" | "approved" | "index";
  pageKey?: string;
  sections: Array<{ componentKey: string; sourceFile: string; order: number }>;
};

function readInventory(root: string): LegacyInventoryPage[] {
  const file = fs.readFileSync(
    path.join(
      root,
      "src/lib/cms/migration/data/legacy-section-content.generated.ts"
    ),
    "utf8"
  );
  const startToken = "export const LEGACY_PAGE_INVENTORY = ";
  const endToken = " as const;";
  const start = file.indexOf(startToken);
  const end = file.indexOf(endToken, start);
  if (start < 0 || end < 0) {
    throw new Error("Unable to read legacy source inventory for audit coverage.");
  }
  return JSON.parse(
    file.slice(start + startToken.length, end)
  ) as LegacyInventoryPage[];
}

function sourceKind(component: string): CanonicalSource["kind"] {
  if (
    component === "PageContentHero" ||
    component.startsWith("Approved") ||
    component.startsWith("Index")
  ) {
    return "shared-layout";
  }
  return component === "ConfiguredHero" || component === "HeroSection"
    ? "structured-config"
    : "component-inline";
}

function entityFor(
  model: CanonicalModel,
  stableKey: string
): AuditedSectionPlan["entityType"] {
  if (model === "NAV") return "navigation";
  if (model !== "LISTING") return undefined;
  if (/career|jobs/.test(stableKey)) return "job";
  if (/blog|posts|insights/.test(stableKey)) return "blog";
  if (/resource|whitepaper|download|knowledge/.test(stableKey)) return "resource";
  return "case_study";
}

function statusFor(model: CanonicalModel): MappingStatus {
  if (model === "UTILITY") return "UTILITY";
  if (model === "LISTING" || model === "NAV") return "FIRST_CLASS_ENTITY";
  return "MISSING_SOURCE";
}

function sectionPlan(
  route: string,
  component: string,
  model: CanonicalModel,
  stableKey: string,
  file: string | null
): AuditedSectionPlan {
  return {
    stableKey,
    model,
    template: stableKey,
    source: {
      route,
      component,
      file,
      kind: sourceKind(component),
    },
    auditStatus: statusFor(model),
    entityType: entityFor(model, stableKey),
  };
}

function sharedApproved(
  route: string,
  pageKey: string,
  faq: boolean
): AuditedSectionPlan[] {
  const prefix = route === "home" ? "home" : route;
  if (faq) {
    return [
      sectionPlan(route, "PageContentHero", "HERO", `${prefix}.hero`, "src/components/pages/shared/ApprovedPageLayout.tsx"),
      sectionPlan(route, "ApprovedFaqList", "FAQ", `${prefix}.faq`, "src/components/pages/shared/ApprovedPageLayout.tsx"),
      sectionPlan(route, "ApprovedCta", "CTA", `${prefix}.consultation`, "src/components/pages/shared/ApprovedPageLayout.tsx"),
    ];
  }
  return [
    sectionPlan(route, "PageContentHero", "HERO", `${prefix}.hero`, "src/components/pages/shared/ApprovedPageLayout.tsx"),
    sectionPlan(route, "ApprovedTypicalScope", "CARDS", `${prefix}.scope`, "src/components/pages/shared/ApprovedPageLayout.tsx"),
    sectionPlan(route, "ApprovedInfoCards", "CARDS", `${prefix}.info`, "src/components/pages/shared/ApprovedPageLayout.tsx"),
    sectionPlan(route, "ApprovedCta", "CTA", `${prefix}.consultation`, "src/components/pages/shared/ApprovedPageLayout.tsx"),
  ];
}

function sharedIndex(route: string): AuditedSectionPlan[] {
  return [
    sectionPlan(route, "PageContentHero", "HERO", `${route}.hero`, "src/components/pages/shared/IndexPageLayout.tsx"),
    sectionPlan(route, "IndexLinkGrid", "CARDS", `${route}.index`, "src/components/pages/shared/IndexPageLayout.tsx"),
    sectionPlan(route, "IndexCta", "CTA", `${route}.consultation`, "src/components/pages/shared/IndexPageLayout.tsx"),
  ];
}

function compositeSource(
  slug: string,
  stableKey: string,
  priorComponent: string
): string {
  const explicit: Record<string, string> = {
    "contact-us.project-inquiry": "LeftSideOfficeLocationsSection",
    "request-consultation.form": "LeftColumnHighTrustContentSection",
    "privacy-policy.toc": "SideNavigationSection",
    "deterministic-edge.toc": "LeftSidebarAuthorInfoSection",
    "downloads.categories": "SidebarNavigationSection",
  };
  return explicit[stableKey] ?? priorComponent;
}

export function loadCanonicalAuditMap(root = process.cwd()): {
  routes: AuditedRoutePlan[];
  inventory: LegacyInventoryPage[];
} {
  const audit = fs.readFileSync(path.join(root, "CMS_CONTENT_MODEL_AUDIT.md"), "utf8");
  const inventory = readInventory(root);
  const sourceByRouteComponent = new Map<string, string>();
  for (const page of inventory) {
    for (const section of page.sections ?? []) {
      sourceByRouteComponent.set(
        `${page.slug}::${section.componentKey}`,
        section.sourceFile
      );
    }
  }

  const routes: AuditedRoutePlan[] = [];
  for (const line of audit.split(/\r?\n/)) {
    if (!line.startsWith("- `/")) continue;
    const routeMatch = line.match(
      /^- `(\/[^\`]*)`(?: \(`home`\))? — \*\*(active|redirect -> ([^*]+))\*\*(.*)$/
    );
    if (!routeMatch) continue;

    const publicPath = routeMatch[1];
    const slug = publicPath === "/" ? "home" : publicPath.slice(1);
    const classification: RouteClassification =
      routeMatch[2] === "active" ? "active" : "redirect";
    const redirectTarget = routeMatch[3]?.trim();
    const tail = routeMatch[4];
    const sections: AuditedSectionPlan[] = [];

    const approvedFaq = tail.includes("`APPROVED_FAQ`");
    const approved = tail.match(/`APPROVED\(([^)]+)\)`/);
    const index = tail.match(/`INDEX\(([^)]+)\)`/);
    const hasExplicitComponentMappings = / -> (?:HERO|CONTENT|CARDS|MEDIA|METRICS|PROCESS|ARCH|TABLE|LOGOS|CTA|FAQ|LISTING|ARTICLE|FORM|CONTACT|NAV|UTILITY)\//.test(tail);
    const pageKey = approved?.[1] ?? index?.[1] ?? (approvedFaq ? "faq" : undefined);

    if (approvedFaq && !hasExplicitComponentMappings) {
      sections.push(...sharedApproved(slug, "faq", true));
    } else if (approved && !hasExplicitComponentMappings) {
      sections.push(...sharedApproved(slug, approved[1], false));
    } else if (index && !hasExplicitComponentMappings) {
      sections.push(...sharedIndex(slug));
    } else {
      let priorComponent = "audit-defined";
      for (const code of [...tail.matchAll(/`([^`]+)`/g)].map((match) => match[1])) {
        const mapped = code.match(
          /^(.+?) -> (HERO|CONTENT|CARDS|MEDIA|METRICS|PROCESS|ARCH|TABLE|LOGOS|CTA|FAQ|LISTING|ARTICLE|FORM|CONTACT|NAV|UTILITY)\/([a-z0-9.-]+)$/
        );
        const direct = code.match(
          /^(HERO|CONTENT|CARDS|MEDIA|METRICS|PROCESS|ARCH|TABLE|LOGOS|CTA|FAQ|LISTING|ARTICLE|FORM|CONTACT|NAV|UTILITY)\/([a-z0-9.-]+)$/
        );
        if (mapped) {
          priorComponent = mapped[1];
          sections.push(
            sectionPlan(
              slug,
              priorComponent,
              mapped[2] as CanonicalModel,
              mapped[3],
              sourceByRouteComponent.get(`${slug}::${priorComponent}`) ?? null
            )
          );
        } else if (direct) {
          const component = compositeSource(slug, direct[2], priorComponent);
          sections.push(
            sectionPlan(
              slug,
              component,
              direct[1] as CanonicalModel,
              direct[2],
              sourceByRouteComponent.get(`${slug}::${component}`) ?? null
            )
          );
        }
      }
    }

    routes.push({
      slug,
      path: publicPath,
      classification,
      redirectTarget,
      pageTemplate:
        approvedFaq || approved
          ? "shared.approved"
          : index
            ? "shared.index"
            : `${slug}.page`,
      pageKey,
      sections,
    });
  }

  return { routes, inventory };
}
