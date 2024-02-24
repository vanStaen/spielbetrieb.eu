const { sequelize, DataTypes } = require("../lib/sequelizedb");
const { User } = require("./User");

const Visitor = sequelize.define("visitor", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  visitedId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  visitorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

User.hasMany(Visitor);
Visitor.belongsTo(User);

module.exports = {
  Visitor,
};
