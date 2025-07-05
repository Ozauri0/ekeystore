const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole,
  toggleUserActive,
} = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios (solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       403:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID (admin o el mismo usuario)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *
 *   put:
 *     summary: Actualizar un usuario (admin o el mismo usuario)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Nuevo nombre"
 *               apellido: "Nuevo apellido"
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *
 *   delete:
 *     summary: Eliminar un usuario (admin o el mismo usuario)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */


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

router.delete('/:id', authorizeRole(['admin']), deleteUser);

// Cambiar rol de usuario (solo admin)
router.patch('/:id/role', authorizeRole(['admin']), changeUserRole);
// Activar/desactivar usuario (solo admin)
router.patch('/:id/toggle-active', authorizeRole(['admin']), toggleUserActive);

module.exports = router;


