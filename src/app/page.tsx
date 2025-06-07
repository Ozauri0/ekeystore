"use client";
import Image from "next/image";
import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCartCount(prev => prev + 1);
    
    // Visual feedback
    const button = e.target as HTMLButtonElement;
    const originalHTML = button.innerHTML;
    button.innerHTML = '✓ Agregado';
    button.classList.add('bg-green-600');
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('bg-green-600');
    }, 2000);
  };

  return (
    <div className="bg-gray-950 text-white">
      <Header cartCount={cartCount} onCartCountChange={setCartCount} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-violet-900/20"></div>
        <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 30% 20%, rgba(147,51,234,0.1), transparent 50%)'}}></div>
        <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 70% 80%, rgba(168,85,247,0.1), transparent 50%)'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
              <svg className="w-4 h-4 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z"/>
              </svg>
              <span className="text-purple-300 text-sm font-medium">Licencias digitales premium</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="text-white">Licencias </span>
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">digitales</span>
              <br/>
              <span className="text-white">al mejor precio</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Windows, Office, Steam, Antivirus y más. Entrega instantánea, garantía de por vida y soporte 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button className="btn-primary text-white font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-lg">
                Explorar ofertas
              </button>
              <button className="btn-secondary text-white px-6 sm:px-8 py-3 rounded-xl">
                Ver catálogo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-white text-base sm:text-lg">Entrega Instantánea</h3>
              <p className="text-gray-400 text-sm sm:text-base">Recibe tu licencia en segundos por email</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-white text-base sm:text-lg">100% Originales</h3>
              <p className="text-gray-400 text-sm sm:text-base">Todas nuestras licencias son genuinas</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-white text-base sm:text-lg">Garantía de por vida</h3>
              <p className="text-gray-400 text-sm sm:text-base">Soporte técnico incluido</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-white text-base sm:text-lg">+50,000 clientes</h3>
              <p className="text-gray-400 text-sm sm:text-base">Confianza y experiencia comprobada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Explora por categorías</h2>
            <p className="text-gray-400 text-base sm:text-lg">Encuentra exactamente lo que necesitas</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { emoji: '🪟', name: 'Windows', count: 15, gradient: 'category-gradient-1' },
              { emoji: '📊', name: 'Office', count: 8, gradient: 'category-gradient-2' },
              { emoji: '🎮', name: 'Steam Games', count: 150, gradient: 'category-gradient-3' },
              { emoji: '🛡️', name: 'Antivirus', count: 12, gradient: 'category-gradient-4' },
              { emoji: '🎨', name: 'Adobe', count: 10, gradient: 'category-gradient-5' },
              { emoji: '🔒', name: 'VPN', count: 6, gradient: 'category-gradient-6' }
            ].map((category, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 hover:bg-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group backdrop-blur rounded-lg card-hover">
                <div className="p-4 sm:p-6 text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-lg sm:text-2xl">{category.emoji}</span>
                  </div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-white text-sm sm:text-base">{category.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">{category.count} productos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Productos destacados</h2>
            <p className="text-gray-400 text-base sm:text-lg">Las mejores ofertas en licencias digitales</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Product 1 - Windows 11 Pro */}
            <div className="bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-all duration-300 backdrop-blur group rounded-lg ring-1 ring-purple-500/50 card-hover">
              <div className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                    Windows 11 Pro
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">-85%</span>
                  <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gray-900/80 text-purple-300 border border-purple-500/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">Más vendido</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs border border-purple-500/50 text-purple-300 px-2 py-1 rounded">Windows</span>
                  <span className="text-xs text-green-400 font-medium">Entrega instantánea</span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg mb-3 text-white group-hover:text-purple-300 transition-colors font-semibold leading-tight">Windows 11 Pro</h3>
                <div className="flex items-center gap-1 sm:gap-2 mb-4 flex-wrap">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-xs sm:text-sm font-medium ml-1 text-gray-300">4.8</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">(1250 reseñas)</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold price-gradient">$29.99</span>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">$199.99</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6 pt-0">
                <button onClick={addToCart} className="w-full btn-primary text-white border-0 rounded-xl shadow-lg px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-medium flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                  </svg>
                  Agregar al carrito
                </button>
              </div>
            </div>

            {/* Product 2 - Office 2021 */}
            <div className="bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-all duration-300 backdrop-blur group rounded-lg card-hover">
              <div className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                    Office 2021
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">-91%</span>
                  <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gray-900/80 text-purple-300 border border-purple-500/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">Oferta</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs border border-purple-500/50 text-purple-300 px-2 py-1 rounded">Office</span>
                  <span className="text-xs text-green-400 font-medium">Entrega instantánea</span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg mb-3 text-white group-hover:text-purple-300 transition-colors font-semibold leading-tight">Microsoft Office 2021 Professional Plus</h3>
                <div className="flex items-center gap-1 sm:gap-2 mb-4 flex-wrap">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-xs sm:text-sm font-medium ml-1 text-gray-300">4.9</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">(890 reseñas)</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold price-gradient">$39.99</span>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">$439.99</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6 pt-0">
                <button onClick={addToCart} className="w-full btn-primary text-white border-0 rounded-xl shadow-lg px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-medium flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                  </svg>
                  Agregar al carrito
                </button>
              </div>
            </div>

            {/* Product 3 - Steam Card */}
            <div className="bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-all duration-300 backdrop-blur group rounded-lg ring-1 ring-purple-500/50 card-hover">
              <div className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-lg sm:text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                    Steam $50
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">-4%</span>
                  <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gray-900/80 text-purple-300 border border-purple-500/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">Popular</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs border border-purple-500/50 text-purple-300 px-2 py-1 rounded">Steam</span>
                  <span className="text-xs text-green-400 font-medium">Código digital</span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg mb-3 text-white group-hover:text-purple-300 transition-colors font-semibold leading-tight">Steam Wallet Gift Card $50</h3>
                <div className="flex items-center gap-1 sm:gap-2 mb-4 flex-wrap">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-xs sm:text-sm font-medium ml-1 text-gray-300">5.0</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">(2100 reseñas)</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold price-gradient">$47.99</span>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">$50.00</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6 pt-0">
                <button onClick={addToCart} className="w-full btn-primary text-white border-0 rounded-xl shadow-lg px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-medium flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                  </svg>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-gray-900 to-violet-900/20"></div>
        <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.1), transparent 70%)'}}></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-800/50 backdrop-blur rounded-3xl p-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-4 text-white">No te pierdas nuestras ofertas</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Suscríbete y recibe descuentos exclusivos y las mejores ofertas en tu email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Tu email" className="bg-gray-900/50 border border-gray-600 text-gray-200 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 rounded-xl px-4 py-3 flex-1 focus:outline-none" />
              <button className="btn-primary text-white font-semibold rounded-xl px-8 py-3">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
