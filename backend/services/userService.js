import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService {
  // Registrar un nuevo usuario con contraseña encriptada
  static async register(username, email, password) {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.createUser(username, email, hashedPassword);
    return user;
  }

  // Iniciar sesión
  static async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const storedPassword = user.password;
    let passwordsMatch = false;

    if (storedPassword?.startsWith('$2')) {
      passwordsMatch = await bcrypt.compare(password, storedPassword);
    } else if (storedPassword) {
      passwordsMatch = password === storedPassword;
    }

    if (!passwordsMatch) {
      throw new Error('Invalid email or password');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret not configured');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
