import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

type UserAttributes = {
	id?: number;
	email: string;
	username: string;
	password: string;
	isVerified: boolean;
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

type UserInstance = Model<UserAttributes, UserCreationAttributes> & UserAttributes;

const User = sequelizeConnection.define<UserInstance>(
	'User',
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		timestamps: true,
	}
);

export { User, UserAttributes, UserCreationAttributes };
