import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Partnertype = sequelize.sequelize.define("partnertype", {
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
});
