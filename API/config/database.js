// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🟢 MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('🔴 Error al conectar con MongoDB:', error.message);
    process.exit(1); // Detiene el servidor si falla la conexión
  }
};

module.exports = connectDB;
