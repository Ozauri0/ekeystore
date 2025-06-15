// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nombre:
 *           type: string
 *         categoria:
 *           type: string
 *         precio:
 *           type: number
 *         precioOriginal:
 *           type: number
 *         descripcion:
 *           type: string
 *         imagen:
 *           type: string
 *         descuento:
 *           type: number
 *         destacado:
 *           type: boolean
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *       - in: query
 *         name: destacado
 *         schema:
 *           type: boolean
 *         description: Filtrar productos destacados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de productos a retornar
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/', async (req, res) => {
  try {
    const { categoria, destacado, limit } = req.query;
    
    // Construir filtros
    let filtros = { activo: true };
    
    if (categoria) {
      filtros.categoria = categoria;
    }
    
    if (destacado !== undefined) {
      filtros.destacado = destacado === 'true';
    }
    
    // Ejecutar consulta
    let query = Product.find(filtros);
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    const productos = await query.sort({ destacado: -1, createdAt: -1 });
    
    res.json({
      success: true,
      count: productos.length,
      data: productos
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @swagger
 * /api/products/categoria/{categoria}:
 *   get:
 *     summary: Obtener productos por categoría
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Productos de la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const productos = await Product.find({
      categoria: req.params.categoria,
      activo: true
    }).sort({ destacado: -1, precio: 1 });
    
    res.json({
      success: true,
      count: productos.length,
      data: productos
    });
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @swagger
 * /api/products/destacados:
 *   get:
 *     summary: Obtener productos destacados
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Productos destacados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/featured/destacados', async (req, res) => {
  try {
    const productos = await Product.find({
      destacado: true,
      activo: true
    }).sort({ valoracion: -1 }).limit(6);
    
    res.json({
      success: true,
      count: productos.length,
      data: productos
    });
  } catch (error) {
    console.error('Error al obtener productos destacados:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
