"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const post_model_1 = require("./post.model");
const follower_model_1 = require("./follower.model");
const comment_model_1 = require("./comment.model");
// relation entre User et Post
// User.hasMany(Post);
// Post.belongsTo(User);
post_model_1.Post.belongsTo(user_model_1.User, { foreignKey: 'userId', targetKey: 'id' });
user_model_1.User.hasMany(post_model_1.Post, { foreignKey: 'userId', sourceKey: 'id' });
// relation entre Follow et User
follower_model_1.Follower.belongsTo(user_model_1.User, { foreignKey: 'followerUserId', as: 'follower' });
follower_model_1.Follower.belongsTo(user_model_1.User, { foreignKey: 'followingUserId', as: 'following' });
user_model_1.User.hasMany(follower_model_1.Follower, { foreignKey: 'followerUserId', as: 'followers' });
user_model_1.User.hasMany(follower_model_1.Follower, { foreignKey: 'followingUserId', as: 'following' });
comment_model_1.Comment.belongsTo(user_model_1.User, { foreignKey: 'userId', targetKey: 'id' });
user_model_1.User.hasMany(post_model_1.Post, { foreignKey: 'userId', sourceKey: 'id' });
