import { Request, Response, NextFunction } from 'express';

const isValidEmailFormat = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validateEmailMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body;

	if (email && !isValidEmailFormat(email)) {
		return res.status(400).json({ message: 'Invalid email format' });
	}
	next();
};
