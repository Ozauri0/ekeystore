export default function Footer() {
  return (
    <footer className="bg-gray-900/50 backdrop-blur border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <p>&copy; 2025 E-keystore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
