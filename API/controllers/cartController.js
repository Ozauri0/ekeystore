
const { Carrito } = require('../models');

exports.addToCart = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    const userId = req.user.userId;

    const item = await Carrito.findOneAndUpdate(
      { user: userId, producto: productoId },
      { $inc: { cantidad } },
      { new: true, upsert: true }
    );

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const items = await Carrito.find({ user: req.user.userId }).populate('producto');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};
