import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';

// Cargar variables de entorno desde un archivo .env
dotenv.config();

// Crear una instancia de la aplicación Express
const app = express();

// Middlewares
app.use(bodyParser.json()); // Middleware para analizar el cuerpo de las solicitudes en formato JSON

// Rutas
app.use('/users', userRoutes);         // Rutas relacionadas con usuarios
app.use('/recipes', recipeRoutes);     // Rutas relacionadas con recetas
app.use('/favorites', favoriteRoutes); // Rutas relacionadas con favoritos
app.use('/inventory', inventoryRoutes); // Rutas relacionadas con inventario

// Ruta de prueba para verificar si el servidor está funcionando
app.get('/test', (req, res) => {
  res.json({ message: 'Ruta de prueba funcionando correctamente!' });
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Puerto de escucha para la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
