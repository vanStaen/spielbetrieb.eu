const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { UsersFriends } = require("./UsersFriends");
const { UsersFollowers } = require("./UsersFollowers");

const User = sequelize.define("user", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  profilSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verifiedIdentity: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  orientation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wishes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  usernameChange: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastActive: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.belongsToMany(User, {
  as: 'friends',
  foreignKey: 'user_id',
  through: UsersFriends
});

User.belongsToMany(User, {
  as: 'userFriends',
  foreignKey: 'friend_id',
  through: UsersFriends
});

User.belongsToMany(User, {
  as: 'followers',
  foreignKey: 'follower_id',
  through: UsersFollowers
});

User.belongsToMany(User, {
  as: 'followed',
  foreignKey: 'followed_id',
  through: UsersFollowers
});


module.exports = {
  User
};
