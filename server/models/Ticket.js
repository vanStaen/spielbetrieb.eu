import { sequelize, DataTypes } from "../lib/sequelizedb.js";

// TODO: bitte ergänzen
// GraphQl endpoint vorbereiten
export const Ticket = sequelize.sequelize.define("ticket", {
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
