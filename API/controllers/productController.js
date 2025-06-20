const { Producto } = require('../models');

exports.getAllProducts = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { nombre, tipo, precio, descripcion } = req.body;

    const nuevo = await Product.create({
      nombre,
      tipo,
      precio,
      descripcion,
      imageUrl: req.imageUrl || null,
    });

    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear producto', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ success: true, message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};