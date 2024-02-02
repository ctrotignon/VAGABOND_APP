import { Router } from 'express';

import { followUser, getFollowersCount, getFollowingCount, unfollowUser, userAlreadyFollowedUser } from '../controllers/follower.controllers';

const followerRoutes = Router();
followerRoutes.post('/:followerId/:followingId', followUser);
followerRoutes.delete('/:followerId/:followingId', unfollowUser);
followerRoutes.get('/followersCount/:userId', getFollowersCount);
followerRoutes.get('/followingsCount/:userId', getFollowingCount);
followerRoutes.get('/alreadyFollow/:followerId/:followingId', userAlreadyFollowedUser);

export { followerRoutes };
