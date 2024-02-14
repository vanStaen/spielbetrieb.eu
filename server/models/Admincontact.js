const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { User } = require('./User');

const Admincontact = sequelize.define("admincontact", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Admincontact);
Admincontact.belongsTo(User);

module.exports = {
  Admincontact
};

