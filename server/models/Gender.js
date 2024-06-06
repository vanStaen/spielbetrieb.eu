import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Gender = sequelize.sequelize.define("gender", {
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
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
