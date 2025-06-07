"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold gradient-text">E-keystore</span>
              </a>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Inicio</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Windows</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Office</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Games</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Antivirus</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input type="text" placeholder="Buscar productos..." className="pl-10 w-64 bg-gray-800/50 border border-gray-700 text-gray-200 placeholder-gray-400 rounded-lg px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 focus:outline-none" />
              </div>
              <a href="/carrito" className="border border-purple-500/30 bg-gray-800/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                </svg>
                Carrito ({cartCount})
              </a>
              <button onClick={toggleTheme} className="border border-purple-500/30 bg-gray-800/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all p-2 rounded-lg">
                {isDarkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

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
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Licencias </span>
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">digitales</span>
              <br/>
              <span className="text-white">al mejor precio</span>
            </h1>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Windows, Office, Steam, Antivirus y más. Entrega instantánea, garantía de por vida y soporte 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-white font-semibold px-8 py-3 rounded-xl shadow-lg">
                Explorar ofertas
              </button>
              <button className="btn-secondary text-white px-8 py-3 rounded-xl">
                Ver catálogo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-white text-lg">Entrega Instantánea</h3>
              <p className="text-gray-400">Recibe tu licencia en segundos por email</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-white text-lg">100% Originales</h3>
              <p className="text-gray-400">Todas nuestras licencias son genuinas</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-white text-lg">Garantía de por vida</h3>
              <p className="text-gray-400">Soporte técnico incluido</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3 text-white text-lg">+50,000 clientes</h3>
              <p className="text-gray-400">Confianza y experiencia comprobada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Explora por categorías</h2>
            <p className="text-gray-400 text-lg">Encuentra exactamente lo que necesitas</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { emoji: '🪟', name: 'Windows', count: 15, gradient: 'category-gradient-1' },
              { emoji: '📊', name: 'Office', count: 8, gradient: 'category-gradient-2' },
              { emoji: '🎮', name: 'Steam Games', count: 150, gradient: 'category-gradient-3' },
              { emoji: '🛡️', name: 'Antivirus', count: 12, gradient: 'category-gradient-4' },
              { emoji: '🎨', name: 'Adobe', count: 10, gradient: 'category-gradient-5' },
              { emoji: '🔒', name: 'VPN', count: 6, gradient: 'category-gradient-6' }
            ].map((category, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 hover:bg-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group backdrop-blur rounded-lg card-hover">
                <div className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{category.emoji}</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.count} productos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Productos destacados</h2>
            <p className="text-gray-400 text-lg">Las mejores ofertas en licencias digitales</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Product 1 - Windows 11 Pro */}
            <div className="bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-all duration-300 backdrop-blur group rounded-lg ring-1 ring-purple-500/50 card-hover">
              <div className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                    Windows 11 Pro
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-medium">-85%</span>
                  <span className="absolute top-3 right-3 bg-gray-900/80 text-purple-300 border border-purple-500/50 px-2 py-1 rounded text-xs">Más vendido</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs border border-purple-500/50 text-purple-300 px-2 py-1 rounded">Windows</span>
                  <span className="text-xs text-green-400 font-medium">Entrega instantánea</span>
                </div>
                <h3 className="text-lg mb-3 text-white group-hover:text-purple-300 transition-colors font-semibold">Windows 11 Pro</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-sm font-medium ml-1 text-gray-300">4.8</span>
                  </div>
                  <span className="text-sm text-gray-500">(1250 reseñas)</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold price-gradient">$29.99</span>
                  <span className="text-sm text-gray-500 line-through">$199.99</span>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button onClick={addToCart} className="w-full btn-primary text-white border-0 rounded-xl shadow-lg px-4 py-3 font-medium flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="w-full h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                    Office 2021
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-medium">-91%</span>
                  <span className="absolute top-3 right-3 bg-gray-900/80 text-purple-300 border border-purple-500/50 px-2 py-1 rounded text-xs">Oferta</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs border border-purple-500/50 text-purple-300 px-2 py-1 rounded">Office</span>
                  <span className="text-xs text-green-400 font-medium">Entrega instantánea</span>
                </div>
                <h3 className="text-lg mb-3 text-white group-hover:text-purple-300 transition-colors font-semibold">Microsoft Office 2021 Professional Plus</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-sm font-medium ml-1 text-gray-300">4.9</span>
                  </div>
                  <span className="text-sm text-gray-500">(890 reseñas)</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold price-gradient">$39.99</span>
                  <span className="text-sm text-gray-500 line-through">$439.99</span>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button onClick={addToCart} className="w-full btn-primary text-white border-0 rounded-xl shadow-lg px-4 py-3 font-medium flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                    Steam $50
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-medium">-4%</span>
                  <span className="absolute top-3 right-3 bg-gray-900/80 text-purple-300 border border-purple-500/50 px-2 py-1 rounded text-xs">Popular</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs border border-purple-500/50 text-purple-300 px-2 py-1 rounded">Steam</span>
                  <span className="text-xs text-green-400 font-medium">Código digital</span>
                </div>
                <h3 className="text-lg mb-3 text-white group-hover:text-purple-300 transition-colors font-semibold">Steam Wallet Gift Card $50</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-sm font-medium ml-1 text-gray-300">5.0</span>
                  </div>
                  <span className="text-sm text-gray-500">(2100 reseñas)</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold price-gradient">$47.99</span>
                  <span className="text-sm text-gray-500 line-through">$50.00</span>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button onClick={addToCart} className="w-full btn-primary text-white border-0 rounded-xl shadow-lg px-4 py-3 font-medium flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
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
