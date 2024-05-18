import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Notification = sequelize.sequelize.define("notification", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  notification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoLinkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userLinkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  eventLinkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actionData: {
    type: DataTypes.INTEGER,
    required: false,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notificationType: {
    type: DataTypes.STRING,
    defaultValue: "default",
  },
});

User.hasMany(Notification);
Notification.belongsTo(User);

// TODO: Define notificationType
