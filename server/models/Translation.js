import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Translation = sequelize.sequelize.define("translation", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  en: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  de: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fr: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  es: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ru: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
