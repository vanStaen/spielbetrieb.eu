import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";
import { Chat } from "./Chat.js";

export const Message = sequelize.sequelize.define("message", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attachedPhotoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Message);
Message.belongsTo(User);

Chat.hasMany(Message);
Message.belongsTo(Chat);
