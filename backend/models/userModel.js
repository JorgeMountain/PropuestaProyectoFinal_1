import pool from '../config/db.js';

class UserModel {
  // Buscar un usuario por correo electrónico
  static async findByEmail(email) {
    const query = 'SELECT * FROM Usuario WHERE Correo = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  // Buscar un usuario por ID
  static async findById(userId) {
    const query = 'SELECT ID_Usuario, Usuario, Correo FROM Usuario WHERE ID_Usuario = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
  }

  // Crear un nuevo usuario
  static async createUser(username, email, hashedPassword) {
    const query = `
      INSERT INTO Usuario (Usuario, Correo, Contrasena)
      VALUES ($1, $2, $3) RETURNING ID_Usuario, Usuario, Correo
    `;
    const { rows } = await pool.query(query, [username, email, hashedPassword]);
    return rows[0];
  }
}

export default UserModel;
