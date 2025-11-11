import FavoriteService from '../services/favoriteService.js';

class FavoriteController {
  // Obtener recetas favoritas de un usuario
  static async getFavorites(req, res) {
    const { id } = req.user; // Decodificado del JWT
    try {
      const favorites = await FavoriteService.getFavoritesByUserId(id);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Agregar una receta a favoritos
  static async addFavorite(req, res) {
    const { id } = req.user;
    const { recipeId } = req.body;
    try {
      const favorite = await FavoriteService.addFavorite(id, recipeId);
      res.status(201).json(favorite);
    } catch (error) {
      const statusCode = error.message === 'Recipe already in favorites' ? 409 : 400;
      res.status(statusCode).json({ error: error.message });
    }
  }

  // Eliminar una receta de favoritos
  static async removeFavorite(req, res) {
    const { id } = req.user;
    const { recipeId } = req.body;
    try {
      const removed = await FavoriteService.removeFavorite(id, recipeId);
      if (!removed) {
        return res.status(404).json({ message: 'Favorite not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default FavoriteController;
