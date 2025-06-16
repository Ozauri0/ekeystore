const { Cart } = require('../models');

exports.addToCart = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    const userId = req.user.userId;

    const item = await Cart.findOneAndUpdate(
      { user: userId, producto: productoId },
      { $inc: { cantidad } },
      { new: true, upsert: true }
    );

    res.json(item);
  } catch (err) {
    console.error('Error en addToCart:', err);
    res.status(500).json({ message: 'Error al agregar al carrito', error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const items = await Cart.find({ user: req.user.userId }).populate('producto');
    
    // Convertir el formato para que coincida con el frontend
    const formattedItems = items.map(item => ({
      productId: item.producto._id,
      quantity: item.cantidad
    }));
    
    res.json({ items: formattedItems });
  } catch (err) {
    console.error('Error en getCart:', err);
    res.status(500).json({ message: 'Error al obtener el carrito', error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    const userId = req.user.userId;

    const item = await Cart.findOneAndUpdate(
      { user: userId, producto: productoId },
      { cantidad },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    res.json(item);
  } catch (err) {
    console.error('Error en updateCart:', err);
    res.status(500).json({ message: 'Error al actualizar el carrito', error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productoId } = req.body;
    const userId = req.user.userId;

    const result = await Cart.findOneAndDelete({ user: userId, producto: productoId });

    if (!result) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    res.json({ message: 'Producto eliminado del carrito' });
  } catch (err) {
    console.error('Error en removeFromCart:', err);
    res.status(500).json({ message: 'Error al eliminar del carrito', error: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    await Cart.deleteMany({ user: userId });
    res.json({ message: 'Carrito vaciado' });
  } catch (err) {
    console.error('Error en clearCart:', err);
    res.status(500).json({ message: 'Error al vaciar el carrito', error: err.message });
  }
};
