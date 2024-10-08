"use strict";
// import { DataTypes } from 'sequelize';
// import { sequelizeConnection } from '../config/databaseConfig';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
// export const Comment = sequelizeConnection.define(
// 	'Comment',
// 	{
// 		content: {
// 			type: DataTypes.TEXT,
// 			allowNull: false,
// 		},
// 		post_id: {
// 			type: DataTypes.INTEGER,
// 			allowNull: false,
// 		},
// 		user_id: {
// 			type: DataTypes.INTEGER,
// 			allowNull: false,
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	}
// );
const sequelize_1 = require("sequelize");
const databaseConfig_1 = require("../config/databaseConfig");
const Comment = databaseConfig_1.sequelizeConnection.define('Comment', {
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});
exports.Comment = Comment;
