const { sequelize, DataTypes } = require("../lib/sequelizedb");

const Subscriber = sequelize.define("subscriber", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  about: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  lists: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = {
  Subscriber,
};
