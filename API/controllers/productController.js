const { Producto } = require('../models');

// Helper para obtener el nombre de la imagen si viene por multipart
function getImagenFromReq(req) {
  if (req.file && req.file.filename) return req.file.filename;
  if (req.body.imagen) return req.body.imagen;
  return undefined;
}

exports.getAllProducts = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json({ data: productos });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      nombre, categoria, precio, precioOriginal, descripcion, descripcionCorta,
      descuento, stock, activo, destacado, etiquetas, valoracion, numeroReseñas,
      tipoEntrega, sistemaOperativo, requisitos, garantia, idiomas, version
    } = req.body;
    const imagen = getImagenFromReq(req);
    const nuevo = await Producto.create({
      nombre, categoria, precio, precioOriginal, descripcion, descripcionCorta,
      imagen, descuento, stock, activo, destacado, etiquetas, valoracion, numeroReseñas,
      tipoEntrega, sistemaOperativo, requisitos, garantia, idiomas, version
    });
    res.status(201).json({ data: nuevo });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear producto', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const update = { ...req.body };
    // Si viene imagen nueva, actualizarla
    const imagen = getImagenFromReq(req);
    if (imagen) update.imagen = imagen;
    const updated = await Producto.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Producto.findByIdAndDelete(req.params.id);
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