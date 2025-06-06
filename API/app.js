// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Importar rutas
const userRoutes = require('./routes/users');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/users', userRoutes);

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
