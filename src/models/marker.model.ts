import { DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

export const Marker = sequelizeConnection.define(
	'Marker',
	{
		user_id: {
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

// import { DataTypes, Model } from 'sequelize';
// import { sequelizeConnection } from '../config/databaseConfig';

// type MarkerAttributes = {
// 	id?: number;
// 	user_id: number;
// 	title: string;
// 	type: string;
// 	description: string;
// 	latitude: number;
// 	longitude: number;
// };

// export type MarkerInstance = Model<MarkerAttributes> & MarkerAttributes;

// export const Marker = sequelizeConnection.define(
// 	'Marker',
// 	{
// 		user_id: {
// 			type: DataTypes.INTEGER,
// 			allowNull: false,
// 		},
// 		title: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		type: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		description: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		latitude: {
// 			type: DataTypes.DOUBLE,
// 			allowNull: false,
// 		},
// 		longitude: {
// 			type: DataTypes.DOUBLE,
// 			allowNull: false,
// 		},
// 	},
// 	{
// 		timestamps: false,
// 		// Ajoute cette option pour accéder aux propriétés du modèle directement
// 		getterMethods: {
// 			user_id: function (this: MarkerInstance) {
// 				return this.getDataValue('user_id');
// 			},
// 		},
// 	}
// );
