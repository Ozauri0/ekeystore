const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);
