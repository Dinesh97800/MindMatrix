import type { CanonicalEditorPolicy, CanonicalModel } from "./types";

const LOCKED = ["stableKey", "model", "template", "source", "decorations"] as const;

export function editorPolicyFor(model: CanonicalModel): CanonicalEditorPolicy {
  switch (model) {
    case "HERO":
      return { editable: ["eyebrow", "title", "titleAccent", "titleAccentClassName", "summary", "media", "mediaAlt", "actions", "variant", "tone", "overlay"], locked: LOCKED };
    case "CONTENT":
      return { editable: ["eyebrow", "title", "titleAccent", "titleAccentClassName", "eyebrowIcon", "body", "paragraphs", "items", "links", "cards", "featured", "bullets", "callouts"], locked: LOCKED };
    case "CARDS":
      return { editable: ["eyebrow", "heading", "introduction", "body", "cards"], locked: LOCKED, minItems: 1, maxItems: 24 };
    case "MEDIA":
      return { editable: ["eyebrow", "heading", "body", "supportingText", "media", "mediaAlt", "items", "cards", "actions", "callouts"], locked: LOCKED };
    case "METRICS":
      return { editable: ["heading", "items"], locked: LOCKED, minItems: 1, maxItems: 12 };
    case "PROCESS":
      return { editable: ["heading", "introduction", "steps"], locked: LOCKED, minItems: 1, maxItems: 16 };
    case "ARCH":
      return { editable: ["heading", "introduction", "nodes", "edges", "legend", "annotations"], locked: [...LOCKED, "geometry"] };
    case "TABLE":
      return { editable: ["heading", "introduction", "columns", "rows", "notes"], locked: LOCKED };
    case "LOGOS":
      return { editable: ["heading", "items"], locked: LOCKED, minItems: 1, maxItems: 32 };
    case "CTA":
      return { editable: ["eyebrow", "title", "body", "actions", "media", "highlights", "footnote"], locked: LOCKED };
    case "FAQ":
      return { editable: ["heading", "introduction", "items"], locked: LOCKED, minItems: 1, maxItems: 40 };
    case "LISTING":
      return { editable: ["heading", "introduction", "filters", "jobs", "emptyState"], locked: [...LOCKED, "entityType", "query"] };
    case "ARTICLE":
      return { editable: ["title", "author", "dates", "leadMedia", "body", "sections", "references", "toc", "tocHeading"], locked: LOCKED };
    case "FORM":
      return { editable: ["heading", "supportingCopy", "successCopy", "privacyCopy", "contactHeading", "confidentialityHeading", "legalName", "email", "gstinLabel", "registeredOfficeLabel", "addresses"], locked: [...LOCKED, "formKey", "fields", "validation", "delivery"] };
    case "CONTACT":
      return { editable: ["heading", "eyebrow", "summary", "title", "description", "locations", "addresses", "communicationMethods", "hours", "map", "email", "legalName", "gstinLabel", "registeredOfficeLabel", "enquiryTitle", "enquiryBody"], locked: [...LOCKED, "mapProvider"] };
    case "NAV":
      return { editable: ["labels", "staticLinks", "heading"], locked: [...LOCKED, "taxonomy", "behavior", "pagination"] };
    case "UTILITY":
      return { editable: [], locked: [...LOCKED, "content"] };
  }
}

