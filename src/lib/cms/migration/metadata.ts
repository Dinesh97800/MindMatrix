import { CMS_MIGRATION_VERSION, MIGRATION_SOURCE_TYPE } from "./constants";

export type MigrationMeta = {
  source: string;
  sourceKey: string;
  sourceType: typeof MIGRATION_SOURCE_TYPE;
  seedVersion: string;
  importedAt: string;
};

export function withMigrationMeta<T extends Record<string, unknown>>(
  data: T,
  meta: Pick<MigrationMeta, "source" | "sourceKey">
): T & { _migration: MigrationMeta } {
  return {
    ...data,
    _migration: {
      ...meta,
      sourceType: MIGRATION_SOURCE_TYPE,
      seedVersion: CMS_MIGRATION_VERSION,
      importedAt: new Date().toISOString(),
    },
  };
}

export function isCmsEdited(data: Record<string, unknown> | null | undefined): boolean {
  return Boolean(data && data._cmsEdited === true);
}

export function getMigrationSourceKey(data: Record<string, unknown> | null | undefined): string | null {
  const migration = data?._migration;
  if (!migration || typeof migration !== "object") return null;
  return typeof (migration as MigrationMeta).sourceKey === "string"
    ? (migration as MigrationMeta).sourceKey
    : null;
}

export function markCmsEdited<T extends Record<string, unknown>>(data: T): T & { _cmsEdited: true } {
  return { ...data, _cmsEdited: true as const };
}

/** Some legacy seed rows stored JSON as a string inside the JSON column. */
export function normalizeSectionData(data: unknown): Record<string, unknown> {
  let current: unknown = data;
  for (let i = 0; i < 3; i += 1) {
    if (typeof current === "string") {
      try {
        current = JSON.parse(current);
        continue;
      } catch {
        return {};
      }
    }
    break;
  }
  return current && typeof current === "object" && !Array.isArray(current)
    ? (current as Record<string, unknown>)
    : {};
}

export function stripMigrationFields(data: Record<string, unknown>): Record<string, unknown> {
  const { _migration, _cmsEdited, ...rest } = data;
  return rest;
}

export function getMigrationSourceKeyFromRaw(data: unknown): string | null {
  return getMigrationSourceKey(normalizeSectionData(data));
}

export function isCmsEditedRaw(data: unknown): boolean {
  return isCmsEdited(normalizeSectionData(data));
}
