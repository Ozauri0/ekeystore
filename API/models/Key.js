const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  orden: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden' },
  key: { type: String, required: true, unique: true },
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  price: { type: Number, required: true },
  fecha_compra: { type: Date },
  enviado: { type: Boolean, default: false },
  fecha_envio: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Key', keySchema);
