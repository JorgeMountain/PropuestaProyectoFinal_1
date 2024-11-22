import FavoriteModel from '../models/favoriteModel.js';

class FavoriteService {
  static async getFavoritesByUserId(userId) {
    const favorites = await FavoriteModel.getFavoritesByUserId(userId);
    return favorites;
  }

  static async addFavorite(userId, recipeId) {
    await FavoriteModel.addFavorite(userId, recipeId);
    return { message: 'Recipe added to favorites' };
  }

  static async removeFavorite(userId, recipeId) {
    await FavoriteModel.removeFavorite(userId, recipeId);
    return { message: 'Recipe removed from favorites' };
  }
}

export default FavoriteService;
