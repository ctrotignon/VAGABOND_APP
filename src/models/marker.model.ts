import { DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

export const Marker = sequelizeConnection.define(
	'Marker',
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		latitude: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		longitude: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);
