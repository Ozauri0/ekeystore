// middlewares/authorizeRole.js
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
    next();
  };
};

module.exports = authorizeRole;
