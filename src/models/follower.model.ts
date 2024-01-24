import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

type FollowerAttributes = {
	id?: number;
	follower_user_id: number;
	following_user_id: number;
};

type FollowerCreationAttributes = Optional<FollowerAttributes, 'id'>;

type FollowerInstance = Model<FollowerAttributes, FollowerCreationAttributes> & FollowerAttributes;

const Follower = sequelizeConnection.define<FollowerInstance>(
	'Follower',
	{
		follower_user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		following_user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

export { Follower };
