import { Router } from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/userController.js';
import validateInputs from '../middlewares/validateInputs.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para registrar un usuario
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  validateInputs,
  UserController.register
);

// Ruta para iniciar sesión
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  //validateInputs,
  UserController.login
);

// Ruta para obtener la información del usuario
router.get('/me', authMiddleware, UserController.getUser);

export default router;
