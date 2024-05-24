import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Notification = sequelize.sequelize.define("notification", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
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
  data: {
    type: DataTypes.STRING,
    required: false,
  },
  actionData: {
    type: DataTypes.INTEGER,
    required: false,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

User.hasMany(Notification);
Notification.belongsTo(User);