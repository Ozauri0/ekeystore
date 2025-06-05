const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Carrito', carritoSchema);
