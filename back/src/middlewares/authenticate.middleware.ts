import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/user.model';

const { SECRET } = process.env;

type JwtToken = {
	username: string;
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');

		if (!token) {
			return res.status(401).json({ message: 'No token provided' });
		}

		if (!SECRET) {
			return res.status(500).json({ message: 'Internal server error: Missing secret token' });
		}

		const decodedToken = jwt.verify(token, SECRET) as JwtToken;

		if (!decodedToken || typeof decodedToken.username !== 'string') {
			return res.status(401).json({ message: 'Invalid token' });
		}

		const user = await User.findOne({ where: { username: decodedToken.username } });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		req.body.username = user;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Invalid token' });
	}
};
