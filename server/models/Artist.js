import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Artist = sequelize.sequelize.define("artist", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  links: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  pictures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  reviews: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  artistType: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
