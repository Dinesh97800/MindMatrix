import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export type SiteSettingGroup =
  | "general"
  | "company"
  | "contact"
  | "social"
  | "seo"
  | "footer";

export class SiteSetting extends Model<
  InferAttributes<SiteSetting>,
  InferCreationAttributes<SiteSetting>
> {
  declare id: CreationOptional<number>;
  declare group: SiteSettingGroup;
  declare key: string;
  declare value: unknown;
  declare updatedBy: CreationOptional<number | null>;
  declare updatedAt: CreationOptional<Date>;
}

export function initSiteSettingModel(sequelize: Sequelize) {
  if (SiteSetting.sequelize) return SiteSetting;

  SiteSetting.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      group: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      value: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "updated_by",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      sequelize,
      tableName: "site_settings",
      timestamps: false,
      indexes: [{ unique: true, fields: ["group", "key"] }],
    }
  );

  return SiteSetting;
}
