import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService {
  // Registrar un nuevo usuario
  static async register(username, email, password) {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashear la contraseña
    const user = await UserModel.createUser(username, email, hashedPassword);
    return user;
  }

  // Iniciar sesión
  static async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.Contrasena); // Validar la contraseña hasheada
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.ID_Usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  // Obtener información del usuario
  static async getUserById(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default UserService;
