const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { Usersfriends } = require('./Usersfriends');
const { Usersfollowers } = require('./Usersfollowers');

const User = sequelize.define('user', {
  _id: {
    type: DataTypes.INTEGER,
    field: '_id',
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emailSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  profilSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verifiedIdentity: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true
  },
  orientation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wishes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  usernameChange: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastActive: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  adminRoles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  isPartner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  partnerRoles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  partnertype: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  language: {
    type: DataTypes.STRING,
    defaultValue: 'en'
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  suspended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

User.belongsToMany(User, {
  as: 'friends',
  foreignKey: 'user_id',
  through: Usersfriends
});

User.belongsToMany(User, {
  as: 'userFriends',
  foreignKey: 'friend_id',
  through: Usersfriends
});

User.belongsToMany(User, {
  as: 'followers',
  foreignKey: 'follower_id',
  through: Usersfollowers
});

User.belongsToMany(User, {
  as: 'followed',
  foreignKey: 'followed_id',
  through: Usersfollowers
});

module.exports = {
  User
};
