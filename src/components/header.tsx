"use client";
import { useState } from "react";

interface HeaderProps {
  cartCount?: number;
  onCartCountChange?: (count: number) => void;
}

export default function Header({ cartCount = 0, onCartCountChange }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
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
  );
}
