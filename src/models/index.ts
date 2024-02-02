import { User } from './user.model';
import { Post } from './post.model';
import { Follower } from './follower.model';
import { Comment } from './comment.model';

// relation entre User et Post

// User.hasMany(Post);
// Post.belongsTo(User);

Post.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
User.hasMany(Post, { foreignKey: 'userId', sourceKey: 'id' });

// relation entre Follow et User

Follower.belongsTo(User, { foreignKey: 'followerUserId', as: 'follower' });
Follower.belongsTo(User, { foreignKey: 'followingUserId', as: 'following' });

User.hasMany(Follower, { foreignKey: 'followerUserId', as: 'followers' });
User.hasMany(Follower, { foreignKey: 'followingUserId', as: 'following' });

Comment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
User.hasMany(Post, { foreignKey: 'userId', sourceKey: 'id' });
