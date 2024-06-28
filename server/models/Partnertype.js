import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Partnertype = sequelize.sequelize.define("partnertype", {
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
});
