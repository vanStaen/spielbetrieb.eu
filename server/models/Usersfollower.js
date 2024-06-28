import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Usersfollower = sequelize.sequelize.define("usersfollower", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  follower_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followed_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
