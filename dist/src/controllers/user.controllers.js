"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updatePassword = exports.verifyEmail = exports.getUserConnected = exports.getUserById = exports.getByUsername = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
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
const user_model_1 = require("../models/user.model");
const generateToken_1 = require("../../utils/generateToken");
const handleErrorResponse_1 = require("../../utils/handleErrorResponse");
// const register = async (req: Request, res: Response): Promise<void> => {
// 	try {
// 		const { email, username, password } = req.body;
// 		const user = await User.create({ email, username, password });
// 		const { id } = user;
// 		const token = generateToken(id ?? 0);
// 		const response = { message: 'User created', token };
// 		res.status(201).json(response);
// 	} catch (error) {
// 		handleErrorResponse(res, error);
// 	}
// };
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const user = yield user_model_1.User.create({ email, username, password, isVerified: false });
        console.log('USER CREART4ED WESH');
        // console.log('USER CREART4ED WESH');
        const { id } = user;
        const token = (0, generateToken_1.generateToken)(id !== null && id !== void 0 ? id : 0);
        console.log('USER TOKEN WESH');
        // Envoi de l'e-mail de vérification
        // const verificationLink = `http://localhost:3000/user/verify`;
        // const mailOptions = {
        // 	from: 'noreply@vagabond.com',
        // 	to: email,
        // 	subject: "Vérification de l'e-mail",
        // 	text: `Clique sur le lien suivant pour vérifier ton e-mail : ${verificationLink}`,
        // };
        // const transporter = nodemailer.createTransport({
        // 	host: SMTP_HOST,
        // 	port: Number(SMTP_PORT),
        // 	secure: false,
        // 	auth: {
        // 		user: SMTP_USER,
        // 		pass: SMTP_PASS,
        // 	},
        // });
        // transporter.sendMail(mailOptions, (error, info) => {
        // 	if (error) {
        // 		console.error('Error sending verification email:', error);
        // 		const response = { message: 'Error sending verification email', error: error.message };
        // 		res.status(422).json(response);
        // 	} else {
        // 		console.log('Verification email sent:', info.response);
        // 		const response = { message: 'User created. Check your email for verification.', token };
        // 		res.status(201).json(response);
        // 	}
        // });
        const response = { message: 'User created', token };
        res.status(201).json(response);
    }
    catch (error) {
        (0, handleErrorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.register = register;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const userId = decodedToken.id;
        yield user_model_1.User.update({ isVerified: true }, { where: { id: userId } });
        const response = { message: 'E-mail verified successfully.', isVerified: true };
        res.status(200).json(response);
    }
    catch (error) {
        (0, handleErrorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.verifyEmail = verifyEmail;
// const verifyEmail = async (req: Request, res: Response) => {
// 	try {
// 		const { username } = req.params;
// 		const user = await User.findOne({ where: { username } });
// 		if (user) {
// 			const { id } = user;
// 			await User.update({ isVerified: true }, { where: { id } });
// 			const response = { message: 'E-mail verified successfully.', isVerified: true };
// 			res.status(200).json(response);
// 		} else {
// 			const response = { message: 'User not found.', isVerified: false };
// 			res.status(404).json(response);
// 		}
// 	} catch (error) {
// 		handleErrorResponse(res, error);
// 	}
// };
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('trying to login');
        const { username, password } = req.body;
        const user = yield user_model_1.User.findOne({ where: { username } });
        if (!user) {
            throw new Error('Invalid username');
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid username or password');
        }
        const { id, isVerified } = user;
        const token = (0, generateToken_1.generateToken)(id !== null && id !== void 0 ? id : 0);
        const response = { message: 'User connected', token, id, isVerified };
        res.status(201).json(response);
    }
    catch (error) {
        (0, handleErrorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.login = login;
const getByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const user = yield user_model_1.User.findOne({
            where: { username: username },
        });
        if (user) {
            res.json(user.id);
        }
        else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});
exports.getByUsername = getByUsername;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_model_1.User.findOne({
            where: { id: parseInt(userId, 10) },
        });
        if (user) {
            res.status(200).json(user.username);
        }
        else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});
exports.getUserById = getUserById;
const getUserConnected = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseToken = req.headers.authorization;
        if (!responseToken) {
            throw new Error('token not found');
        }
        const token = responseToken.replace('Bearer ', '');
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const user_id = decodedToken.id;
        const user = yield user_model_1.User.findOne({ where: { id: user_id } });
        if (!user) {
            throw new Error('User not found');
        }
        res.status(200).json({ username: user.username, id: user.id });
    }
    catch (error) {
        (0, handleErrorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.getUserConnected = getUserConnected;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword } = req.body;
        const responseToken = req.headers.authorization;
        if (!responseToken) {
            return res.status(401).json({ error: 'Missing Authorization header' });
        }
        const token = responseToken.replace('Bearer ', '');
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const user_id = decodedToken.id;
        const user = yield user_model_1.User.findOne({ where: { id: user_id } });
        if (!user) {
            throw new Error('User not found');
        }
        const validPassword = yield bcrypt_1.default.compare(currentPassword, user.password);
        if (!validPassword) {
            throw new Error('Invalid current password');
        }
        const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
        user.password = hashedNewPassword;
        yield user.save();
        const response = { message: 'Password updated successfully' };
        res.status(200).json(response);
    }
    catch (error) {
        (0, handleErrorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.updatePassword = updatePassword;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseToken = req.headers.authorization;
        if (!responseToken) {
            return res.status(401).json({ error: 'Missing Authorization header' });
        }
        const token = responseToken.replace('Bearer ', '');
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET);
        const user_id = decodedToken.id;
        const existingUser = yield user_model_1.User.findOne({ where: { id: user_id } });
        if (!existingUser) {
            return res.status(403).json({ message: 'You do not have permission to delete this user' });
        }
        yield user_model_1.User.destroy({ where: { id: user_id } });
        return res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteUser = deleteUser;
