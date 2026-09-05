/** Adds optional FK constraints to admin_users after base tables exist. */
/** @param {import('sequelize').QueryInterface} queryInterface @param {import('sequelize').Sequelize} Sequelize */

async function tableExists(queryInterface, tableName) {
  const tables = await queryInterface.showAllTables();
  return tables.some((table) => {
    const name = typeof table === "string" ? table : Object.values(table)[0];
    return name === tableName;
  });
}

async function addFk(queryInterface, tableName, fields, name) {
  try {
    await queryInterface.addConstraint(tableName, {
      fields,
      type: "foreign key",
      name,
      references: {
        table: "admin_users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    console.log(`[002] Added FK ${name}`);
  } catch (error) {
    console.log(`[002] Skip FK ${name}: ${error.message}`);
  }
}

export async function up(queryInterface) {
  if (!(await tableExists(queryInterface, "admin_users"))) {
    console.log("[002] admin_users not found — skipping admin FK constraints.");
    console.log("[002] Run `npm run db:seed` first, then re-run this migration if desired.");
    return;
  }

  await addFk(queryInterface, "media", ["uploaded_by"], "media_uploaded_by_admin_users_fk");
  await addFk(queryInterface, "pages", ["created_by"], "pages_created_by_admin_users_fk");
  await addFk(queryInterface, "pages", ["updated_by"], "pages_updated_by_admin_users_fk");
  await addFk(queryInterface, "blogs", ["author_id"], "blogs_author_id_admin_users_fk");
  await addFk(
    queryInterface,
    "site_settings",
    ["updated_by"],
    "site_settings_updated_by_admin_users_fk"
  );
}

export async function down(queryInterface) {
  const constraints = [
    ["media", "media_uploaded_by_admin_users_fk"],
    ["pages", "pages_created_by_admin_users_fk"],
    ["pages", "pages_updated_by_admin_users_fk"],
    ["blogs", "blogs_author_id_admin_users_fk"],
    ["site_settings", "site_settings_updated_by_admin_users_fk"],
  ];

  for (const [tableName, name] of constraints) {
    try {
      await queryInterface.removeConstraint(tableName, name);
    } catch {
      // Ignore missing constraints.
    }
  }
}
