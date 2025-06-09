const { Order } = require('../models');
const { Key } = require('../models'); 

// Crear una nueva orden (user o guest)
exports.createOrder = async (req, res) => {
  try {
    const { items, productId, cantidad, stripeSessionId, licenses, buyerEmail } = req.body;

    // Validación básica con mensaje específico
    if (!items) {
      return res.status(400).json({ message: 'Falta el campo: items' });
    }
    if (!productId) {
      return res.status(400).json({ message: 'Falta el campo: productId' });
    }
    if (!cantidad) {
      return res.status(400).json({ message: 'Falta el campo: cantidad' });
    }
    if (!licenses) {
      return res.status(400).json({ message: 'Falta el campo: licenses' });
    }

    // Buscar keys disponibles
    const keysVendidas = await Key.find({
      producto: productId,
      status: 'available'
    }).limit(cantidad);

    // Calcular el monto total
    const totalAmount = keysVendidas.reduce((sum, key) => sum + key.price, 0);

    const order = await Order.create({
      user: req.user?.userId || undefined,
      buyer_email: buyerEmail || req.user?.email,
      items,
      totalAmount,
      stripeSessionId,
      status: 'completed',
      licenses,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear orden', error: err.message });
  }
};

// Obtener todas las órdenes (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener órdenes' });
  }
};

// Obtener las órdenes del usuario autenticado
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tus órdenes' });
  }
};

// Obtener orden por ID (admin o dueño)
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate('user').populate('licenses');
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    if (
      req.user.role !== 'admin' &&
      (!order.user || order.user.toString() !== req.user.userId)
    ) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la orden' });
  }
};
