import FavoriteModel from '../models/favoriteModel.js';

class FavoriteService {
  static async getFavoritesByUserId(userId) {
    const favorites = await FavoriteModel.getFavoritesByUserId(userId);
    return favorites;
  }

  static async addFavorite(userId, recipeId) {
    const favorite = await FavoriteModel.addFavorite(userId, recipeId);
    return favorite;
  }

  static async removeFavorite(userId, recipeId) {
    const wasDeleted = await FavoriteModel.removeFavorite(userId, recipeId);
    return wasDeleted;
  }
}

export default FavoriteService;
