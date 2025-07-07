const transporter = require('../config/mailer');

exports.sendPurchaseEmail = async ({ to, orderId, licenses }) => {
  const keysList = licenses.map(k => `<li>${k.key}</li>`).join('');

  const html = `
    <h2>Gracias por tu compra en E-Key Store</h2>
    <p>Orden: <strong>${orderId}</strong></p>
    <p>Estas son tus claves:</p>
    <ul>${keysList}</ul>
    <p>Si tienes problemas, contáctanos.</p>
  `;

  console.log('Enviando correo a:', to, 'con licencias:', licenses);
  await transporter.sendMail({
    from: '"E-Key Store" <no-reply@ekey.com>',
    to,
    subject: 'Tus claves de activación',
    html,
  });
  console.log('Correo enviado (o intentado) a:', to);
};
