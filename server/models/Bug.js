import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Bug = sequelize.sequelize.define("Bug", {
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
  isUrgent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isResolved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
