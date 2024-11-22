import UserService from '../services/userService.js';
import jwt from 'jsonwebtoken';

class UserController {
  // Registro de un nuevo usuario
  static async register(req, res) {
    const { username, email, password } = req.body;
    try {
      const user = await UserService.register(username, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Inicio de sesión
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await UserService.login(email, password);
      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener información del usuario
  static async getUser(req, res) {
    const { id } = req.user; // Decodificado del JWT
    try {
      const user = await UserService.getUserById(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
