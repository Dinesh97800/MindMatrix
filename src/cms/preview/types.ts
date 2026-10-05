export type PreviewDataOrigin = "admin-edited" | "migrated-seed";

export type PreviewAction = {
  label: string;
  href: string;
  variant?: string;
};

export type PreviewMetric = {
  value: string;
  label: string;
};

export type PreviewCard = {
  title: string;
  body?: string;
  href?: string;
  label?: string;
  eyebrow?: string;
  icon?: string;
  imageUrl?: string;
  imageAlt?: string;
  items?: string[];
  badges?: string[];
  metrics?: PreviewMetric[];
  rows?: PreviewMetric[];
};

export type PreviewEntity = {
  entityType: string;
  slug: string;
  title: string;
  fields: Record<string, string>;
  resolved: boolean;
};

export type PreviewMedia = {
  url?: string;
  alt?: string;
  mediaId?: number;
  remote?: boolean;
  missing?: string;
};

export type PreviewSectionPayload = {
  id: number;
  stableKey: string;
  model: string;
  template: string;
  sourceComponent: string;
  sourceFile: string | null;
  adapterId: string | null;
  isVisible: boolean;
  dataOrigin: PreviewDataOrigin;
  preservedRowId?: number;
  data: Record<string, unknown>;
  media: PreviewMedia;
  actions: PreviewAction[];
  cards: PreviewCard[];
  entities: PreviewEntity[];
  issues: string[];
};

export type PreviewSeoPayload = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl?: string;
};

export type PreviewPagePayload = {
  page: {
    id: number;
    title: string;
    slug: string;
    status: "draft" | "published";
    template: string;
    classification: string;
    publishable: boolean;
    updatedAt?: string;
  };
  seo: PreviewSeoPayload | null;
  sections: PreviewSectionPayload[];
  publicRenderingUnchanged: true;
};
