import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Chat = sequelize.sequelize.define("chat", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  userlist: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
