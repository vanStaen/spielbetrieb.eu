import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Tag = sequelize.sequelize.define("tag", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isUserTag: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isEventTag: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isPictureTag: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  showInfilter: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
