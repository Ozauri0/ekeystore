const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Crear sesión de pago de Stripe
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { cartItems, buyerEmail } = req.body;
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'No hay productos en el carrito' });
    }

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.nombre,
        },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: buyerEmail,
      // Guardar el carrito en metadata para el webhook
      metadata: {
        cartItems: JSON.stringify(cartItems),
      },
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Error en Stripe Checkout:', err); // Log detallado para depuración
    res.status(500).json({ error: err.message, details: err });
  }
});

// Webhook para Stripe: crear orden y enviar correo tras pago exitoso
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  console.log('Webhook recibido');
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      const buyerEmail = session.customer_email;
      if (!buyerEmail) {
        console.error('No se recibió customer_email en la sesión de Stripe:', session);
        return res.status(400).send('No se recibió email del comprador');
      }
      // Recuperar los datos del carrito desde session.metadata.cartItems (si los guardaste)
      let cartItems = [];
      if (session.metadata && session.metadata.cartItems) {
        cartItems = JSON.parse(session.metadata.cartItems);
      }
      // Aquí deberías generar las licencias y guardarlas en la base de datos
      // Por simplicidad, se envía un correo de prueba
      const { sendPurchaseEmail } = require('../services/mailService');
      // Simulación de licencias generadas
      const licenses = cartItems.map((item, idx) => ({ key: `CLAVE-DE-PRUEBA-${idx + 1}` }));
      await sendPurchaseEmail({
        to: buyerEmail,
        orderId: session.id,
        licenses,
      });
      console.log('Correo de compra enviado a:', buyerEmail);
    } catch (err) {
      console.error('Error al procesar el webhook de Stripe:', err);
      return res.status(500).send('Error al procesar el webhook');
    }
  }
  res.json({ received: true });
});

module.exports = router;
