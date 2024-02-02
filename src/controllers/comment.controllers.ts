import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
const { SECRET } = process.env;
if (!SECRET) {
	throw new Error('JWT secret is not defined in the environment variables.');
}

const addComment = async (req: Request, res: Response) => {
	try {
		const { userId, content, postId } = req.body;

		await Comment.create({ content, userId, postId: postId });

		return res.status(201).json({ message: 'Comment created' });
	} catch (error) {
		console.error('Error creating comment:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const getCommentsOfSpecificPost = async (req: Request, res: Response) => {
	try {
		const postId = parseInt(req.params.postId, 10);

		if (isNaN(postId)) {
			return res.status(400).json({ message: 'Invalid postId' });
		}

		// Vérifier si le post existe
		const post = await Post.findOne({ where: { id: postId } });
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		// Récupérer tous les commentaires du post
		const comments = await Comment.findAll({ where: { postId: postId } });

		res.status(200).json(comments);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export { addComment, getCommentsOfSpecificPost };
