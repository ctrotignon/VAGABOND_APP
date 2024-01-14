import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
const { SECRET } = process.env;
if (!SECRET) {
	throw new Error('JWT secret is not defined in the environment variables.');
}

import { User } from '../models/user.model';
import { generateToken } from '../../utils/generateToken';
import { handleErrorResponse } from '../../utils/handleErrorResponse';

const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, username, password } = req.body;
		const user = await User.create({ email, username, password });
		const { id } = user;
		const token = generateToken(id ?? 0);

		const response = { message: 'User created', token };
		res.status(201).json(response);
	} catch (error) {
		handleErrorResponse(res, error);
	}
};

const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ where: { username } });

		if (!user) {
			throw new Error('Invalid username');
		}

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			throw new Error('Invalid username or password');
		}
		const { id } = user;
		const token = generateToken(id ?? 0);

		const response = { message: 'User connected', token, id };
		res.status(201).json(response);
	} catch (error) {
		handleErrorResponse(res, error);
	}
};

const getByUsername = async (req: Request, res: Response) => {
	try {
		const username = req.params.username;
		const user = await User.findOne({
			where: { username: username },
		});

		if (user) {
			res.json(user.id);
		} else {
			res.status(404).json({ message: 'Utilisateur non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur serveur' });
	}
};

const getUserById = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const user = await User.findOne({
			where: { id: parseInt(userId, 10) },
		});

		if (user) {
			res.status(200).json(user.username);
		} else {
			res.status(404).json({ message: 'Utilisateur non trouvé' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Erreur serveur' });
	}
};

const getUserConnected = async (req: Request, res: Response): Promise<void> => {
	try {
		const responseToken = req.headers.authorization;

		if (!responseToken) {
			throw new Error('token not found');
		}
		const token = responseToken.replace('Bearer ', '');

		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		const user_id = decodedToken.id;

		const user = await User.findOne({ where: { id: user_id } });
		if (!user) {
			throw new Error('User not found');
		}
		res.status(200).json({ username: user.username, id: user.id });
	} catch (error) {
		handleErrorResponse(res, error);
	}
};

const updatePassword = async (req: Request, res: Response) => {
	try {
		const { currentPassword, newPassword } = req.body;
		const responseToken = req.headers.authorization;

		if (!responseToken) {
			return res.status(401).json({ error: 'Missing Authorization header' });
		}
		const token = responseToken.replace('Bearer ', '');

		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		const user_id = decodedToken.id;

		const user = await User.findOne({ where: { id: user_id } });
		if (!user) {
			throw new Error('User not found');
		}

		const validPassword = await bcrypt.compare(currentPassword, user.password);
		if (!validPassword) {
			throw new Error('Invalid current password');
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedNewPassword;
		await user.save();

		const response = { message: 'Password updated successfully' };
		res.status(200).json(response);
	} catch (error) {
		handleErrorResponse(res, error);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const responseToken = req.headers.authorization;

		if (!responseToken) {
			return res.status(401).json({ error: 'Missing Authorization header' });
		}
		const token = responseToken.replace('Bearer ', '');

		const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
		const user_id = decodedToken.id;

		const existingUser = await User.findOne({ where: { id: user_id } });

		if (!existingUser) {
			return res.status(403).json({ message: 'You do not have permission to delete this user' });
		}

		await User.destroy({ where: { id: user_id } });

		return res.status(200).json({ message: 'User deleted' });
	} catch (error) {
		console.error('Error deleting user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export { register, login, getByUsername, getUserById, getUserConnected, updatePassword, deleteUser };
