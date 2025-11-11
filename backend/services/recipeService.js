import RecipeModel from '../models/recipeModel.js';

class RecipeService {
  static async searchRecipes(name, type) {
    const recipes = await RecipeModel.searchRecipes(name, type);
    return recipes;
  }

  static async getRecipeById(recipeId) {
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    return recipe;
  }

  static async getRecipesByIngredients(ingredients) {
    if (!Array.isArray(ingredients)) {
      throw new Error('Ingredients must be provided as an array');
    }

    const normalizedIngredients = ingredients
      .map((ingredient) => ingredient?.trim())
      .filter(Boolean);

    if (normalizedIngredients.length === 0) {
      throw new Error('Ingredients must be a non-empty array');
    }

    const recipes = await RecipeModel.findByIngredients(normalizedIngredients);
    return recipes;
  }

  static async getSuggestions(ingredients) {
    return this.getRecipesByIngredients(ingredients);
  }
}

export default RecipeService;
