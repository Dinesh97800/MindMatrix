import type { Sequelize } from "sequelize";
import { AdminUser, initAdminUserModel } from "./AdminUser";
import { ContactSubmission, initContactSubmissionModel } from "./ContactSubmission";
import {
  NewsletterSubscription,
  initNewsletterSubscriptionModel,
} from "./NewsletterSubscription";

export { AdminUser } from "./AdminUser";
export type { AdminRole } from "./AdminUser";
export { ContactSubmission } from "./ContactSubmission";
export type {
  ContactSource,
  SubmissionStatus,
} from "./ContactSubmission";
export { NewsletterSubscription } from "./NewsletterSubscription";
export type { NewsletterStatus } from "./NewsletterSubscription";

export type DbModels = {
  AdminUser: typeof AdminUser;
  ContactSubmission: typeof ContactSubmission;
  NewsletterSubscription: typeof NewsletterSubscription;
};

const globalForModels = globalThis as typeof globalThis & {
  __dbModels?: DbModels;
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

  globalForModels.__dbModels = {
    AdminUser,
    ContactSubmission,
    NewsletterSubscription,
  };

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
