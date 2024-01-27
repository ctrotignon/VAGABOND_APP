import { User } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

const checkUniqueUser = async (email: string, username: string): Promise<boolean> => {
	try {
		const existingEmailUser = await User.findOne({ where: { email } });
		if (existingEmailUser) {
			return false;
		}

		const existingUsernameUser = await User.findOne({ where: { username } });
		if (existingUsernameUser) {
			return false;
		}
		return true;
	} catch (error) {
		console.error(error);
		throw new Error('Error checking unique user');
	}
};

export const checkUniqueUserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { email, username } = req.body;

		if (!email && !username) {
			res.status(400).json({ message: 'Email or username is required' });
			return;
		}

		const isUnique = await checkUniqueUser(email || '', username || '');

		if (!isUnique) {
			res.status(400).json({ message: 'Email or username already exists' });
			return;
		}

		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
