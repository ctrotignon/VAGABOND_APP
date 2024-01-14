"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailMiddleware = void 0;
const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const validateEmailMiddleware = (req, res, next) => {
    const { email } = req.body;
    if (email && !isValidEmailFormat(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    next();
};
exports.validateEmailMiddleware = validateEmailMiddleware;
