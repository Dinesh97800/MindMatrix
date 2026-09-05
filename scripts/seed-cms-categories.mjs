/**
 * Seeds CMS page categories from the existing public navigation structure.
 * Safe to run multiple times — skips categories/pages that already exist.
 */
import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";
import mysql2 from "mysql2";

dotenv.config();

const CATEGORY_TREE = [
  { slug: "home", label: "Home", sortOrder: 0 },
  {
    slug: "about",
    label: "About",
    sortOrder: 10,
    children: [
      { slug: "about-us", label: "About Us", pageSlug: "about-us" },
      { slug: "engineering-process", label: "Engineering Process", pageSlug: "engineering-process" },
      { slug: "careers", label: "Careers", pageSlug: "careers" },
      { slug: "faq", label: "FAQ", pageSlug: "faq" },
    ],
  },
  {
    slug: "services",
    label: "Services",
    sortOrder: 20,
    children: [
      { slug: "services", label: "Service Overview", pageSlug: "services" },
      { slug: "product-development", label: "Product Development", pageSlug: "product-development" },
      { slug: "hardware-development", label: "Hardware Development", pageSlug: "hardware-development" },
      { slug: "embedded-firmware-development", label: "Embedded Firmware Development", pageSlug: "embedded-firmware-development" },
      { slug: "embedded-linux", label: "Embedded Linux", pageSlug: "embedded-linux" },
      { slug: "engineering-consulting", label: "Engineering Consulting", pageSlug: "engineering-consulting" },
      { slug: "ai-enabled-engineering", label: "AI-enabled Engineering", pageSlug: "ai-enabled-engineering" },
      { slug: "connectivity", label: "Connectivity", pageSlug: "connectivity" },
    ],
  },
  {
    slug: "industries",
    label: "Industries",
    sortOrder: 30,
    children: [
      { slug: "industries", label: "All Industries", pageSlug: "industries" },
      { slug: "manufacturing", label: "Manufacturing", pageSlug: "manufacturing" },
      { slug: "industrial-automation", label: "Industrial Automation", pageSlug: "industrial-automation" },
      { slug: "oil-and-gas", label: "Oil & Gas", pageSlug: "oil-and-gas" },
      { slug: "renewable-energy", label: "Renewable Energy", pageSlug: "renewable-energy" },
      { slug: "smart-infrastructure", label: "Smart Infrastructure", pageSlug: "smart-infrastructure" },
      { slug: "telecom", label: "Telecom", pageSlug: "telecom" },
      { slug: "ev-infrastructure", label: "EV Infrastructure", pageSlug: "ev-infrastructure" },
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    sortOrder: 90,
    children: [
      { slug: "contact-us", label: "Contact Us", pageSlug: "contact-us" },
      { slug: "request-consultation", label: "Request Consultation", pageSlug: "request-consultation" },
      {
        slug: "contact-us-and-engineering-consultation",
        label: "Engineering Consultation",
        pageSlug: "contact-us-and-engineering-consultation",
      },
    ],
  },
  {
    slug: "legal",
    label: "Legal",
    sortOrder: 100,
    children: [
      { slug: "privacy-policy", label: "Privacy Policy", pageSlug: "privacy-policy" },
      { slug: "terms-and-conditions", label: "Terms & Conditions", pageSlug: "terms-and-conditions" },
    ],
  },
];

function createSequelize() {
  return new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
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

async function ensureCategory(sequelize, { slug, label, parentId = null, sortOrder = 0 }) {
  const [rows] = await sequelize.query(
    "SELECT id FROM page_categories WHERE slug = :slug LIMIT 1",
    { replacements: { slug } }
  );
  if (rows.length > 0) return rows[0].id;

  await sequelize.query(
    `INSERT INTO page_categories (slug, label, parent_id, sort_order, created_at, updated_at)
     VALUES (:slug, :label, :parentId, :sortOrder, NOW(), NOW())`,
    { replacements: { slug, label, parentId, sortOrder } }
  );
  const [idRows] = await sequelize.query("SELECT LAST_INSERT_ID() AS id");
  return idRows[0].id;
}

async function ensurePage(sequelize, { title, slug, categoryId, sortOrder = 0 }) {
  const [rows] = await sequelize.query(
    "SELECT id FROM pages WHERE slug = :slug LIMIT 1",
    { replacements: { slug } }
  );
  if (rows.length > 0) return rows[0].id;

  await sequelize.query(
    `INSERT INTO pages (title, slug, category_id, template, status, sort_order, created_at, updated_at)
     VALUES (:title, :slug, :categoryId, 'default', 'draft', :sortOrder, NOW(), NOW())`,
    { replacements: { title, slug, categoryId, sortOrder } }
  );
  const [idRows] = await sequelize.query("SELECT LAST_INSERT_ID() AS id");
  const pageId = idRows[0].id;

  await sequelize.query(
    `INSERT INTO page_seo (page_id, robots, created_at, updated_at)
     VALUES (:pageId, 'index', NOW(), NOW())`,
    { replacements: { pageId } }
  );

  return pageId;
}

async function walk(sequelize, nodes, parentId = null) {
  for (const node of nodes) {
    const categoryId = await ensureCategory(sequelize, {
      slug: node.slug,
      label: node.label,
      parentId,
      sortOrder: node.sortOrder ?? 0,
    });

    if (node.pageSlug) {
      await ensurePage(sequelize, {
        title: node.label,
        slug: node.pageSlug,
        categoryId,
      });
    }

    if (node.children?.length) {
      await walk(sequelize, node.children, categoryId);
    }
  }
}

async function main() {
  const sequelize = createSequelize();
  await sequelize.authenticate();

  const [tables] = await sequelize.query("SHOW TABLES LIKE 'page_categories'");
  if (tables.length === 0) {
    throw new Error("CMS tables not found. Run npm run db:migrate first.");
  }

  await walk(sequelize, CATEGORY_TREE);
  console.log("[seed-cms] Categories and draft pages seeded.");
  await sequelize.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
