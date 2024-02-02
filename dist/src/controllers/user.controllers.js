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
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
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
const temporaryVerificationCodes = {};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const existingUser = yield user_model_1.User.findOne({
            where: {
                [sequelize_1.Op.or]: [{ email }, { username }],
            },
        });
        if (existingUser) {
            res.status(422).json({ message: 'Email or username already exists' });
        }
        const user = yield user_model_1.User.create({ email, username, password, isVerified: false });
        const { id } = user;
        const token = (0, generateToken_1.generateToken)(id !== null && id !== void 0 ? id : 0);
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
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: 'trotignon.clement@gmail.com',
                pass: 'zV9LTNK7sQYIWAxn',
            },
        });
        const info = yield transporter.sendMail(mailOptions);
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
    }
    catch (error) {
        (0, handleErrorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.register = register;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('TEMPO', temporaryVerificationCodes);
        const { userId, code } = req.body;
        const user = yield user_model_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const email = user.email;
        if (temporaryVerificationCodes[email] === code) {
            yield user_model_1.User.update({ isVerified: true }, { where: { id: userId } });
            // delete temporaryVerificationCodes[email];
            const response = { success: true, message: 'E-mail verified successfully.', isVerified: true };
            return res.status(200).json(response);
        }
        else {
            return res.status(400).json({ success: false, message: 'Invalid verification code', isVerified: false });
        }
    }
    catch (error) {
        (0, handleErrorResponse_1.handleErrorResponse)(res, error);
    }
});
exports.verifyEmail = verifyEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('trying to login');
        const { username, password } = req.body;
        const user = yield user_model_1.User.findOne({ where: { username } });
        if (!user) {
            res.status(401).json({ message: 'Invalid password' });
            return;
            // throw new Error('Invalid username');
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ message: 'Invalid password' });
            return;
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
        const { userId } = req.body;
        const user = yield user_model_1.User.findOne({ where: { id: userId } });
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
        const { userId, currentPassword, newPassword } = req.body;
        const user = yield user_model_1.User.findOne({ where: { id: userId } });
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
        const { userId } = req.body;
        const existingUser = yield user_model_1.User.findOne({ where: { id: userId } });
        if (!existingUser) {
            return res.status(403).json({ message: 'You do not have permission to delete this user' });
        }
        yield user_model_1.User.destroy({ where: { id: userId } });
        return res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteUser = deleteUser;
