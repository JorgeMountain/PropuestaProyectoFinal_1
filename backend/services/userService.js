import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService {
  // Registrar un nuevo usuario
// Registrar un nuevo usuario
static async register(username, email, password) {
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
      throw new Error('Email already in use');
  }

  // Guardar la contraseña directamente sin hashear (no recomendado en producción)
  const user = await UserModel.createUser(username, email, password);
  return user;
}

 // Iniciar sesión
static async login(email, password) {
  const user = await UserModel.findByEmail(email);
  if (!user) {
      throw new Error('Invalid email');
  }


  // Comparar directamente las contraseñas sin encriptación
  if (password !== user.contrasena) {
      throw new Error('Invalid email or password');
  }

  // Generar el token JWT
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
