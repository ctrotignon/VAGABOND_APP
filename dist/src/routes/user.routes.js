"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
//IMPORT USER'S CONTROLLERS
const user_controllers_1 = require("../controllers/user.controllers");
// IMPORT USER'S MIDDLEWARES
// FOR REGISTER
const validateEmail_middleware_1 = require("../middlewares/validateEmail.middleware");
const checkUniqueUser_middleware_1 = require("../middlewares/checkUniqueUser.middleware");
const hashPassword_middleware_1 = require("../middlewares/hashPassword.middleware");
//FOR LOGIN
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post('/register', checkUniqueUser_middleware_1.checkUniqueUserMiddleware, validateEmail_middleware_1.validateEmailMiddleware, hashPassword_middleware_1.hashPasswordMiddleware, user_controllers_1.register);
userRoutes.post('/login', user_controllers_1.login);
userRoutes.get('/:username', user_controllers_1.getByUsername);
userRoutes.get('/getUserById/:userId', user_controllers_1.getUserById);
userRoutes.post('/getUserConnected', authenticate_middleware_1.authenticate, user_controllers_1.getUserConnected);
userRoutes.put('/updatePAssword', authenticate_middleware_1.authenticate, user_controllers_1.updatePassword);
userRoutes.delete('/deleteUser', authenticate_middleware_1.authenticate, user_controllers_1.deleteUser);
userRoutes.post('/verify', authenticate_middleware_1.authenticate, user_controllers_1.verifyEmail);
