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
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pictures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  links: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  address: {
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
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

module.exports = {
  Location
};

