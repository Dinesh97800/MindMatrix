export type CmsCapabilities = {
  canCreatePages: boolean;
  canDeletePages: boolean;
  canCreateSections: boolean;
  canDeleteSections: boolean;
  canDuplicateSections: boolean;
  canReorderSections: boolean;
  canToggleSectionVisibility: boolean;
  canChangeTemplates: boolean;
  canManageCategories: boolean;
  canEditContent: boolean;
  canEditMedia: boolean;
  canEditSeo: boolean;
  canEditSettings: boolean;
  canManageBlogs: boolean;
};

/** Default client phase: existing-content editor only. */
export const CMS_CAPABILITY_DEFAULTS: CmsCapabilities = {
  canCreatePages: false,
  canDeletePages: false,
  canCreateSections: false,
  canDeleteSections: false,
  canDuplicateSections: false,
  canReorderSections: false,
  canToggleSectionVisibility: false,
  canChangeTemplates: false,
  canManageCategories: false,
  canEditContent: true,
  canEditMedia: true,
  canEditSeo: true,
  canEditSettings: true,
  canManageBlogs: true,
};

export type CapabilityKey = keyof CmsCapabilities;
