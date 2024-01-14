import { Request, Response } from 'express';

import { Follower } from '../models/follower.model';

const followUser = async (req: Request, res: Response) => {
	try {
		const { follower_user_id, following_user_id } = req.body;
		await Follower.create({ follower_user_id, following_user_id });
		res.status(201).json({ message: 'Successfully followed the user' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const unfollowUser = async (req: Request, res: Response) => {
	try {
		const { follower_user_id, following_user_id } = req.body;
		await Follower.destroy({
			where: { follower_user_id, following_user_id },
		});
		res.json({ message: 'Successfully unfollowed the user' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getFollowersCount = async (req: Request, res: Response) => {
	const { userId } = req.params;
	try {
		const followersCount = await Follower.count({
			where: {
				following_user_id: userId,
			},
		});
		res.json(followersCount);
	} catch (error) {
		console.error('Error fetching followers count:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getFollowingCount = async (req: Request, res: Response) => {
	const { userId } = req.params;
	try {
		const followingCount = await Follower.count({
			where: {
				follower_user_id: userId,
			},
		});
		res.json(followingCount);
	} catch (error) {
		console.error('Error fetching followers count:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export { followUser, unfollowUser, getFollowersCount, getFollowingCount };
