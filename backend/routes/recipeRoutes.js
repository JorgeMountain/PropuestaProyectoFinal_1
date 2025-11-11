import { Router } from 'express';
import { body, query } from 'express-validator';
import RecipeController from '../controllers/recipeController.js';
import validateInputs from '../middlewares/validateInputs.js';

const router = Router();

// Ruta para buscar recetas por nombre o tipo
router.get(
  '/',
  [
    query('name').optional().isString().withMessage('Name must be a string').trim(),
    query('type').optional().isString().withMessage('Type must be a string').trim()
  ],
  validateInputs,
  RecipeController.searchRecipes
);

// Ruta para obtener una receta por ID
router.get('/:id', RecipeController.getRecipeById);

// Ruta para obtener sugerencias basadas en ingredientes
router.post(
  '/suggestions',
  [
    body('ingredients')
      .isArray({ min: 1 })
      .withMessage('Ingredients must be an array with at least one element'),
    body('ingredients.*')
      .isString()
      .withMessage('Each ingredient must be a string')
      .trim()
  ],
  validateInputs,
  RecipeController.getSuggestions
);

// Ruta para obtener recetas por ingredientes
router.post(
  '/ingredients',
  [
    body('ingredients')
      .isArray({ min: 1 })
      .withMessage('Ingredients must be an array with at least one element'),
    body('ingredients.*')
      .isString()
      .withMessage('Each ingredient must be a string')
      .trim()
  ],
  validateInputs,
  RecipeController.getRecipesByIngredients
);

export default router;
