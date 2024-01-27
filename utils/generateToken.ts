import jwt from 'jsonwebtoken';
import 'dotenv/config';
const { SECRET } = process.env;
if (!SECRET) {
	throw new Error('JWT secret is not defined in the environment variables.');
}

export const generateToken = (id: number): string => {
	const token = jwt.sign({ id }, SECRET);
	return token;
};
