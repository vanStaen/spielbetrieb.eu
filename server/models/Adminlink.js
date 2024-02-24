const { sequelize, DataTypes } = require("../lib/sequelizedb");
const { User } = require("./User");

const Adminlink = sequelize.define("adminlink", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  shortDesc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Adminlink);
Adminlink.belongsTo(User);

module.exports = {
  Adminlink,
};
