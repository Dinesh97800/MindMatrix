import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class CaseStudy extends Model<
  InferAttributes<CaseStudy>,
  InferCreationAttributes<CaseStudy>
> {
  declare id: CreationOptional<number>;
  declare slug: string;
  declare title: string;
  declare requirement: CreationOptional<string | null>;
  declare responsibility: CreationOptional<string | null>;
  declare technology: CreationOptional<string | null>;
  declare challenge: CreationOptional<string | null>;
  declare solution: CreationOptional<string | null>;
  declare result: CreationOptional<string | null>;
  declare status: CreationOptional<"draft" | "published">;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initCaseStudyModel(sequelize: Sequelize) {
  if (CaseStudy.sequelize) return CaseStudy;

  CaseStudy.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
      title: { type: DataTypes.STRING(255), allowNull: false },
      requirement: { type: DataTypes.TEXT, allowNull: true },
      responsibility: { type: DataTypes.TEXT, allowNull: true },
      technology: { type: DataTypes.TEXT, allowNull: true },
      challenge: { type: DataTypes.TEXT, allowNull: true },
      solution: { type: DataTypes.TEXT, allowNull: true },
      result: { type: DataTypes.TEXT, allowNull: true },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    { sequelize, tableName: "case_studies" }
  );

  return CaseStudy;
}
