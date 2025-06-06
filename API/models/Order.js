const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orden_fecha: { type: Date, default: Date.now },
  costo_total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Orden', ordenSchema);
