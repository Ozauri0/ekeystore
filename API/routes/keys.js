const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeRole');
const { getAllKeys, createKey, deleteKey } = require('../controllers/keyController');



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
router.delete('/:id', auth, authorize(['admin']), deleteKey);

// Obtener claves disponibles por producto temporarily
router.get('/disponibles/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const Key = require('../models/Key');
    const keys = await Key.find({ producto: productId, status: 'available' });
    res.json(keys);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener claves disponibles', error: err.message });
  }
});

module.exports = router;