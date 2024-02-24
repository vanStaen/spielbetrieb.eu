const { sequelize, DataTypes } = require("../lib/sequelizedb");
const { User } = require("./User");

const Notification = sequelize.define("notification", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  notification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoLinkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userLinkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  eventLinkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notificationType: {
    type: DataTypes.STRING,
    defaultValue: "default",
  },
});

User.hasMany(Notification);
Notification.belongsTo(User);

module.exports = {
  Notification,
};
