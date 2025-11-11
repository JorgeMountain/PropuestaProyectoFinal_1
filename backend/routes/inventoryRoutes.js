import { Router } from 'express';
import { body } from 'express-validator';
import InventoryController from '../controllers/inventoryController.js';
import validateInputs from '../middlewares/validateInputs.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para obtener el inventario del usuario
router.get('/', authMiddleware, InventoryController.getInventory);

// Ruta para agregar un ingrediente al inventario
router.post(
  '/',
  [
    authMiddleware,
    body('ingredient').notEmpty().withMessage('Ingredient name is required').trim(),
    body('quantity').isFloat({ min: 0 }).withMessage('Valid quantity is required').toFloat(),
    body('type').notEmpty().withMessage('Measurement type is required').trim()
  ],
  validateInputs,
  InventoryController.addIngredient
);

// Ruta para eliminar un ingrediente del inventario
router.delete(
  '/',
  [
    authMiddleware,
    body('ingredient').notEmpty().withMessage('Ingredient name is required').trim()
  ],
  validateInputs,
  InventoryController.removeIngredient
);

export default router;
