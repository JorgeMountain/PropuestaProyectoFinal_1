import pool from '../config/db.js';

class FavoriteModel {
  // Obtener recetas favoritas de un usuario
  static async getFavoritesByUserId(userId) {
    const query = `
      SELECT 
        f.ID_Favorito AS favoriteId,
        f.ID_Receta AS recipeId,
        r.Nombre AS name,
        r.Descripcion AS description,
        r.Tipo AS type,
        r.Dificultad AS difficulty,
        r.TiempoPreparacion AS preparationTime
      FROM Favoritos f
      JOIN Recetas r ON f.ID_Receta = r.ID_Receta
      WHERE f.ID_Usuario = $1
      ORDER BY f.Fecha_Guardado DESC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  // Agregar una receta a favoritos
  static async addFavorite(userId, recipeId) {
    const query = `
      INSERT INTO Favoritos (ID_Usuario, ID_Receta)
      VALUES ($1, $2)
      ON CONFLICT (ID_Usuario, ID_Receta) DO NOTHING
      RETURNING ID_Favorito AS favoriteId, ID_Receta AS recipeId
    `;
    const { rows } = await pool.query(query, [userId, recipeId]);
    if (!rows.length) {
      throw new Error('Recipe already in favorites');
    }
    return rows[0];
  }

  // Eliminar una receta de favoritos
  static async removeFavorite(userId, recipeId) {
    const query = `
      DELETE FROM Favoritos
      WHERE ID_Usuario = $1 AND ID_Receta = $2
    `;
    const result = await pool.query(query, [userId, recipeId]);
    return result.rowCount > 0;
  }
}

export default FavoriteModel;
