"use client";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  quantity: number;
  discount: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Windows 11 Pro",
      price: 29.99,
      originalPrice: 199.99,
      image: "Windows 11 Pro",
      category: "Windows",
      quantity: 1,
      discount: 85
    },
    {
      id: 2,
      name: "Microsoft Office 2021 Professional Plus",
      price: 39.99,
      originalPrice: 439.99,
      image: "Office 2021",
      category: "Office",
      quantity: 2,
      discount: 91
    },
    {
      id: 3,
      name: "Steam Wallet Gift Card $50",
      price: 47.99,
      originalPrice: 50.00,
      image: "Steam $50",
      category: "Steam",
      quantity: 1,
      discount: 4
    }
  ]);

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyDiscountCode = () => {
    const validCodes = {
      "WELCOME10": 10,
      "SAVE20": 20,
      "FIRST15": 15,
      "EKEYSTORE25": 25
    };

    const code = discountCode.toUpperCase();
    if (validCodes[code as keyof typeof validCodes]) {
      setAppliedDiscount(validCodes[code as keyof typeof validCodes]);
      setDiscountMessage(`¡Código aplicado! ${validCodes[code as keyof typeof validCodes]}% de descuento`);
    } else {
      setDiscountMessage("Código de descuento inválido");
      setAppliedDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold gradient-text">E-keystore</span>
              </a>
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Inicio</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Windows</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Office</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Games</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Antivirus</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="border border-purple-500/30 bg-gray-800/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all px-4 py-2 rounded-lg flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                </svg>
                Carrito ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
            </div>
          </div>
        </div>
      </header>      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-4rem)]">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Carrito de Compras</h1>
          <p className="text-gray-400 text-lg">Revisa tus productos antes de continuar</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Tu carrito está vacío</h3>
            <p className="text-gray-400 mb-8">Explora nuestros productos y encuentra las mejores ofertas</p>
            <a href="/" className="btn-primary text-white px-8 py-3 rounded-xl font-medium inline-block">
              Ir a la tienda
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur">
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {item.image}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs border border-purple-500/50 text-purple-300 px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded font-medium">
                          -{item.discount}%
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 truncate">{item.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold price-gradient">${item.price}</span>
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                        </svg>
                      </button>
                      <span className="w-8 text-center font-semibold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 bg-red-600/20 hover:bg-red-600 rounded-lg flex items-center justify-center text-red-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>

                    {/* Item Total */}
                    <div className="text-right flex-shrink-0 min-w-[80px]">
                      <div className="text-lg font-bold price-gradient">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur lg:sticky lg:top-24">
                <h3 className="text-xl font-semibold text-white mb-6">Resumen del pedido</h3>
                
                {/* Discount Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Código de descuento
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Ingresa tu código"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={applyDiscountCode}
                      className="btn-secondary px-4 py-2 rounded-lg font-medium"
                    >
                      Aplicar
                    </button>
                  </div>
                  {discountMessage && (
                    <p className={`text-sm mt-2 ${appliedDiscount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {discountMessage}
                    </p>
                  )}
                  <div className="mt-3 text-xs text-gray-500">
                    <p>Códigos disponibles para prueba:</p>
                    <p>WELCOME10, SAVE20, FIRST15, EKEYSTORE25</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Descuento ({appliedDiscount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-semibold text-white">
                      <span>Total</span>
                      <span className="price-gradient">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full btn-primary text-white py-3 rounded-xl font-semibold mb-4">
                  Proceder al pago
                </button>

                {/* Continue Shopping */}
                <a href="/" className="block text-center text-purple-400 hover:text-purple-300 transition-colors">
                  Continuar comprando
                </a>

                {/* Security Features */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Entrega instantánea por email</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <span>Pago seguro SSL</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    <span>Garantía de por vida</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold gradient-text">E-keystore</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Tu tienda de confianza para licencias digitales originales al mejor precio del mercado.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Productos</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Windows</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Microsoft Office</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Steam Games</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Antivirus</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Soporte</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Garantías</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Términos de uso</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Política de reembolso</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 E-keystore. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
