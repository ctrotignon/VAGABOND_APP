import { Router } from 'express';

import { getCommentsOfSpecificPost, addComment } from '../controllers/comment.controllers';

const commentRoutes = Router();

commentRoutes.get('/getComments/:postId', getCommentsOfSpecificPost);
commentRoutes.post('/addComment', addComment);

export { commentRoutes };
