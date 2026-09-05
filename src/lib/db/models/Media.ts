import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class Media extends Model<
  InferAttributes<Media>,
  InferCreationAttributes<Media>
> {
  declare id: CreationOptional<number>;
  declare filename: string;
  declare originalFilename: string;
  declare mimeType: string;
  declare fileSize: number;
  declare width: CreationOptional<number | null>;
  declare height: CreationOptional<number | null>;
  declare altText: CreationOptional<string | null>;
  declare caption: CreationOptional<string | null>;
  declare storagePath: string;
  declare publicUrl: string;
  declare uploadedBy: CreationOptional<number | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initMediaModel(sequelize: Sequelize) {
  if (Media.sequelize) return Media;

  Media.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      filename: { type: DataTypes.STRING(255), allowNull: false },
      originalFilename: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "original_filename",
      },
      mimeType: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: "mime_type",
      },
      fileSize: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "file_size",
      },
      width: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      height: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      altText: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "alt_text",
      },
      caption: { type: DataTypes.STRING(500), allowNull: true },
      storagePath: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: "storage_path",
      },
      publicUrl: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: "public_url",
      },
      uploadedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "uploaded_by",
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      sequelize,
      tableName: "media",
      indexes: [{ fields: ["uploaded_by"] }, { fields: ["created_at"] }],
    }
  );

  return Media;
}
