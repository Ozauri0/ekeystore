"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  cartCount?: number;
  onCartCountChange?: (count: number) => void;
}

export default function Header({ cartCount = 0, onCartCountChange }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Verificar si el usuario está logueado al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUserName("Christian");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    setShowUserDropdown(false);
    window.location.href = "/";
  };

  return (
    <>
      <header className="bg-gray-900/80 backdrop-blur border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z"/>
                  </svg>
                </div>
                <span className="text-xl sm:text-2xl font-bold gradient-text">E-keystore</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Inicio</Link>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Windows</a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Office</a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Games</a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Antivirus</a>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search - Hidden on mobile */}
              <div className="relative hidden lg:block">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input type="text" placeholder="Buscar productos..." className="pl-10 w-64 bg-gray-800/50 border border-gray-700 text-gray-200 placeholder-gray-400 rounded-lg px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 focus:outline-none" />
              </div>

              {/* Cart button */}
              <Link href="/carrito" className="border border-purple-500/30 bg-gray-800/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center">
                <svg className="w-4 h-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                </svg>
                <span className="hidden sm:inline">Carrito ({cartCount})</span>
                <span className="sm:hidden">({cartCount})</span>
              </Link>

              {/* Theme toggle */}
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

              {/* User dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <button className="border border-purple-500/30 bg-gray-800/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all p-2 rounded-lg flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  {isLoggedIn && (
                    <span className="hidden sm:inline text-sm font-medium">{userName}</span>
                  )}
                </button>

                {/* Dropdown menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur border border-gray-700 rounded-xl shadow-xl py-2 z-50">
                    {!isLoggedIn ? (
                      <>
                        <Link 
                          href="/login" 
                          className="block px-4 py-2 text-gray-300 hover:bg-purple-600/20 hover:text-purple-300 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                            </svg>
                            <span>Iniciar Sesión</span>
                          </div>
                        </Link>
                        <Link 
                          href="/registro" 
                          className="block px-4 py-2 text-gray-300 hover:bg-purple-600/20 hover:text-purple-300 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                            </svg>
                            <span>Registrarse</span>
                          </div>
                        </Link>
                      </>
                    ) : (
                      <>
                        <a 
                          href="#" 
                          className="block px-4 py-2 text-gray-300 hover:bg-purple-600/20 hover:text-purple-300 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            <span>Mi Perfil</span>
                          </div>
                        </a>
                        <a 
                          href="#" 
                          className="block px-4 py-2 text-gray-300 hover:bg-purple-600/20 hover:text-purple-300 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            <span>Mis Pedidos</span>
                          </div>
                        </a>
                        <div className="border-t border-gray-700 mt-2 pt-2">
                          <button 
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                              </svg>
                              <span>Cerrar Sesión</span>
                            </div>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden border border-purple-500/30 bg-gray-800/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all p-2 rounded-lg"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur border-b border-gray-800 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input type="text" placeholder="Buscar productos..." className="pl-10 w-full bg-gray-800/50 border border-gray-700 text-gray-200 placeholder-gray-400 rounded-lg px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 focus:outline-none" />
              </div>
            </div>

            {/* Mobile Authentication */}
            {!isLoggedIn ? (
              <div className="mb-4 space-y-2 sm:hidden">
                <Link 
                  href="/login" 
                  className="block w-full text-center bg-gray-800/50 border border-gray-700 text-gray-300 hover:text-purple-400 transition-colors font-medium py-2 rounded-lg"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  href="/registro" 
                  className="block w-full text-center btn-primary text-white py-2 rounded-lg font-medium"
                >
                  Registrarse
                </Link>
              </div>
            ) : (
              <div className="mb-4 pb-4 border-b border-gray-800 sm:hidden">
                <p className="text-gray-300 text-sm mb-2">Hola, {userName}</p>
                <button 
                  onClick={handleLogout}
                  className="w-full text-center bg-gray-800/50 border border-gray-700 text-red-400 hover:text-red-300 transition-colors font-medium py-2 rounded-lg"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium py-2 border-b border-gray-800">Inicio</Link>
              <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium py-2 border-b border-gray-800">Windows</a>
              <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium py-2 border-b border-gray-800">Office</a>
              <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium py-2 border-b border-gray-800">Games</a>
              <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium py-2">Antivirus</a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
