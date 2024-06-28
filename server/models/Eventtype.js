import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Eventtype = sequelize.sequelize.define("eventtype", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usage: {
    // Main types, sub types, admin only
    type: DataTypes.STRING,
    defaultValue: "main",
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
