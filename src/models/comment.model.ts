// import { DataTypes } from 'sequelize';
// import { sequelizeConnection } from '../config/databaseConfig';

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

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../config/databaseConfig';

type CommentAttributes = {
	id?: number;
	content: string;
	post_id: number;
	user_id: number;
};

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;
type CommentInstance = Model<CommentAttributes, CommentCreationAttributes> & CommentAttributes;

const Comment = sequelizeConnection.define<CommentInstance>(
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

export { Comment };
