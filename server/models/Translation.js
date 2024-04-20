import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Translation = sequelize.sequelize.define("translation", {
    _id: {
        type: DataTypes.INTEGER,
        field: "_id",
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING(2),
        allowNull: false,
    },
});
