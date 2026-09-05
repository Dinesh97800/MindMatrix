import type { Sequelize } from "sequelize";
import { setupAssociations } from "../associations";
import { AdminUser, initAdminUserModel } from "./AdminUser";
import { Blog, initBlogModel } from "./Blog";
import { BlogCategory, initBlogCategoryModel } from "./BlogCategory";
import { ContactSubmission, initContactSubmissionModel } from "./ContactSubmission";
import { Media, initMediaModel } from "./Media";
import {
  NewsletterSubscription,
  initNewsletterSubscriptionModel,
} from "./NewsletterSubscription";
import { Page, initPageModel } from "./Page";
import { PageCategory, initPageCategoryModel } from "./PageCategory";
import { PageSection, initPageSectionModel } from "./PageSection";
import { PageSEO, initPageSEOModel } from "./PageSEO";
import { SiteSetting, initSiteSettingModel } from "./SiteSetting";

export { AdminUser } from "./AdminUser";
export type { AdminRole } from "./AdminUser";
export { ContactSubmission } from "./ContactSubmission";
export type {
  ContactSource,
  SubmissionStatus,
} from "./ContactSubmission";
export { NewsletterSubscription } from "./NewsletterSubscription";
export type { NewsletterStatus } from "./NewsletterSubscription";
export { PageCategory } from "./PageCategory";
export { Page } from "./Page";
export type { PageStatus } from "./Page";
export { PageSection } from "./PageSection";
export { PageSEO } from "./PageSEO";
export type { SeoRobots } from "./PageSEO";
export { Media } from "./Media";
export { BlogCategory } from "./BlogCategory";
export { Blog } from "./Blog";
export type { BlogStatus } from "./Blog";
export { SiteSetting } from "./SiteSetting";
export type { SiteSettingGroup } from "./SiteSetting";

export type DbModels = {
  AdminUser: typeof AdminUser;
  ContactSubmission: typeof ContactSubmission;
  NewsletterSubscription: typeof NewsletterSubscription;
  PageCategory: typeof PageCategory;
  Page: typeof Page;
  PageSection: typeof PageSection;
  PageSEO: typeof PageSEO;
  Media: typeof Media;
  BlogCategory: typeof BlogCategory;
  Blog: typeof Blog;
  SiteSetting: typeof SiteSetting;
};

const globalForModels = globalThis as typeof globalThis & {
  __dbModels?: DbModels;
  __dbAssociationsReady?: boolean;
};

export function areModelsInitialized() {
  return Boolean(globalForModels.__dbModels?.ContactSubmission?.sequelize);
}

export function initModels(sequelize: Sequelize) {
  if (areModelsInitialized()) {
    return globalForModels.__dbModels!;
  }

  initAdminUserModel(sequelize);
  initContactSubmissionModel(sequelize);
  initNewsletterSubscriptionModel(sequelize);
  initPageCategoryModel(sequelize);
  initMediaModel(sequelize);
  initPageModel(sequelize);
  initPageSectionModel(sequelize);
  initPageSEOModel(sequelize);
  initBlogCategoryModel(sequelize);
  initBlogModel(sequelize);
  initSiteSettingModel(sequelize);

  globalForModels.__dbModels = {
    AdminUser,
    ContactSubmission,
    NewsletterSubscription,
    PageCategory,
    Page,
    PageSection,
    PageSEO,
    Media,
    BlogCategory,
    Blog,
    SiteSetting,
  };

  if (!globalForModels.__dbAssociationsReady) {
    setupAssociations(globalForModels.__dbModels);
    globalForModels.__dbAssociationsReady = true;
  }

  return globalForModels.__dbModels;
}

/** Returns initialized Sequelize models (survives Next.js HMR module reloads). */
export function getDbModels(): DbModels {
  const models = globalForModels.__dbModels;
  if (!models?.ContactSubmission?.sequelize) {
    throw new Error("Database models not initialized. Call syncDatabase() first.");
  }
  return models;
}
