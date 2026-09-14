import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class Job extends Model<
  InferAttributes<Job>,
  InferCreationAttributes<Job>
> {
  declare id: CreationOptional<number>;
  declare slug: string;
  declare title: string;
  declare location: CreationOptional<string | null>;
  declare description: CreationOptional<string | null>;
  declare status: CreationOptional<"draft" | "published">;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initJobModel(sequelize: Sequelize) {
  if (Job.sequelize) return Job;

  Job.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
      title: { type: DataTypes.STRING(255), allowNull: false },
      location: { type: DataTypes.STRING(190), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    { sequelize, tableName: "jobs" }
  );

  return Job;
}
