"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useCart } from "@/contexts/CartContext";

// Utilidad para limpiar la ruta de la imagen y evitar doble /uploads/
function cleanImageSrc(src: string) {
  if (!src) return "/default-image.webp"; // fallback si no hay imagen
  // Elimina cualquier repetición de /uploads/ al inicio
  return src.replace(/(\/uploads\/)+/, "/uploads/");
}

interface Product {
  _id: string;
  nombre: string;
  categoria: string;
  precio: number;
  precioOriginal?: number;
  descripcion: string;
  descripcionCorta: string;
  imagen: string;
  descuento?: number;
  destacado: boolean;
  valoracion: number;
  numeroReseñas: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  // Usar el contexto del carrito
  const { addToCart, itemCount } = useCart();

  // Función para obtener colores de categoría
  const getCategoryGradient = (categoria: string): string => {
    const gradients: { [key: string]: string } = {
      'Sistema Operativo': 'from-blue-600 to-purple-600',
      'Productividad': 'from-orange-500 to-red-600',
      'Gaming': 'from-gray-700 to-gray-900',
      'Steam': 'from-gray-700 to-gray-900',
      'Seguridad': 'from-green-600 to-emerald-600',
      'Antivirus': 'from-green-600 to-emerald-600',
      'Diseño': 'from-red-600 to-pink-600',
      'VPN': 'from-indigo-600 to-purple-600',
      'Windows': 'from-blue-600 to-purple-600',
      'Office': 'from-orange-500 to-red-600',
      'Adobe': 'from-red-600 to-pink-600'
    };
    
    return gradients[categoria] || 'from-gray-600 to-gray-800';
  };

  // Función para obtener productos desde la API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/products');
      
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
        const data = await response.json();
      setProducts(data.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      // En caso de error, usamos productos de ejemplo para que la página no se rompa
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Escuchar evento global para filtro de categoría
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setCategoryFilter(e.detail);
    };
    window.addEventListener('filter-category', handler as EventListener);
    return () => window.removeEventListener('filter-category', handler as EventListener);
  }, []);

  // Productos filtrados por categoría
  const filteredProducts = categoryFilter
    ? products.filter(p => p.categoria && p.categoria.toLowerCase().includes(categoryFilter.toLowerCase()))
    : products;

  // Función para manejar agregar al carrito
  const handleAddToCart = async (product: Product, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Visual feedback
    const button = e.target as HTMLButtonElement;
    const originalHTML = button.innerHTML;
    button.innerHTML = '⏳ Agregando...';
    button.disabled = true;
    
    try {
      await addToCart(product._id, 1);
      
      button.innerHTML = '✓ Agregado';
      button.classList.add('bg-green-600');
      
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('bg-green-600');
        button.disabled = false;
      }, 2000);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      button.innerHTML = '❌ Error';
      button.classList.add('bg-red-600');
      
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('bg-red-600');
        button.disabled = false;
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-950 text-white">
      <Header />

      {/* Featured Products - Main Focus - First Thing Visible */}
      <section className="pt-8 pb-8 sm:pt-12 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Productos destacados</span>
            </h1>
            <p className="text-gray-400 text-lg">Las mejores ofertas en licencias digitales</p>
          </div>          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                <span className="ml-4 text-white text-lg">Cargando productos...</span>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-400 text-lg">No hay productos disponibles para esta categoría</p>
              </div>
            ) : (
              filteredProducts.map((product) => {
                const imgSrc = cleanImageSrc(product.imagen && !product.imagen.startsWith('http') ? `/uploads/${product.imagen}` : product.imagen);
                return (
                  <div key={product._id} className="bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-all duration-300 backdrop-blur group rounded-lg ring-1 ring-purple-500/50 card-hover">
                    <div className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        {imgSrc && (
                          <Image
                            src={imgSrc}
                            alt={product.nombre}
                            width={400}
                            height={160}
                            className="w-full h-40 object-contain bg-white"
                            priority
                            style={{ width: 'auto', height: 'auto' }}
                          />
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none`}></div>
                        {product.descuento && product.descuento > 0 && (
                          <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-medium">-{product.descuento}%</span>
                        )}
                        {product.destacado && (
                          <span className="absolute top-2 right-2 bg-gray-900/80 text-purple-300 border border-purple-500/50 px-2 py-1 rounded text-xs">Destacado</span>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs border border-purple-500/50 text-purple-300 px-2 py-1 rounded">{product.categoria}</span>
                        <span className="text-xs text-green-400 font-medium">Instantánea</span>
                      </div>
                      <h3 className="text-base mb-3 text-white group-hover:text-purple-300 transition-colors font-semibold">{product.nombre}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span className="text-sm font-medium ml-1 text-gray-300">{product.valoracion}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.numeroReseñas})</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl font-bold price-gradient">${product.precio}</span>
                        {product.precioOriginal && product.precioOriginal > product.precio && (
                          <span className="text-sm text-gray-500 line-through">${product.precioOriginal}</span>
                        )}
                      </div>
                      <button onClick={(e) => handleAddToCart(product, e)} className="w-full btn-primary text-white border-0 rounded-xl shadow-lg py-2.5 text-sm font-medium flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                        </svg>
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Ver más productos */}
          <div className="text-center mt-10">
            <button className="btn-secondary text-white px-8 py-3 rounded-xl font-medium hover:scale-105 transition-transform">
              Ver todos los productos
            </button>
          </div>
        </div>
      </section>

      {/* Categories - Secondary */}
      <section className="py-8 sm:py-12 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Categorías populares</h2>
            <p className="text-gray-400">Encuentra exactamente lo que necesitas</p>
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

      {/* Features - Compact */}
      <section className="py-8 sm:py-12 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white text-sm">Entrega Instantánea</h3>
              <p className="text-gray-400 text-xs">En segundos por email</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white text-sm">100% Originales</h3>
              <p className="text-gray-400 text-xs">Licencias genuinas</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white text-sm">Garantía de por vida</h3>
              <p className="text-gray-400 text-xs">Soporte incluido</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white text-sm">+50,000 clientes</h3>
              <p className="text-gray-400 text-xs">Confianza comprobada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Compact */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-gray-900 to-violet-900/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-3 text-white">Ofertas exclusivas</h2>
            <p className="text-gray-300 mb-6">
              Suscríbete y recibe las mejores ofertas en tu email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Tu email" className="bg-gray-900/50 border border-gray-600 text-gray-200 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 rounded-xl px-4 py-3 flex-1 focus:outline-none" />
              <button className="btn-primary text-white font-semibold rounded-xl px-6 py-3">
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
