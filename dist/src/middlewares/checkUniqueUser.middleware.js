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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUniqueUserMiddleware = void 0;
const user_model_1 = require("../models/user.model");
const checkUniqueUser = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingEmailUser = yield user_model_1.User.findOne({ where: { email } });
        if (existingEmailUser) {
            return false;
        }
        const existingUsernameUser = yield user_model_1.User.findOne({ where: { username } });
        if (existingUsernameUser) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error checking unique user');
    }
});
const checkUniqueUserMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username } = req.body;
        if (!email && !username) {
            res.status(400).json({ message: 'Email or username is required' });
            return;
        }
        const isUnique = yield checkUniqueUser(email || '', username || '');
        if (!isUnique) {
            res.status(400).json({ message: 'Email or username already exists' });
            return;
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.checkUniqueUserMiddleware = checkUniqueUserMiddleware;
