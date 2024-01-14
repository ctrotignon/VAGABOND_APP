"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswordMiddleware = void 0;
const isValidPasswordFormat = (password) => {
    // Au moins une majuscule, un chiffre, un caractère spécial, et longueur d'au moins 4 caractères
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    return passwordRegex.test(password);
};
const validatePasswordMiddleware = (req, res, next) => {
    const { password } = req.body;
    if (password && !isValidPasswordFormat(password)) {
        return res.status(400).json({ message: "Invalid password format" });
    }
    next();
};
exports.validatePasswordMiddleware = validatePasswordMiddleware;
