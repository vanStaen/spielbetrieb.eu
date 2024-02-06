const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { User } = require('./User');

const Event = sequelize.define("event", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  eventType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pictures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  location: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  locationName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  locationAdress: {
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
  tags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
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
});

User.hasMany(Event);
Event.belongsTo(User);

module.exports = {
  Event
};

