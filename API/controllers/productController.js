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

// Buscar y filtrar productos
exports.searchProducts = async (req, res) => {
  try {
    const { nombre, tipo, minPrecio, maxPrecio } = req.query;
    const filtro = {};
    if (nombre) filtro.nombre = { $regex: nombre, $options: 'i' };
    if (tipo) filtro.tipo = tipo;
    if (minPrecio || maxPrecio) {
      filtro.precio = {};
      if (minPrecio) filtro.precio.$gte = Number(minPrecio);
      if (maxPrecio) filtro.precio.$lte = Number(maxPrecio);
    }
    const productos = await Producto.find(filtro);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar productos' });
  }
};

// Actualizar imagen del producto
exports.updateProductImage = async (req, res) => {
  try {
    const updated = await Producto.findByIdAndUpdate(
      req.params.id,
      { imageUrl: req.imageUrl },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Activar/desactivar producto
exports.toggleProductActive = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    producto.activo = !producto.activo;
    await producto.save();
    res.json({ success: true, activo: producto.activo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Agregar o actualizar stock
exports.updateProductStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const updated = await Producto.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};