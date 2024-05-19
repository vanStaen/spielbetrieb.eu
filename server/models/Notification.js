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
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

User.hasMany(Notification);
Notification.belongsTo(User);

// TODO: Define notificationType
/*
types:
  0: Fallback
  1: New Friend request
  11: (your sent) Friend requested accepted
  12: (your sent) Friend requested refused
  2: New Follower
  3: New Message
  41: (an) Event invite received 
  42: (your) Event Invite accepted 
  43: (your) Event Invite refused
  51: New Event from followed partner 
  52: New Shop article from followed partner
  61: New Avatar from friends/followed
  9: Spielbetrieb anouncement
*/
