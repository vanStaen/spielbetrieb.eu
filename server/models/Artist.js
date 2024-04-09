import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Artist = sequelize.sequelize.define("artist", {
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
  links: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  pictures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
