const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');// Eliminar el prefijo 'Bearer ' del token
  // Verificar si el token existe
  // Si no existe, devolver un error 401 (No autorizado)
  if (!token) return res.status(401).json({ error: 'No autorizado' });

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar los datos decodificados en la solicitud
    next(); // Continuar con la siguiente función
  } catch (err) {
    res.status(400).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;