// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, autorización denegada' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Asegurar que la clave del rol sea consistente
    req.user = { 
      userId: decoded.userId, 
      role: decoded.role || decoded.rol  // Aceptar ambas claves
    };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
