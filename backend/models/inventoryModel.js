import pool from '../config/db.js';

class InventoryModel {
  // Obtener inventario de un usuario
  static async getInventoryByUserId(userId) {
    const query = `
      SELECT * 
      FROM Inventario_Ingrediente
      WHERE ID_Usuario = $1
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  // Agregar un ingrediente al inventario
  static async addIngredient(userId, ingredient, quantity, type) {
    const query = `
      INSERT INTO Inventario_Ingrediente (ID_Usuario, Ingrediente, Cantidad_Disponible, Tipo_Cantidad)
      VALUES ($1, $2, $3, $4)
    `;
    const result = await pool.query(query, [userId, ingredient, quantity, type]);
    return result.rowCount > 0;
  }

  // Eliminar un ingrediente del inventario
  static async removeIngredient(userId, ingredient) {
    const query = `
      DELETE FROM Inventario_Ingrediente
      WHERE ID_Usuario = $1 AND Ingrediente = $2
    `;
    const result = await pool.query(query, [userId, ingredient]);
    return result.rowCount > 0;
  }
}

export default InventoryModel;
