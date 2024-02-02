import { Request, Response } from 'express';

import { Like } from '../models/like.model';

const LikePost = async (req: Request, res: Response) => {
	try {
		const { postId, userId } = req.params;
		await Like.create({ postId: postId, userId: userId });
		res.status(201).json({ message: 'Like successfully created ' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
const getLikeByPost = async (req: Request, res: Response) => {
	try {
		const { postId } = req.params;
		const likeCount = await Like.count({ where: { postId: postId } });
		res.status(200).json({ likeCount });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const userAlreadyLikedPost = async (req: Request, res: Response) => {
	try {
		const { postId, userId } = req.params;
		const existingLike = await Like.findOne({
			where: {
				postId: postId,
				userId: userId,
			},
		});
		const likeExists = !!existingLike;
		res.status(200).json({ likeExists });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
const deleteLikeByPost = async (req: Request, res: Response) => {
	try {
		const { postId, userId } = req.params;
		const likeCount = await Like.destroy({ where: { userId: userId, postId: postId } });
		res.status(200).json({ likeCount });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export { LikePost, getLikeByPost, userAlreadyLikedPost, deleteLikeByPost };
