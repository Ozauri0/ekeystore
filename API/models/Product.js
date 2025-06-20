const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  precioOriginal: { type: Number, required: true },
  descripcion: { type: String },
  descripcionCorta: { type: String },
  imagen: { type: String },
  descuento: { type: Number, default: 0 },
  stock: { type: Number, default: 1000 }, // Para productos digitales siempre hay stock
  activo: { type: Boolean, default: true },
  destacado: { type: Boolean, default: false },
  etiquetas: [String],
  valoracion: { type: Number, default: 5.0, min: 1, max: 5 },
  numeroReseñas: { type: Number, default: 0 },
  tipoEntrega: { type: String, enum: ['instantanea', 'email'], default: 'instantanea' },
  sistemaOperativo: [String], // Para productos de software
  requisitos: { type: String },
  garantia: { type: String, default: 'De por vida' },
  idiomas: [String],
  version: { type: String }
}, { timestamps: true });

// Índices para mejorar las consultas
productoSchema.index({ categoria: 1 });
productoSchema.index({ precio: 1 });
productoSchema.index({ destacado: 1 });
productoSchema.index({ activo: 1 });

module.exports = mongoose.model('Producto', productoSchema);
