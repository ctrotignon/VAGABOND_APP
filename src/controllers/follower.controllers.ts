import { Request, Response } from 'express';

import { Follower } from '../models/follower.model';

const followUser = async (req: Request, res: Response) => {
	try {
		const { followerUserId, followingUserId } = req.body;
		await Follower.create({ followerUserId, followingUserId });
		res.status(201).json({ message: 'Successfully followed the user' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const unfollowUser = async (req: Request, res: Response) => {
	try {
		const { followerUserId, followingUserId } = req.body;
		await Follower.destroy({
			where: { followerUserId, followingUserId },
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
				followingUserId: userId,
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
				followerUserId: userId,
			},
		});
		res.json(followingCount);
	} catch (error) {
		console.error('Error fetching followers count:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const userAlreadyFollowedUser = async (req: Request, res: Response) => {
	try {
		const { followerId, followingId } = req.params;
		const existingFollow = await Follower.findOne({
			where: {
				followerUserId: followerId,
				followingUserId: followingId,
			},
		});
		const followExists = !!existingFollow;
		console.log('FOLLLLLLLOOOOWWWWW', followExists);

		res.status(200).json({ followExists });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export { followUser, unfollowUser, getFollowersCount, getFollowingCount, userAlreadyFollowedUser };
