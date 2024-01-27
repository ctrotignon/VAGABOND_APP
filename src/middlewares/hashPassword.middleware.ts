import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export const hashPasswordMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { password } = req.body;
		if (!password) {
			return res.status(400).json({ message: 'Password is required' });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		req.body.password = hashedPassword;
		next();
	} catch (error) {
		console.error(error);
		return res.status(422).json({ message: 'Internal server error' });
	}
};
