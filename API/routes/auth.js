const express = require('express');
const router = express.Router();
const { register, login, verifyAdmin } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rutas de autenticación
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/verify-admin:
 *   get:
 *     summary: Verificar si un usuario es administrador
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado es administrador
 *       403:
 *         description: Usuario no es administrador
 */
router.get('/verify-admin', authMiddleware, verifyAdmin);

module.exports = router;
