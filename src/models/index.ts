import { User } from './user.model';
import { Post } from './post.model';
import { Marker } from './marker.model';
import { Follower } from './follower.model';
import { Like } from './like.model';
import { Comment } from './comment.model';

// relation entre Marker et User
User.hasMany(Marker, { foreignKey: 'userId', sourceKey: 'id' });
Marker.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

// relation entre Follow et User
Follower.belongsTo(User, { foreignKey: 'followerUserId', as: 'follower', targetKey: 'id' });
Follower.belongsTo(User, { foreignKey: 'followingUserId', as: 'following', targetKey: 'id' });

User.hasMany(Follower, { foreignKey: 'followerUserId', as: 'follower', sourceKey: 'id' });
User.hasMany(Follower, { foreignKey: 'followingUserId', as: 'following', sourceKey: 'id' });

// relation entre Comment et User
Comment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
User.hasMany(Comment, { foreignKey: 'userId', sourceKey: 'id' });
// relation enre Post  et User
Post.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
User.hasMany(Post, { foreignKey: 'userId', sourceKey: 'id' });

// relation entre Like et User
Like.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
User.hasMany(Like, { foreignKey: 'userId', sourceKey: 'id' });
// relation entre Like et Post
Like.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id' });
Post.hasMany(Like, { foreignKey: 'postId', sourceKey: 'id' });
