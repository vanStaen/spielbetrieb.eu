const { sequelize, DataTypes } = require("../lib/sequelizedb");
const { User } = require("./User");

const Review = sequelize.define("review", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  edited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: null,
  },
});

User.hasMany(Review);
Review.belongsTo(User);

module.exports = {
  Review,
};
