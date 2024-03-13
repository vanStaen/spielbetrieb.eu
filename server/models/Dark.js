import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Dark = sequelize.sequelize.define("dark", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pictures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
