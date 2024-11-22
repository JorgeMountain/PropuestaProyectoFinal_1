import InventoryService from '../services/inventoryService.js';

class InventoryController {
  // Obtener inventario del usuario
  static async getInventory(req, res) {
    const { id } = req.user;
    try {
      const inventory = await InventoryService.getInventoryByUserId(id);
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agregar un ingrediente al inventario
  static async addIngredient(req, res) {
    const { id } = req.user;
    const { ingredient, quantity, type } = req.body;
    try {
      const newIngredient = await InventoryService.addIngredient(id, ingredient, quantity, type);
      res.status(201).json(newIngredient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un ingrediente del inventario
  static async removeIngredient(req, res) {
    const { id } = req.user;
    const { ingredient } = req.body;
    try {
      await InventoryService.removeIngredient(id, ingredient);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default InventoryController;
