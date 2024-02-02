'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Like = void 0;
const sequelize_1 = require('sequelize');
const databaseConfig_1 = require('../config/databaseConfig');
exports.Like = databaseConfig_1.sequelizeConnection.define(
	'Like',
	{
		postId: {
			type: sequelize_1.DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
		userId: {
			type: sequelize_1.DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
	},
	{
		timestamps: false,
	}
);
