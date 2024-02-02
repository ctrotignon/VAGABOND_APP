import { Router } from 'express';

import { createPost, getAllPosts, getAllMedias, getPostsSpecificUser, getPostCountByUser } from '../controllers/post.controllers';

const postRoutes = Router();
postRoutes.post('/createPost', createPost);
postRoutes.get('/allPosts', getAllPosts);
postRoutes.get('/allMedias', getAllMedias);
postRoutes.get('/:postUserId', getPostsSpecificUser);
postRoutes.get('/postCount/:postUserId', getPostCountByUser);
export { postRoutes };
