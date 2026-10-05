import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export type SeoRobots = "index" | "noindex";

export class PageSEO extends Model<
  InferAttributes<PageSEO>,
  InferCreationAttributes<PageSEO>
> {
  declare id: CreationOptional<number>;
  declare pageId: number;
  declare metaTitle: CreationOptional<string | null>;
  declare metaDescription: CreationOptional<string | null>;
  declare canonicalUrl: CreationOptional<string | null>;
  declare ogTitle: CreationOptional<string | null>;
  declare ogDescription: CreationOptional<string | null>;
  declare ogImageId: CreationOptional<number | null>;
  declare robots: CreationOptional<SeoRobots>;
  declare keywords: CreationOptional<string[] | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initPageSEOModel(sequelize: Sequelize) {
  if (PageSEO.sequelize) return PageSEO;

  PageSEO.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      pageId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        field: "page_id",
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
      canonicalUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "canonical_url",
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
      robots: {
        type: DataTypes.ENUM("index", "noindex"),
        allowNull: false,
        defaultValue: "index",
      },
      keywords: { type: DataTypes.JSON, allowNull: true },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    { sequelize, tableName: "page_seo" }
  );

  return PageSEO;
}
