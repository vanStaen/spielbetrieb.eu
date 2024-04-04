import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Eventtype = sequelize.sequelize.define("eventtype", {
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
  usage: { //0 for both, 1 for .eu, 2 for .info
    type: DataTypes.INTEGER,
    defaultValue: 0,
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
