import { Router } from 'express';

import { getCommentsOfSpecificPost, addComment } from '../controllers/comment.controllers';
import { authenticate } from '../middlewares/authenticate.middleware';

const commentRoutes = Router();

commentRoutes.get('/getComments/:postId', getCommentsOfSpecificPost);
commentRoutes.post('/addComment', authenticate, addComment);

export { commentRoutes };
