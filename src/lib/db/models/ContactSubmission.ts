import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export type ContactSource =
  | "contact-us"
  | "engineering-consultation"
  | "request-consultation";

export type SubmissionStatus = "new" | "read" | "archived";

export class ContactSubmission extends Model<
  InferAttributes<ContactSubmission>,
  InferCreationAttributes<ContactSubmission>
> {
  declare id: CreationOptional<number>;
  declare source: ContactSource;
  declare name: string;
  declare email: string;
  declare phone: CreationOptional<string | null>;
  declare company: CreationOptional<string | null>;
  declare subject: CreationOptional<string | null>;
  declare message: string;
  declare metadata: CreationOptional<Record<string, unknown> | null>;
  declare status: CreationOptional<SubmissionStatus>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initContactSubmissionModel(sequelize: Sequelize) {
  if (ContactSubmission.sequelize) {
    return ContactSubmission;
  }

  ContactSubmission.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      source: {
        type: DataTypes.ENUM(
          "contact-us",
          "engineering-consultation",
          "request-consultation"
        ),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING(160),
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("new", "read", "archived"),
        allowNull: false,
        defaultValue: "new",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "contact_submissions",
      indexes: [
        { fields: ["source"] },
        { fields: ["status"] },
        { fields: ["createdAt"] },
      ],
    }
  );

  return ContactSubmission;
}
