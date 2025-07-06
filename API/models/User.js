const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  rol: { type: String, enum: ['user', 'admin'], default: 'user' },
  activo: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
