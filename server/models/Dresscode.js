import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Dresscode = sequelize.sequelize.define("dresscode", {
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
  media: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
