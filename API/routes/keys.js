const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeRole');
const { getAllKeys, createKey } = require('../controllers/keyController');



/**
 * @swagger
 * tags:
 *   name: Keys
 *   description: Gestión de claves de productos
 */

/**
 * @swagger
 * /api/keys:
 *   get:
 *     summary: Obtener todas las claves (solo admin)
 *     tags: [Keys]
 *     responses:
 *       200:
 *         description: Lista de claves disponibles o vendidas
 *       403:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/keys:
 *   post:
 *     summary: Crear una nueva clave (solo admin)
 *     tags: [Keys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producto:
 *                 type: string
 *                 description: ID del producto
 *               key:
 *                 type: string
 *                 description: Clave de activación
 *               price:
 *                 type: number
 *                 description: Precio individual
 *     responses:
 *       201:
 *         description: Clave creada exitosamente
 *       400:
 *         description: Error al crear clave
 */

router.use(auth);
router.get('/', authorize(['admin']), getAllKeys);
router.post('/', authorize(['admin']), createKey);

module.exports = router;