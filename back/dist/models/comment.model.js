"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const databaseConfig_1 = require("../config/databaseConfig");
exports.Comment = databaseConfig_1.sequelizeConnection.define("Comment", {
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: false,
});
