import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

type FollowerAttributes = {
	id?: number;
	followerUserId: number;
	followingUserId: number;
};

type FollowerCreationAttributes = Optional<FollowerAttributes, 'id'>;

type FollowerInstance = Model<FollowerAttributes, FollowerCreationAttributes> & FollowerAttributes;

const Follower = sequelizeConnection.define<FollowerInstance>(
	'Follower',
	{
		followerUserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		followingUserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

export { Follower };
