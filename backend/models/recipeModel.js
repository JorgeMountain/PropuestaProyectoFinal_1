import pool from '../config/db.js';

const recipeFields = `
  r.ID_Receta AS id,
  r.Nombre AS name,
  r.Descripcion AS description,
  r.Porciones AS servings,
  r.Instrucciones AS instructions,
  r.TiempoPreparacion AS preparationTime,
  r.Dificultad AS difficulty,
  r.Calorias AS calories,
  r.Tipo AS type
`;

class RecipeModel {
  // Buscar recetas por nombre o tipo
  static async searchRecipes(name = null, type = null) {
    let query = `SELECT ${recipeFields} FROM Recetas r WHERE 1=1`;
    const params = [];

    if (name) {
      query += ` AND r.Nombre ILIKE $${params.length + 1}`;
      params.push(`%${name}%`);
    }
    if (type) {
      query += ` AND r.Tipo ILIKE $${params.length + 1}`;
      params.push(`%${type}%`);
    }

    const { rows } = await pool.query(query, params);
    return rows;
  }

  // Obtener una receta por ID
  static async findById(recipeId) {
    const query = `
      SELECT ${recipeFields}
      FROM Recetas r
      WHERE r.ID_Receta = $1
    `;
    const { rows } = await pool.query(query, [recipeId]);
    return rows[0];
  }

  // Obtener recetas por ingredientes
  static async findByIngredients(ingredients) {
    if (!ingredients.length) {
      return [];
    }

    const conditions = ingredients
      .map((_, index) => `ri.Ingrediente ILIKE $${index + 1}`)
      .join(' OR ');

    const query = `
      SELECT DISTINCT ${recipeFields}
      FROM Recetas r
      JOIN Receta_Ingredientes ri ON r.ID_Receta = ri.ID_Receta
      WHERE ${conditions}
    `;

    const params = ingredients.map((ingredient) => `%${ingredient}%`);
    const { rows } = await pool.query(query, params);
    return rows;
  }
}

export default RecipeModel;
