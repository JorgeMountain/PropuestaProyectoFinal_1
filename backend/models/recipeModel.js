import pool from '../config/db.js';

class RecipeModel {
  // Buscar recetas por nombre o tipo
  static async searchRecipes(name = null, type = null) {
    let query = `SELECT * FROM Recetas WHERE 1=1`;
    const params = [];

    if (name) {
      query += ` AND Nombre LIKE $${params.length + 1}`;
      params.push(`%${name}%`);
    }
    if (type) {
      query += ` AND Tipo = $${params.length + 1}`;
      params.push(type);
    }

    const { rows } = await pool.query(query, params);
    return rows;
  }

  // Obtener una receta por ID
  static async findById(recipeId) {
    const query = 'SELECT * FROM Recetas WHERE ID_Receta = $1';
    const { rows } = await pool.query(query, [recipeId]);
    return rows[0];
  }

  // Obtener recetas por ingredientes
  static async findByIngredients(ingredients) {
    const placeholders = ingredients.map((_, index) => `$${index + 1}`).join(' OR ');
    const query = `
      SELECT DISTINCT r.* 
      FROM Recetas r
      JOIN Receta_Ingredientes ri ON r.ID_Receta = ri.ID_Receta
      WHERE ${placeholders};
    `;
    const { rows } = await pool.query(query, ingredients.map(ingredient => `%${ingredient}%`));
    return rows;
  }
}

export default RecipeModel;
