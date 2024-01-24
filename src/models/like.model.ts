import { DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

export const Like = sequelizeConnection.define(
	'Like',
	{
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
		timestamps: false,
	}
);
