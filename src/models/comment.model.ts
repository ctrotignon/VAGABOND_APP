import { DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

export const Comment = sequelizeConnection.define(
	'Comment',
	{
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);
