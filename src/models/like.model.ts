import { DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

export const Like = sequelizeConnection.define(
	'Like',
	{
		postId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);
