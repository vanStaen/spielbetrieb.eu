const { sequelize, DataTypes } = require("../lib/sequelizedb");
const { User } = require("./User");

const Photo = sequelize.define("photo", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrlThumb: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrlThumbBlur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flagOver18: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  likes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Photo);
Photo.belongsTo(User);

module.exports = {
  Photo,
};
