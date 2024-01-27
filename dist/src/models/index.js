"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const post_model_1 = require("./post.model");
const follower_model_1 = require("./follower.model");
const comment_model_1 = require("./comment.model");
// relation entre User et Post
// User.hasMany(Post);
// Post.belongsTo(User);
post_model_1.Post.belongsTo(user_model_1.User, { foreignKey: 'user_id', targetKey: 'id' });
user_model_1.User.hasMany(post_model_1.Post, { foreignKey: 'user_id', sourceKey: 'id' });
// relation entre Follow et User
follower_model_1.Follower.belongsTo(user_model_1.User, { foreignKey: 'follower_user_id', as: 'follower' });
follower_model_1.Follower.belongsTo(user_model_1.User, { foreignKey: 'following_user_id', as: 'following' });
user_model_1.User.hasMany(follower_model_1.Follower, { foreignKey: 'follower_user_id', as: 'followers' });
user_model_1.User.hasMany(follower_model_1.Follower, { foreignKey: 'following_user_id', as: 'following' });
comment_model_1.Comment.belongsTo(user_model_1.User, { foreignKey: 'user_id', targetKey: 'id' });
user_model_1.User.hasMany(post_model_1.Post, { foreignKey: 'user_id', sourceKey: 'id' });
