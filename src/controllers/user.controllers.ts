import { Request, Response } from 'express';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import 'dotenv/config';
const { SECRET, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
if (!SECRET) {
	throw new Error('JWT secret is not defined in the environment variables.');
}
if (!SMTP_HOST) {
	throw new Error('Pas de SMTP host');
}
if (!SMTP_PORT) {
	throw new Error('Pas de SMTP host');
}

import { User } from '../models/user.model';
import { generateToken } from '../../utils/generateToken';
import { handleErrorResponse } from '../../utils/handleErrorResponse';

const temporaryVerificationCodes: { [email: string]: string } = {};

const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, username, password } = req.body;

		const existingUser = await User.findOne({
			where: {
				[Op.or]: [{ email }, { username }],
			},
		});
		if (existingUser) {
			res.status(422).json({ message: 'Email or username already exists' });
		}

		const user = await User.create({ email, username, password, isVerified: false });

		const { id } = user;
		const token = generateToken(id ?? 0);

		// const verificationLink = `http://localhost:3000/user/verify`;
		console.log('mail', email);
		const code = crypto.randomUUID().substring(0, 6);
		temporaryVerificationCodes[email] = code;

		const mailOptions = {
			from: 'noreply@vagabond.com',
			to: email,
			subject: "Vérification de l'e-mail",

			html: `

			<h2> Plus qu'une étape pour rejoindre la communauté Vagabond </h2>
			<p>Copie le code suivant pour vérifier ton e-mail: ${code}</p>
			`,
		};
		const transporter = nodemailer.createTransport({
			host: 'smtp-relay.brevo.com',
			port: 587,
			secure: false,
			auth: {
				user: 'trotignon.clement@gmail.com',
				pass: 'zV9LTNK7sQYIWAxn',
			},
		});
		const info = await transporter.sendMail(mailOptions);

		console.log('E-mail de vérification envoyé:', info.response);
		// transporter.sendMail(mailOptions, (error, info) => {
		// 	if (error) {
		// 		console.error('Error sending verification email:', error);
		// 		const response = { message: 'Error sending verification email', error: error.message };
		// 		console.log('Nodemailer info object:', info);
		// 		res.status(422).json(response);
		// 	} else {
		// 		console.log('Verification email sent:', info.response);
		// 		const response = { message: 'User created. Check your email for verification.', token };
		// 		res.status(201).json(response);
		// 	}
		// });
		const response = { message: 'User created', token };
		res.status(201).json(response);
	} catch (error) {
		handleErrorResponse(res, error);
	}
};
const verifyEmail = async (req: Request, res: Response) => {
	try {
		console.log('TEMPO', temporaryVerificationCodes);
		const { userId, code } = req.body;
		const user = await User.findOne({ where: { id: userId } });

		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		const email = user.email;

		if (temporaryVerificationCodes[email] === code) {
			await User.update({ isVerified: true }, { where: { id: userId } });
			// delete temporaryVerificationCodes[email];

			const response = { success: true, message: 'E-mail verified successfully.', isVerified: true };
			return res.status(200).json(response);
		} else {
			return res.status(400).json({ success: false, message: 'Invalid verification code', isVerified: false });
		}
	} catch (error) {
		handleErrorResponse(res, error);
	}
};
const login = async (req: Request, res: Response): Promise<void> => {
	try {
		console.log('trying to login');
		const { username, password } = req.body;
		const user = await User.findOne({ where: { username } });

		if (!user) {
			res.status(401).json({ message: 'Invalid password' });
			return;
			// throw new Error('Invalid username');
		}

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			res.status(401).json({ message: 'Invalid password' });
			return;
		}
		const { id, isVerified } = user;
		const token = generateToken(id ?? 0);

		const response = { message: 'User connected', token, id, isVerified };
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
		const { userId } = req.body;

		const user = await User.findOne({ where: { id: userId } });
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
		const { userId, currentPassword, newPassword } = req.body;

		const user = await User.findOne({ where: { id: userId } });
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
		const { userId } = req.body;

		const existingUser = await User.findOne({ where: { id: userId } });

		if (!existingUser) {
			return res.status(403).json({ message: 'You do not have permission to delete this user' });
		}

		await User.destroy({ where: { id: userId } });

		return res.status(200).json({ message: 'User deleted' });
	} catch (error) {
		console.error('Error deleting user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export { register, login, getByUsername, getUserById, getUserConnected, verifyEmail, updatePassword, deleteUser };
