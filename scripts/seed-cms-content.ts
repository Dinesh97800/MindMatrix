/**
 * Imports existing website content from legacy config files into CMS tables.
 * Safe to run multiple times — updates mapped pages/sections without deleting architecture.
 *
 * Usage: npm run db:seed:cms:content
 */
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import { getAllPageImportBundles } from "../src/lib/cms/legacy-content-map";

dotenv.config();

function createSequelize() {
  return new Sequelize(
    process.env.MYSQL_DATABASE!,
    process.env.MYSQL_USER!,
    process.env.MYSQL_PASSWORD ?? "",
    {
      host: process.env.MYSQL_HOST ?? "127.0.0.1",
      port: Number(process.env.MYSQL_PORT ?? 3306),
      dialect: "mysql",
      dialectModule: mysql2,
      logging: false,
    }
  );
}

async function ensurePage(sequelize: Sequelize, slug: string, title: string) {
  const [rows] = await sequelize.query(
    "SELECT id FROM pages WHERE slug = :slug LIMIT 1",
    { replacements: { slug } }
  );
  if ((rows as Array<{ id: number }>).length > 0) {
    const id = (rows as Array<{ id: number }>)[0].id;
    await sequelize.query(
      "UPDATE pages SET title = :title, updated_at = NOW() WHERE id = :id",
      { replacements: { id, title } }
    );
    return id;
  }

  await sequelize.query(
    `INSERT INTO pages (title, slug, category_id, template, status, sort_order, created_at, updated_at)
     VALUES (:title, :slug, NULL, 'default', 'draft', 0, NOW(), NOW())`,
    { replacements: { title, slug } }
  );
  const [idRows] = await sequelize.query("SELECT LAST_INSERT_ID() AS id");
  const pageId = (idRows as Array<{ id: number }>)[0].id;

  await sequelize.query(
    `INSERT INTO page_seo (page_id, robots, created_at, updated_at)
     VALUES (:pageId, 'index', NOW(), NOW())`,
    { replacements: { pageId } }
  );

  return pageId;
}

async function upsertSeo(
  sequelize: Sequelize,
  pageId: number,
  seo: { metaTitle: string; metaDescription: string; robots: "index" | "noindex" }
) {
  await sequelize.query(
    `UPDATE page_seo
     SET meta_title = :metaTitle,
         meta_description = :metaDescription,
         robots = :robots,
         updated_at = NOW()
     WHERE page_id = :pageId`,
    { replacements: { pageId, ...seo } }
  );
}

async function replaceSections(
  sequelize: Sequelize,
  pageId: number,
  sections: Array<{ type: string; data: Record<string, unknown> }>
) {
  await sequelize.query("DELETE FROM page_sections WHERE page_id = :pageId", {
    replacements: { pageId },
  });

  for (const [index, section] of sections.entries()) {
    await sequelize.query(
      `INSERT INTO page_sections (page_id, type, sort_order, data, is_visible, created_at, updated_at)
       VALUES (:pageId, :type, :sortOrder, :data, 1, NOW(), NOW())`,
      {
        replacements: {
          pageId,
          type: section.type,
          sortOrder: index,
          data: JSON.stringify(section.data),
        },
      }
    );
  }
}

async function main() {
  const sequelize = createSequelize();
  await sequelize.authenticate();

  const bundles = getAllPageImportBundles();
  let imported = 0;

  for (const bundle of bundles) {
    const pageId = await ensurePage(sequelize, bundle.slug, bundle.title);
    await upsertSeo(sequelize, pageId, bundle.seo);
    await replaceSections(sequelize, pageId, bundle.sections);
    imported += 1;
  }

  console.log(`[seed-cms-content] Imported ${imported} existing website pages with mapped content.`);
  await sequelize.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
