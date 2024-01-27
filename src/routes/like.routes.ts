import { Router } from 'express';

import { LikePost, deleteLikeByPost, getLikeByPost, userAlreadyLikedPost } from '../controllers/like.controller';

const likeRoutes = Router();

likeRoutes.get('/:postId', getLikeByPost);
likeRoutes.get('/userLiked/:postId/:userId', userAlreadyLikedPost);
likeRoutes.post('/:postId/:userId', LikePost);
likeRoutes.delete('/:postId/:userId', deleteLikeByPost);

export { likeRoutes };
