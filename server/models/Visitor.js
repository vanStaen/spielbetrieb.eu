import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Visitor = sequelize.sequelize.define("visitor", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
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
