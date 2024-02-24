const { sequelize, DataTypes } = require("../lib/sequelizedb");

const Chat = sequelize.define("chat", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  userlist: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = {
  Chat,
};
