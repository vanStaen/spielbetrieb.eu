import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Usersfriendrequest = sequelize.sequelize.define(
  "usersfriendrequest",
  {
    _id: {
      type: DataTypes.INTEGER,
      field: "_id",
      autoIncrement: true,
      primaryKey: true,
    },
    requesting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requested_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
);