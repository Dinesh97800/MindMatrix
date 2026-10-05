import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class Resource extends Model<
  InferAttributes<Resource>,
  InferCreationAttributes<Resource>
> {
  declare id: CreationOptional<number>;
  declare slug: string;
  declare title: string;
  declare description: CreationOptional<string | null>;
  declare fileUrl: CreationOptional<string | null>;
  declare mediaId: CreationOptional<number | null>;
  declare status: CreationOptional<"draft" | "published">;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initResourceModel(sequelize: Sequelize) {
  if (Resource.sequelize) return Resource;

  Resource.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
      title: { type: DataTypes.STRING(255), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      fileUrl: { type: DataTypes.STRING(500), allowNull: true, field: "file_url" },
      mediaId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "media_id",
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    { sequelize, tableName: "resources" }
  );

  return Resource;
}
