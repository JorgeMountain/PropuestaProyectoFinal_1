import pkg from 'pg';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Desestructurar `Pool` desde el paquete `pg`
const { Pool } = pkg;

// Validar las variables de entorno críticas
if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_PASSWORD || !process.env.DB_PORT) {
  throw new Error('Faltan variables de entorno para configurar la base de datos');
}

// Crear una nueva instancia de Pool para gestionar las conexiones a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Manejar eventos de error globales en el pool
pool.on('error', (err) => {
  console.error('Error inesperado en el cliente de la base de datos:', err.stack);
});

// Probar la conexión al iniciar la aplicación
(async () => {
  try {
    const client = await pool.connect();
    console.log('Conexión exitosa con la base de datos');
    client.release(); // Liberar el cliente después de la prueba
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err.stack);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
})();

// Exportar el pool para que pueda ser utilizado en los modelos o servicios
export default pool;
