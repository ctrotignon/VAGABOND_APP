"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follower = void 0;
const sequelize_1 = require("sequelize");
const databaseConfig_1 = require("../config/databaseConfig");
const Follower = databaseConfig_1.sequelizeConnection.define('Follower', {
    followerUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    followingUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});
exports.Follower = Follower;
