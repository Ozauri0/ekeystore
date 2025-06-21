const { Order } = require('../models');
const { Key } = require('../models'); 
const { sendPurchaseEmail } = require('../services/mailService');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, stripeSessionId, licenses, buyerEmail } = req.body;

    if (!items || !totalAmount || !licenses) {
      return res.status(400).json({ message: 'Faltan datos requeridos para crear la orden' });
    }

    const emailDestino = buyerEmail || req.user?.email;
    if (!emailDestino) {
      return res.status(400).json({ message: 'No se especificó el correo del comprador' });
    }

    const order = await Order.create({
      user: req.user?.userId || undefined,
      buyer_email: emailDestino,
      items,
      costo_total: totalAmount,
      stripeSessionId,
      status: 'completed',
      licenses,
    });

    // Obtener las claves desde la DB
    const licenseDocs = await Key.find({ _id: { $in: licenses } });

    // Enviar correo con claves
    await sendPurchaseEmail({
      to: emailDestino,
      orderId: order._id,
      licenses: licenseDocs,
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

exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json({ success: true, message: 'Orden eliminada' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};