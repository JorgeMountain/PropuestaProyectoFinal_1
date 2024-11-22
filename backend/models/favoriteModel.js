import pool from '../config/db.js';

class FavoriteModel {
  // Obtener recetas favoritas de un usuario
  static async getFavoritesByUserId(userId) {
    const query = `
      SELECT r.* 
      FROM Favoritos f
      JOIN Recetas r ON f.ID_Receta = r.ID_Receta
      WHERE f.ID_Usuario = $1
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  // Agregar una receta a favoritos
  static async addFavorite(userId, recipeId) {
    const query = `
      INSERT INTO Favoritos (ID_Usuario, ID_Receta)
      VALUES ($1, $2)
    `;
    await pool.query(query, [userId, recipeId]);
    return { userId, recipeId };
  }

  // Eliminar una receta de favoritos
  static async removeFavorite(userId, recipeId) {
    const query = `
      DELETE FROM Favoritos
      WHERE ID_Usuario = $1 AND ID_Receta = $2
    `;
    await pool.query(query, [userId, recipeId]);
  }
}

export default FavoriteModel;
