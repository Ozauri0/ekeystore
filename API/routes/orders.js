const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
} = require('../controllers/orderController');


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestión de órdenes de productos
 */


/** * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden (tras pago)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *               productId:
 *                 type: string
 *               cantidad:
 *                 type: number
 *               stripeSessionId:
 *                 type: string
 *               licenses:
 *                 type: number
 *               buyerEmail:
 *                 type: string
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 */

/** * @swagger
 * /api/orders:
 *   get:
 *     summary: Ver todas las órdenes (solo admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *       403:
 *         description: No autorizado
 */

/** * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Ver mis órdenes (usuario autenticado)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes del usuario autenticado
 */

/** * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Ver orden por ID (admin o dueño)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Orden no encontrada
 */


router.use(authMiddleware);

// Crear orden (tras pago)
router.post('/', createOrder);

// Ver todas las órdenes (admin)
router.get('/', authorizeRole(['admin']), getAllOrders);

// Ver mis órdenes
router.get('/my', getMyOrders);

// Ver orden por ID
router.get('/:id', getOrderById);

module.exports = router;
