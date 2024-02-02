import { Router } from 'express';

//IMPORT USER'S CONTROLLERS
import { register, login, getByUsername, deleteUser, updatePassword, getUserConnected, getUserById, verifyEmail } from '../controllers/user.controllers';

// IMPORT USER'S MIDDLEWARES

// FOR REGISTER
import { validateEmailMiddleware } from '../middlewares/validateEmail.middleware';
import { checkUniqueUserMiddleware } from '../middlewares/checkUniqueUser.middleware';
import { hashPasswordMiddleware } from '../middlewares/hashPassword.middleware';

//FOR LOGIN
import { authenticate } from '../middlewares/authenticate.middleware';

const userRoutes = Router();

userRoutes.post('/register', checkUniqueUserMiddleware, validateEmailMiddleware, hashPasswordMiddleware, register);

userRoutes.post('/login', login);
userRoutes.get('/:username', getByUsername);
userRoutes.get('/getUserById/:userId', getUserById);
userRoutes.post('/getUserConnected', authenticate, getUserConnected);
userRoutes.put('/updatePAssword', authenticate, updatePassword);
userRoutes.delete('/deleteUser', authenticate, deleteUser);
userRoutes.post('/verify', authenticate, verifyEmail);

export { userRoutes };
