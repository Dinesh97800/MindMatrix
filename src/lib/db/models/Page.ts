import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export type PageStatus = "draft" | "published";

export class Page extends Model<
  InferAttributes<Page>,
  InferCreationAttributes<Page>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare slug: string;
  declare categoryId: CreationOptional<number | null>;
  declare template: CreationOptional<string>;
  declare status: CreationOptional<PageStatus>;
  declare sortOrder: CreationOptional<number>;
  declare publishedAt: CreationOptional<Date | null>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initPageModel(sequelize: Sequelize) {
  if (Page.sequelize) return Page;

  Page.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING(255), allowNull: false },
      slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "category_id",
      },
      template: {
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: "default",
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "sort_order",
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "published_at",
      },
      createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "created_by",
      },
      updatedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "updated_by",
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      sequelize,
      tableName: "pages",
      indexes: [
        { fields: ["category_id"] },
        { fields: ["status"] },
        { fields: ["sort_order"] },
      ],
    }
  );

  return Page;
}
