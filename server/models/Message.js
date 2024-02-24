const { sequelize, DataTypes } = require("../lib/sequelizedb");
const { User } = require("./User");
const { Chat } = require("./Chat");

const Message = sequelize.define("message", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attachedPhotoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Message);
Message.belongsTo(User);

Chat.hasMany(Message);
Message.belongsTo(Chat);

module.exports = {
  Message,
};
