import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Event = sequelize.sequelize.define("event", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  externalId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  partnerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventtype: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pictures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  externalPicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  locationName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  locationAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  locationCoordinates: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fromDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  untilDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  eventTags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  hasDresscode: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dresscodeDoTags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  dresscodeDontTags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  prices: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  lineUp: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  equipment: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  ageMin: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "eur",
  },
  links: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  attendees: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  invited: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  admin: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  forwardable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  allowAnonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDraft: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Event);
Event.belongsTo(User);
