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
exports.deleteUser = exports.updateUser = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const generateToken = (username) => {
    // Change "test" to use an environment variable
    return jsonwebtoken_1.default.sign({ username }, 'test');
};
const handleErrorResponse = (res, error) => {
    if (error instanceof Error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        throw error; // Optional: rethrow the error if needed
    }
    else {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        throw new Error('Unexpected error occurred');
    }
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const user = yield user_model_1.User.create({ email, username, password });
        const token = generateToken(username);
        const response = { message: 'User created', token };
        res.status(201).json(response);
    }
    catch (error) {
        handleErrorResponse(res, error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_model_1.User.findOne({ where: { username } });
        if (!user) {
            throw new Error('Invalid username');
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid username or password');
        }
        const token = generateToken(username);
        const response = { message: 'User connected', token };
        res.status(201).json(response);
    }
    catch (error) {
        handleErrorResponse(res, error);
    }
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic for updating user
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic for deleting user
});
exports.deleteUser = deleteUser;
