"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Cargar carrito al iniciar
  useEffect(() => {
    loadCart();
  }, [isAuthenticated]);

  // Actualizar contadores cuando cambie el carrito
  useEffect(() => {
    updateCartSummary();
  }, [cart]);

  const updateCartSummary = async () => {
    if (cart.length === 0) {
      setItemCount(0);
      setTotal(0);
      return;
    }

    try {
      // Obtener precios de productos
      const response = await fetch('http://localhost:3001/api/products');
      if (response.ok) {
        const data = await response.json();
        const products = data.data;
        
        let totalItems = 0;
        let totalPrice = 0;
        
        cart.forEach(item => {
          const product = products.find((p: any) => p._id === item.productId);
          if (product) {
            totalItems += item.quantity;
            totalPrice += product.precio * item.quantity;
          }
        });
        
        setItemCount(totalItems);
        setTotal(totalPrice);
      }
    } catch (error) {
      console.error('Error al calcular totales:', error);
    }
  };

  const loadCart = async () => {
    try {
      if (isAuthenticated) {
        // Cargar desde el servidor para usuarios autenticados
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setCart(data.items || []);
        }
      } else {
        // Cargar desde localStorage para usuarios no autenticados
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          setCart(JSON.parse(localCart));
        }
      }
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    }
  };

  const saveCartToLocal = (newCart: CartItem[]) => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productoId: productId, cantidad: quantity })
        });

        if (response.ok) {
          await loadCart(); // Recargar carrito desde servidor
        } else {
          const errorData = await response.json();
          console.error('Error del servidor:', errorData);
          throw new Error(errorData.message || 'Error al agregar al carrito');
        }
      } else {
        // Manejar carrito local
        setCart(prevCart => {
          const existingItem = prevCart.find(item => item.productId === productId);
          let newCart;
          
          if (existingItem) {
            newCart = prevCart.map(item =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newCart = [...prevCart, { productId, quantity }];
          }
          
          saveCartToLocal(newCart);
          return newCart;
        });
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/cart/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productoId: productId, cantidad: quantity })
        });

        if (response.ok) {
          await loadCart();
        } else {
          const errorData = await response.json();
          console.error('Error del servidor:', errorData);
        }
      } else {
        setCart(prevCart => {
          const newCart = prevCart.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          );
          saveCartToLocal(newCart);
          return newCart;
        });
      }
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/cart/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productoId: productId })
        });

        if (response.ok) {
          await loadCart();
        } else {
          const errorData = await response.json();
          console.error('Error del servidor:', errorData);
        }
      } else {
        setCart(prevCart => {
          const newCart = prevCart.filter(item => item.productId !== productId);
          saveCartToLocal(newCart);
          return newCart;
        });
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/cart/clear', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setCart([]);
        }
      } else {
        setCart([]);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
    }
  };

  const value = {
    cart,
    itemCount,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};