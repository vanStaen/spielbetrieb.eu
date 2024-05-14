import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Bug = sequelize.sequelize.define("bug", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  screenshot: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  url: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  isUrgent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isResolved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Bug);
Bug.belongsTo(User);
