import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Photo = sequelize.sequelize.define("photo", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrlThumb: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrlThumbBlur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flagOver18: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  likes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Photo);
Photo.belongsTo(User);
