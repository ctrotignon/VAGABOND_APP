import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/user.model';

const { SECRET } = process.env;

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');
		if (!token) {
			return res.status(401).json({ message: 'No token provided' });
		}
		if (!SECRET) {
			return res.status(500).json({ message: 'Internal server error' });
		}
		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		if (!decodedToken || typeof decodedToken.id !== 'number') {
			return res.status(401).json({ message: 'Invalid token' });
		}
		const user = await User.findOne({ where: { id: decodedToken.id } });
		const userId = decodedToken.id;
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		req.body.userId = userId;
		next();
	} catch (error) {
		console.error('Error creating marker:', error);
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({ error: 'Token expired' });
		}
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ error: 'Invalid token' });
		}
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
