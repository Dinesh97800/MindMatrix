/** @param {import('sequelize').QueryInterface} queryInterface */
async function tableExists(queryInterface, tableName) {
  const tables = await queryInterface.showAllTables();
  return tables.some((table) => {
    const name = typeof table === "string" ? table : Object.values(table)[0];
    return name === tableName;
  });
}

/** @param {import('sequelize').QueryInterface} queryInterface */
async function columnExists(queryInterface, tableName, columnName) {
  const description = await queryInterface.describeTable(tableName);
  return Boolean(description[columnName]);
}

/** @param {import('sequelize').QueryInterface} queryInterface */
async function addColumnIfMissing(queryInterface, tableName, columnName, spec) {
  if (await columnExists(queryInterface, tableName, columnName)) {
    console.log(`[003] Skip ${tableName}.${columnName} (already exists)`);
    return;
  }
  await queryInterface.addColumn(tableName, columnName, spec);
}

/** @param {import('sequelize').QueryInterface} queryInterface */
async function createTableIfMissing(queryInterface, tableName, attributes) {
  if (await tableExists(queryInterface, tableName)) {
    console.log(`[003] Skip ${tableName} (already exists)`);
    return;
  }
  await queryInterface.createTable(tableName, attributes);
}

/** @param {import('sequelize').QueryInterface} queryInterface @param {import('sequelize').Sequelize} Sequelize */
export async function up(queryInterface, Sequelize) {
  await addColumnIfMissing(queryInterface, "pages", "classification", {
    type: Sequelize.ENUM("active", "redirect"),
    allowNull: false,
    defaultValue: "active",
  });
  await addColumnIfMissing(queryInterface, "pages", "redirect_target", {
    type: Sequelize.STRING(255),
    allowNull: true,
  });
  await addColumnIfMissing(queryInterface, "pages", "publishable", {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  });

  await addColumnIfMissing(queryInterface, "page_sections", "stable_key", {
    type: Sequelize.STRING(190),
    allowNull: true,
  });
  await addColumnIfMissing(queryInterface, "page_sections", "model", {
    type: Sequelize.STRING(40),
    allowNull: true,
  });
  await addColumnIfMissing(queryInterface, "page_sections", "template", {
    type: Sequelize.STRING(190),
    allowNull: true,
  });
  await addColumnIfMissing(queryInterface, "page_sections", "source_meta", {
    type: Sequelize.JSON,
    allowNull: true,
  });
  await addColumnIfMissing(queryInterface, "page_sections", "editor_policy", {
    type: Sequelize.JSON,
    allowNull: true,
  });
  await addColumnIfMissing(queryInterface, "page_sections", "decorations", {
    type: Sequelize.JSON,
    allowNull: true,
  });

  const timestamps = {
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  };

  await createTableIfMissing(queryInterface, "cms_archive_pages", {
    archive_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    archive_batch: { type: Sequelize.STRING(80), allowNull: false },
    archive_reason: { type: Sequelize.STRING(80), allowNull: false },
    original_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    payload: { type: Sequelize.JSON, allowNull: false },
    archived_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await createTableIfMissing(queryInterface, "cms_archive_page_sections", {
    archive_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    archive_batch: { type: Sequelize.STRING(80), allowNull: false },
    archive_reason: { type: Sequelize.STRING(80), allowNull: false },
    original_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    page_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    payload: { type: Sequelize.JSON, allowNull: false },
    archived_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await createTableIfMissing(queryInterface, "case_studies", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: { type: Sequelize.STRING(160), allowNull: false, unique: true },
    title: { type: Sequelize.STRING(255), allowNull: false },
    requirement: { type: Sequelize.TEXT, allowNull: true },
    responsibility: { type: Sequelize.TEXT, allowNull: true },
    technology: { type: Sequelize.TEXT, allowNull: true },
    challenge: { type: Sequelize.TEXT, allowNull: true },
    solution: { type: Sequelize.TEXT, allowNull: true },
    result: { type: Sequelize.TEXT, allowNull: true },
    status: {
      type: Sequelize.ENUM("draft", "published"),
      allowNull: false,
      defaultValue: "draft",
    },
    ...timestamps,
  });

  await createTableIfMissing(queryInterface, "resources", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: { type: Sequelize.STRING(160), allowNull: false, unique: true },
    title: { type: Sequelize.STRING(255), allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: true },
    file_url: { type: Sequelize.STRING(500), allowNull: true },
    media_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
    status: {
      type: Sequelize.ENUM("draft", "published"),
      allowNull: false,
      defaultValue: "draft",
    },
    ...timestamps,
  });

  await createTableIfMissing(queryInterface, "jobs", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: { type: Sequelize.STRING(160), allowNull: false, unique: true },
    title: { type: Sequelize.STRING(255), allowNull: false },
    location: { type: Sequelize.STRING(190), allowNull: true },
    description: { type: Sequelize.TEXT, allowNull: true },
    status: {
      type: Sequelize.ENUM("draft", "published"),
      allowNull: false,
      defaultValue: "draft",
    },
    ...timestamps,
  });

  await createTableIfMissing(queryInterface, "page_revisions", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "pages", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    revision_type: {
      type: Sequelize.ENUM("draft", "published"),
      allowNull: false,
    },
    snapshot: { type: Sequelize.JSON, allowNull: false },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await createTableIfMissing(queryInterface, "page_section_revisions", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "pages", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    page_section_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
    stable_key: { type: Sequelize.STRING(190), allowNull: false },
    revision_type: {
      type: Sequelize.ENUM("draft", "published"),
      allowNull: false,
    },
    snapshot: { type: Sequelize.JSON, allowNull: false },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  try {
    await queryInterface.addIndex("page_revisions", ["page_id", "revision_type"]);
    await queryInterface.addIndex("page_section_revisions", [
      "page_id",
      "stable_key",
    ]);
    await queryInterface.addIndex("cms_archive_page_sections", [
      "archive_batch",
    ]);
    await queryInterface.addIndex("cms_archive_pages", ["archive_batch"]);
  } catch {
    // Indexes may already exist.
  }
}

/** @param {import('sequelize').QueryInterface} queryInterface */
export async function down(queryInterface) {
  await queryInterface.dropTable("page_section_revisions");
  await queryInterface.dropTable("page_revisions");
  await queryInterface.dropTable("jobs");
  await queryInterface.dropTable("resources");
  await queryInterface.dropTable("case_studies");
  await queryInterface.dropTable("cms_archive_page_sections");
  await queryInterface.dropTable("cms_archive_pages");

  for (const column of [
    "decorations",
    "editor_policy",
    "source_meta",
    "template",
    "model",
    "stable_key",
  ]) {
    try {
      await queryInterface.removeColumn("page_sections", column);
    } catch {
      // ignore
    }
  }
  for (const column of ["publishable", "redirect_target", "classification"]) {
    try {
      await queryInterface.removeColumn("pages", column);
    } catch {
      // ignore
    }
  }
}
