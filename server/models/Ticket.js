const { sequelize, DataTypes } = require('../helpers/sequelizedb');

// TODO: bitte ergänzen
// GraphQl endpoint vorbereiten
const Ticket = sequelize.define("ticket", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  punched: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = {
  Ticket
};
