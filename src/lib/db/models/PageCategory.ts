import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class PageCategory extends Model<
  InferAttributes<PageCategory>,
  InferCreationAttributes<PageCategory>
> {
  declare id: CreationOptional<number>;
  declare slug: string;
  declare label: string;
  declare parentId: CreationOptional<number | null>;
  declare sortOrder: CreationOptional<number>;
  declare icon: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initPageCategoryModel(sequelize: Sequelize) {
  if (PageCategory.sequelize) return PageCategory;

  PageCategory.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      label: { type: DataTypes.STRING(160), allowNull: false },
      parentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "parent_id",
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "sort_order",
      },
      icon: { type: DataTypes.STRING(80), allowNull: true },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      sequelize,
      tableName: "page_categories",
      indexes: [{ fields: ["parent_id"] }, { fields: ["sort_order"] }],
    }
  );

  return PageCategory;
}
