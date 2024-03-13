import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Match = sequelize.sequelize.define("match", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  matchedUser: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
});
