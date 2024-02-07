const { sequelize, DataTypes } = require('../lib/sequelizedb');

const Usersfriends = sequelize.define("usersfriends", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  friend_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pending: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = {
  Usersfriends
};
