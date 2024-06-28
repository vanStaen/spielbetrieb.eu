import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";
import { Partnersfollower } from "./Partnersfollower.js";

export const Partner = sequelize.sequelize.define("partner", {
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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pictures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  profilSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  reviews: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  lastActive: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  partnerRoles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  partnertype: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  suspended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Partner);
Partner.belongsTo(User);

User.belongsToMany(Partner, {
  as: "partnerfollowers",
  foreignKey: "userfollower_id",
  through: Partnersfollower,
});
