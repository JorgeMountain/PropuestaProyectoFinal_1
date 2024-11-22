import RecipeService from '../services/recipeService.js';

class RecipeController {
  // Buscar recetas por nombre o tipo
  static async searchRecipes(req, res) {
    const { name, type } = req.query; // Buscar por nombre o tipo (vegano, vegetariano, etc.)
    try {
      const recipes = await RecipeService.searchRecipes(name, type);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una receta por ID
  static async getRecipeById(req, res) {
    const { id } = req.params;
    try {
      const recipe = await RecipeService.getRecipeById(id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener sugerencias de recetas según los ingredientes disponibles
  static async getSuggestions(req, res) {
    const { ingredients } = req.body; // Array de ingredientes proporcionados por el usuario
    try {
      const suggestions = await RecipeService.getSuggestions(ingredients);
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener recetas por ingredientes
  static async getRecipesByIngredients(req, res) {
    const { ingredients } = req.body; // Array de ingredientes proporcionados por el usuario
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ message: 'You must provide at least one ingredient.' });
    }
    try {
      const recipes = await RecipeService.getRecipesByIngredients(ingredients);
      if (recipes.length === 0) {
        return res.status(404).json({ message: 'No recipes found with the given ingredients.' });
      }
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default RecipeController;
