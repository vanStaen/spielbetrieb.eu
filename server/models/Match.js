import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Match = sequelize.sequelize.define("match", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  matchedUser: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
});
