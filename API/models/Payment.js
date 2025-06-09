const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  orden: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden', required: true },
  stripe_id: { type: String, required: true },
  estado: { type: String, required: true },
  fecha_pago: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Pago', pagoSchema);
