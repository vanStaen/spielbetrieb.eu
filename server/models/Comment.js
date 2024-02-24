const { sequelize, DataTypes } = require("../lib/sequelizedb");
const { User } = require("./User");
const { Photo } = require("./Photo");

const Comment = sequelize.define("comment", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  dislikes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
});

User.hasMany(Comment);
Comment.belongsTo(User);

Photo.hasMany(Comment);
Comment.belongsTo(Photo);

module.exports = {
  Comment,
};
