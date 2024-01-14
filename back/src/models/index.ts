import { User } from './user.model';
import { Post } from './post.model';
import { Follower } from './follower.model';
import { Comment } from './comment.model';

// relation entre User et Post

// User.hasMany(Post);
// Post.belongsTo(User);

Post.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
User.hasMany(Post, { foreignKey: 'user_id', sourceKey: 'id' });

// relation entre Follow et User

Follower.belongsTo(User, { foreignKey: 'follower_user_id', as: 'follower' });
Follower.belongsTo(User, { foreignKey: 'following_user_id', as: 'following' });

User.hasMany(Follower, { foreignKey: 'follower_user_id', as: 'followers' });
User.hasMany(Follower, { foreignKey: 'following_user_id', as: 'following' });

Comment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
User.hasMany(Post, { foreignKey: 'user_id', sourceKey: 'id' });
