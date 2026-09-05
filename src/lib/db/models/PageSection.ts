import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class PageSection extends Model<
  InferAttributes<PageSection>,
  InferCreationAttributes<PageSection>
> {
  declare id: CreationOptional<number>;
  declare pageId: number;
  declare type: string;
  declare sortOrder: CreationOptional<number>;
  declare data: CreationOptional<Record<string, unknown>>;
  declare isVisible: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initPageSectionModel(sequelize: Sequelize) {
  if (PageSection.sequelize) return PageSection;

  PageSection.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      pageId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "page_id",
      },
      type: { type: DataTypes.STRING(80), allowNull: false },
      sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "sort_order",
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      isVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_visible",
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      sequelize,
      tableName: "page_sections",
      indexes: [{ fields: ["page_id"] }, { fields: ["sort_order"] }],
    }
  );

  return PageSection;
}
