import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export type BlogStatus = "draft" | "published" | "archived";

export class Blog extends Model<
  InferAttributes<Blog>,
  InferCreationAttributes<Blog>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare slug: string;
  declare excerpt: CreationOptional<string | null>;
  declare content: CreationOptional<Record<string, unknown> | null>;
  declare featuredMediaId: CreationOptional<number | null>;
  declare featuredImageAlt: CreationOptional<string | null>;
  declare authorId: CreationOptional<number | null>;
  declare categoryId: CreationOptional<number | null>;
  declare tags: CreationOptional<string[] | null>;
  declare status: CreationOptional<BlogStatus>;
  declare publishedAt: CreationOptional<Date | null>;
  declare metaTitle: CreationOptional<string | null>;
  declare metaDescription: CreationOptional<string | null>;
  declare metaKeywords: CreationOptional<string | null>;
  declare ogTitle: CreationOptional<string | null>;
  declare ogDescription: CreationOptional<string | null>;
  declare ogImageId: CreationOptional<number | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initBlogModel(sequelize: Sequelize) {
  if (Blog.sequelize) return Blog;

  Blog.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING(255), allowNull: false },
      slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
      excerpt: { type: DataTypes.TEXT, allowNull: true },
      content: { type: DataTypes.JSON, allowNull: true },
      featuredMediaId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "featured_media_id",
      },
      featuredImageAlt: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "featured_image_alt",
      },
      authorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "author_id",
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "category_id",
      },
      tags: { type: DataTypes.JSON, allowNull: true },
      status: {
        type: DataTypes.ENUM("draft", "published", "archived"),
        allowNull: false,
        defaultValue: "draft",
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "published_at",
      },
      metaTitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "meta_title",
      },
      metaDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "meta_description",
      },
      metaKeywords: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "meta_keywords",
      },
      ogTitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "og_title",
      },
      ogDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "og_description",
      },
      ogImageId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "og_image_id",
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      sequelize,
      tableName: "blogs",
      indexes: [
        { fields: ["status"] },
        { fields: ["published_at"] },
        { fields: ["category_id"] },
      ],
    }
  );

  return Blog;
}
