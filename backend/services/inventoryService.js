import InventoryModel from '../models/inventoryModel.js';

class InventoryService {
  static async getInventoryByUserId(userId) {
    const inventory = await InventoryModel.getInventoryByUserId(userId);
    return inventory;
  }

  static async addIngredient(userId, ingredient, quantity, type) {
    const result = await InventoryModel.addIngredient(userId, ingredient, quantity, type);
    if (!result) {
      throw new Error('Failed to add ingredient to inventory');
    }
    return { message: 'Ingredient added to inventory' };
  }

  static async removeIngredient(userId, ingredient) {
    const result = await InventoryModel.removeIngredient(userId, ingredient);
    if (!result) {
      throw new Error('Failed to remove ingredient from inventory');
    }
    return { message: 'Ingredient removed from inventory' };
  }
}

export default InventoryService;
