export const CANONICAL_MODELS = [
  "HERO",
  "CONTENT",
  "CARDS",
  "MEDIA",
  "METRICS",
  "PROCESS",
  "ARCH",
  "TABLE",
  "LOGOS",
  "CTA",
  "FAQ",
  "LISTING",
  "ARTICLE",
  "FORM",
  "CONTACT",
  "NAV",
  "UTILITY",
] as const;

export type CanonicalModel = (typeof CANONICAL_MODELS)[number];
export type RouteClassification = "active" | "redirect";
export type MappingStatus =
  | "MAPPED"
  | "UTILITY"
  | "FIRST_CLASS_ENTITY"
  | "DEVELOPER_CONTROLLED"
  | "MISSING_SOURCE"
  | "INVALID"
  | "DUPLICATE";

export type CanonicalSource = {
  route: string;
  component: string;
  file: string | null;
  kind: "structured-config" | "structured-data" | "component-inline" | "shared-layout";
  adapter?: string;
  sourceNote?: string;
};

export type CanonicalEditorPolicy = {
  editable: readonly string[];
  locked: readonly string[];
  minItems?: number;
  maxItems?: number;
};

export type CanonicalMigrationMeta = {
  version: "2026-09-05-canonical-v4";
  source: string;
  sourceKey: string;
  sourceComponent: string;
};

export type CanonicalSection = {
  stableKey: string;
  model: CanonicalModel;
  template: string;
  content: Record<string, unknown>;
  visibility: boolean;
  source: CanonicalSource;
  editorPolicy: CanonicalEditorPolicy;
  decorations: Record<string, unknown>;
  status: MappingStatus;
  entityType?: "case_study" | "blog" | "resource" | "job" | "navigation";
  missingData?: readonly string[];
  _migration: CanonicalMigrationMeta;
};

export type CanonicalSeo = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  robots: "index" | "noindex";
};

export type CanonicalPageManifest = {
  slug: string;
  path: string;
  title: string;
  category: string | null;
  status: "draft";
  template: string;
  classification: RouteClassification;
  redirectTarget?: string;
  publishable: boolean;
  seo: CanonicalSeo | null;
  sections: CanonicalSection[];
};

export type AuditedSourceSlot = {
  route: string;
  component: string;
  order: number;
  stableKeys: string[];
  status: MappingStatus;
};

export type JsonNormalization = {
  value: unknown;
  parsedStringLayers: number;
  invalidJsonString: boolean;
};
