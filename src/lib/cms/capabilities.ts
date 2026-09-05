import {
  CMS_CAPABILITY_DEFAULTS,
  type CmsCapabilities,
} from "@/lib/cms/capabilities.shared";

function envFlag(name: string, defaultValue: boolean): boolean {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  return value === "true" || value === "1";
}

/**
 * Server-side CMS capability configuration.
 * TODO CMS FUTURE: Enable structural flags when client requires dynamic CMS management.
 */
export const CMS_CAPABILITIES: CmsCapabilities = {
  canCreatePages: envFlag("CMS_DYNAMIC_PAGE_CREATION", CMS_CAPABILITY_DEFAULTS.canCreatePages),
  canDeletePages: envFlag("CMS_PAGE_DELETION", CMS_CAPABILITY_DEFAULTS.canDeletePages),
  canCreateSections: envFlag("CMS_DYNAMIC_SECTIONS", CMS_CAPABILITY_DEFAULTS.canCreateSections),
  canDeleteSections: envFlag("CMS_SECTION_DELETION", CMS_CAPABILITY_DEFAULTS.canDeleteSections),
  canDuplicateSections: envFlag(
    "CMS_SECTION_DUPLICATION",
    CMS_CAPABILITY_DEFAULTS.canDuplicateSections
  ),
  canReorderSections: envFlag(
    "CMS_SECTION_REORDERING",
    CMS_CAPABILITY_DEFAULTS.canReorderSections
  ),
  canToggleSectionVisibility: envFlag(
    "CMS_SECTION_VISIBILITY",
    CMS_CAPABILITY_DEFAULTS.canToggleSectionVisibility
  ),
  canChangeTemplates: envFlag(
    "CMS_TEMPLATE_CHANGES",
    CMS_CAPABILITY_DEFAULTS.canChangeTemplates
  ),
  canManageCategories: envFlag(
    "CMS_CATEGORY_MANAGEMENT",
    CMS_CAPABILITY_DEFAULTS.canManageCategories
  ),
  canEditContent: envFlag("CMS_CONTENT_EDITING", CMS_CAPABILITY_DEFAULTS.canEditContent),
  canEditMedia: envFlag("CMS_MEDIA_EDITING", CMS_CAPABILITY_DEFAULTS.canEditMedia),
  canEditSeo: envFlag("CMS_SEO_EDITING", CMS_CAPABILITY_DEFAULTS.canEditSeo),
  canEditSettings: envFlag("CMS_SETTINGS_EDITING", CMS_CAPABILITY_DEFAULTS.canEditSettings),
  canManageBlogs: envFlag("CMS_BLOG_MANAGEMENT", CMS_CAPABILITY_DEFAULTS.canManageBlogs),
};

export type { CmsCapabilities };
