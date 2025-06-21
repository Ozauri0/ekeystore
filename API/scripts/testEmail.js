require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const { sendPurchaseEmail } = require('../services/mailService');

(async () => {
  try {
    await connectDB();

    await sendPurchaseEmail({
      to: 'demo@mailtrap.io', // o tu propio correo registrado en Mailtrap
      orderId: 'TEST-ORDER-001',
      licenses: [
        { key: 'AAA-BBB-CCC-DDD' },
        { key: 'EEE-FFF-GGG-HHH' }
      ]
    });

    console.log('✅ Correo de prueba enviado correctamente.');
    process.exit();
  } catch (error) {
    console.error('❌ Error al enviar correo:', error.message);
    process.exit(1);
  }
})();
