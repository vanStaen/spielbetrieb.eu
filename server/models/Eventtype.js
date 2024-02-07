const { sequelize, DataTypes } = require('../lib/sequelizedb');

const Eventtype = sequelize.define("eventtype", {
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
  Eventtype
};

