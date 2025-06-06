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
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear producto', error: err.message });
  }
};
