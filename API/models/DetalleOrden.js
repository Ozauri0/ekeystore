const mongoose = require('mongoose');

const detalleOrdenSchema = new mongoose.Schema({
  orden: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  precio_unit: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('DetalleOrden', detalleOrdenSchema);
