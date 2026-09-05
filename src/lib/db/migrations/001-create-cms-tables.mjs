/** @param {import('sequelize').QueryInterface} queryInterface */
async function tableExists(queryInterface, tableName) {
  const tables = await queryInterface.showAllTables();
  return tables.some((table) => {
    const name = typeof table === "string" ? table : Object.values(table)[0];
    return name === tableName;
  });
}

/** @param {import('sequelize').QueryInterface} queryInterface */
async function createTableIfMissing(queryInterface, tableName, attributes, options) {
  if (await tableExists(queryInterface, tableName)) {
    console.log(`[001] Skip ${tableName} (already exists)`);
    return false;
  }
  await queryInterface.createTable(tableName, attributes, options);
  return true;
}

/** @param {import('sequelize').QueryInterface} queryInterface @param {import('sequelize').Sequelize} Sequelize */
export async function up(queryInterface, Sequelize) {
  await createTableIfMissing(queryInterface, "page_categories", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: Sequelize.STRING(120),
      allowNull: false,
      unique: true,
    },
    label: {
      type: Sequelize.STRING(160),
      allowNull: false,
    },
    parent_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "page_categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    sort_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    icon: {
      type: Sequelize.STRING(80),
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
  });

  try {
    await queryInterface.addIndex("page_categories", ["parent_id"]);
    await queryInterface.addIndex("page_categories", ["sort_order"]);
  } catch {
    // Indexes may already exist from a partial run.
  }

  await createTableIfMissing(queryInterface, "media", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    filename: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    original_filename: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    mime_type: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },
    file_size: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    width: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    height: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    alt_text: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    caption: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    storage_path: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    public_url: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    uploaded_by: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
  });

  try {
    await queryInterface.addIndex("media", ["uploaded_by"]);
    await queryInterface.addIndex("media", ["created_at"]);
  } catch {
    // Ignore duplicate index errors on retry.
  }

  await createTableIfMissing(queryInterface, "pages", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING(160),
      allowNull: false,
      unique: true,
    },
    category_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "page_categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    template: {
      type: Sequelize.STRING(80),
      allowNull: false,
      defaultValue: "default",
    },
    status: {
      type: Sequelize.ENUM("draft", "published"),
      allowNull: false,
      defaultValue: "draft",
    },
    sort_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    published_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    created_by: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    updated_by: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
  });

  try {
    await queryInterface.addIndex("pages", ["category_id"]);
    await queryInterface.addIndex("pages", ["status"]);
    await queryInterface.addIndex("pages", ["sort_order"]);
    await queryInterface.addIndex("pages", ["created_by"]);
    await queryInterface.addIndex("pages", ["updated_by"]);
  } catch {
    // Ignore duplicate index errors on retry.
  }

  await createTableIfMissing(queryInterface, "page_sections", {
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
    type: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },
    sort_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    data: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {},
    },
    is_visible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
  });

  try {
    await queryInterface.addIndex("page_sections", ["page_id"]);
    await queryInterface.addIndex("page_sections", ["sort_order"]);
  } catch {
    // Ignore duplicate index errors on retry.
  }

  await createTableIfMissing(queryInterface, "page_seo", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      references: { model: "pages", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    meta_title: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    meta_description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    canonical_url: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    og_title: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    og_description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    og_image_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "media", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    robots: {
      type: Sequelize.ENUM("index", "noindex"),
      allowNull: false,
      defaultValue: "index",
    },
    keywords: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
  });

  await createTableIfMissing(queryInterface, "blog_categories", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(160),
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING(160),
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    sort_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
  });

  await createTableIfMissing(queryInterface, "blogs", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING(160),
      allowNull: false,
      unique: true,
    },
    excerpt: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    content: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    featured_media_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "media", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    featured_image_alt: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    author_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    category_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "blog_categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    tags: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM("draft", "published", "archived"),
      allowNull: false,
      defaultValue: "draft",
    },
    published_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    meta_title: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    meta_description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    meta_keywords: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    og_title: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    og_description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    og_image_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "media", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
  });

  try {
    await queryInterface.addIndex("blogs", ["status"]);
    await queryInterface.addIndex("blogs", ["published_at"]);
    await queryInterface.addIndex("blogs", ["category_id"]);
    await queryInterface.addIndex("blogs", ["author_id"]);
  } catch {
    // Ignore duplicate index errors on retry.
  }

  await createTableIfMissing(queryInterface, "site_settings", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    group: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },
    key: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },
    value: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    updated_by: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
  });

  try {
    await queryInterface.addConstraint("site_settings", {
      fields: ["group", "key"],
      type: "unique",
      name: "site_settings_group_key_unique",
    });
    await queryInterface.addIndex("site_settings", ["updated_by"]);
  } catch {
    // Ignore duplicate constraint/index errors on retry.
  }
}

/** @param {import('sequelize').QueryInterface} queryInterface */
export async function down(queryInterface) {
  await queryInterface.dropTable("site_settings");
  await queryInterface.dropTable("blogs");
  await queryInterface.dropTable("blog_categories");
  await queryInterface.dropTable("page_seo");
  await queryInterface.dropTable("page_sections");
  await queryInterface.dropTable("pages");
  await queryInterface.dropTable("media");
  await queryInterface.dropTable("page_categories");
}
