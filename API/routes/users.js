const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');

// Todas las rutas requieren estar autenticado
router.use(authMiddleware);

// Solo admin puede ver todos los usuarios
router.get('/', authorizeRole(['admin']), getAllUsers);

// Ver perfil o usuario por ID (admin o el mismo user)
router.get('/:id', getUserById);

// Actualizar perfil (admin o el mismo user)
router.put('/:id', updateUser);

// Eliminar perfil (admin o el mismo user)
router.delete('/:id', deleteUser);

module.exports = router;
