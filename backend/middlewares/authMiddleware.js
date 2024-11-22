import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Obtener el token del encabezado de autorización
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token después de "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' }); // No hay token
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    req.user = user; // Guardar el usuario decodificado en la solicitud
    next(); // Continuar con el siguiente middleware o controlador
  } catch (err) {
    console.error('Error al verificar el token:', err);
    return res.status(403).json({ message: 'Invalid token' }); // Token inválido
  }
};

export default authMiddleware;
