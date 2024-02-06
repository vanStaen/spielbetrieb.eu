const { sequelize, DataTypes } = require('../lib/sequelizedb');

const Location = sequelize.define("location", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  links: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coordinates: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  validated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  reviews: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  Location
};

