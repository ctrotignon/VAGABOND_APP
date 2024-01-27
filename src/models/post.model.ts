import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

interface PostAttributes {
	id?: number;
	user_id: number;
	type: string;
	mediaURL: string;
}
interface PostInstance extends Model<PostAttributes>, PostAttributes {}
const Post = sequelizeConnection.define(
	'Post',
	{
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mediaURL: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

type PostModelCtor = Model<PostInstance>;
export { Post, PostModelCtor };
