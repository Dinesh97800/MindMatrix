import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export type NewsletterStatus = "active" | "unsubscribed";

export class NewsletterSubscription extends Model<
  InferAttributes<NewsletterSubscription>,
  InferCreationAttributes<NewsletterSubscription>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare status: CreationOptional<NewsletterStatus>;
  declare source: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initNewsletterSubscriptionModel(sequelize: Sequelize) {
  if (NewsletterSubscription.sequelize) {
    return NewsletterSubscription;
  }

  NewsletterSubscription.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM("active", "unsubscribed"),
        allowNull: false,
        defaultValue: "active",
      },
      source: {
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: "home-footer",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "newsletter_subscriptions",
      indexes: [{ unique: true, fields: ["email"] }],
    }
  );

  return NewsletterSubscription;
}
