const { sequelize, DataTypes } = require('../lib/sequelizedb');

const Match = sequelize.define("match", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  matchedUser: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  }
});

module.exports = {
  Match
};

