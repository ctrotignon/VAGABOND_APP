import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
const { SECRET } = process.env;
if (!SECRET) {
	throw new Error('JWT secret is not defined in the environment variables.');
}

import { Post } from '../models/post.model';

const createPost = async (req: Request, res: Response) => {
	try {
		const { type, mediaURL } = req.body;
		const responseToken = req.headers.authorization;
		if (!responseToken) {
			throw new Error('token not found');
		}
		const token = responseToken.replace('Bearer ', '');

		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		const user_id = decodedToken.id;
		const post = await Post.create({ user_id, type, mediaURL });
		return res.status(201).json({ message: 'Post created', post: post });
	} catch (error) {
		console.error('Error creating user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const getAllPosts = async (req: Request, res: Response) => {
	try {
		console.debug('Entering getAllPosts endpoint');
		const allPosts = await Post.findAll();

		const postList = allPosts.map((post) => ({
			user_id: post.getDataValue('user_id'),
			id: post.getDataValue('id'),
			type: post.getDataValue('type'),
			mediaURL: post.getDataValue('mediaURL'),
		}));

		res.status(200).json({ posts: postList });
	} catch (error) {
		console.error('Error fetching posts:', error);
		res.status(500).json({ error: 'Unable to fetch posts' });
	}
};

const getAllMedias = async (req: Request, res: Response) => {
	try {
		const allPosts = await Post.findAll();
		const mediasList = allPosts.map((post) => post.getDataValue('mediaURL'));
		res.status(200).json(mediasList);
	} catch (error) {
		console.error('Error fetching medias:', error);
		res.status(500).json({ error: 'Unable to fetch medias' });
	}
};

const getPostsSpecificUser = async (req: Request, res: Response) => {
	try {
		const { postUserId } = req.params;
		const allPosts = await Post.findAll({
			where: {
				user_id: postUserId,
			},
		});
		if (!allPosts) {
			return res.status(404).json({ error: 'No posts found for the user' });
		}

		const mediasList = allPosts.map((post) => post.getDataValue('mediaURL'));
		res.status(200).json(mediasList);
	} catch (error) {
		console.error('Error fetching medias:', error);
		res.status(500).json({ error: 'Unable to fetch medias' });
	}
};
const updatePost = async (req: Request, res: Response) => {};
const deletePost = async (req: Request, res: Response) => {};

export { createPost, getAllPosts, getPostsSpecificUser, getAllMedias, updatePost, deletePost };
