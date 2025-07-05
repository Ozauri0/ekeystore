const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');
const OrderDetail = require('./OrderDetail');
const Key = require('./Key');
const Payment = require('./Payment');
const Recommendation = require('./Recomendation');

module.exports = {
  User,
  Product,
  Cart: Cart, // El modelo Cart.js exporta 'Carrito'
  Order,
  OrderDetail,
  Key,
  Payment,
  Recommendation,
};
