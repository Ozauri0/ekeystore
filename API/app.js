// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Importar rutas
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const keyRoutes = require('./routes/keys');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const app = express();

// Documentación Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EKeyStore API',
      version: '1.0.0',
      description: 'Documentación de la API de E-Key Store',
    },
    servers: [{ url: 'http://localhost:3001' }],
  },
  apis: ['./routes/*.js'],
});



// Conectar a la base de datos
connectDB();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/keys', keyRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Documentación Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Rutas base
app.get('/', (req, res) => {
  res.json({
    message: 'EKeyStore API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 - Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
