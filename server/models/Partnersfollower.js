import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Partnersfollower = sequelize.sequelize.define("partnersfollower", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  userfollower_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  partner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
