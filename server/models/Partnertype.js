const { sequelize, DataTypes } = require('../lib/sequelizedb');

const Partnertype = sequelize.define("partnertype", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = {
  Partnertype
};

