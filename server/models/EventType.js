const { sequelize, DataTypes } = require('../lib/sequelizedb');

const EventType = sequelize.define("eventType", {
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
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = {
  EventType
};

