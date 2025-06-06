const mongoose = require('mongoose');

const recomendacionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  motivo: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Recomendacion', recomendacionSchema);
