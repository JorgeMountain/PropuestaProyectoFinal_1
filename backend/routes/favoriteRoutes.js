import { Router } from 'express';
import { body } from 'express-validator';
import FavoriteController from '../controllers/favoriteController.js';
import validateInputs from '../middlewares/validateInputs.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para obtener las recetas favoritas del usuario
router.get('/', authMiddleware, FavoriteController.getFavorites);

// Ruta para agregar una receta a favoritos
router.post(
  '/',
  [
    authMiddleware,
    body('recipeId').isInt().withMessage('Valid recipe ID is required')
  ],
  validateInputs,
  FavoriteController.addFavorite
);

// Ruta para eliminar una receta de favoritos
router.delete(
  '/',
  [
    authMiddleware,
    body('recipeId').isInt().withMessage('Valid recipe ID is required')
  ],
  validateInputs,
  FavoriteController.removeFavorite
);

export default router;
