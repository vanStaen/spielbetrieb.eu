import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Usersfriend = sequelize.sequelize.define("usersfriend", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  friend_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
