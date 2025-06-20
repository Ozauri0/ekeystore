const { Key } = require('../models');

// Ver todas las claves (admin)
exports.getAllKeys = async (req, res) => {
  try {
    const keys = await Key.find().populate('producto').sort({ createdAt: -1 });
    res.json(keys);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener claves' });
  }
};

// Crear clave nueva (admin)
exports.createKey = async (req, res) => {
  try {
    const { producto, key, price } = req.body;
    const nueva = await Key.create({ producto, key, price });
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear clave', error: err.message });
  }
};

exports.deleteKey = async (req, res) => {
  try {
    const deleted = await Key.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Clave no encontrada' });
    res.json({ success: true, message: 'Clave eliminada' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};