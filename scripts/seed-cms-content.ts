/**
 * Imports existing website content from legacy config files into CMS tables.
 * Safe to run multiple times — upserts migration-owned records and preserves admin edits.
 *
 * Usage: npm run db:seed:cms:content
 */
import { runCmsContentMigration } from "../src/lib/cms/migration/runner";

runCmsContentMigration().catch((error) => {
  console.error(error);
  process.exit(1);
});
