"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: string | null;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar autenticación al cargar la página
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // También establecer cookie para el middleware
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
        
        // Decodificar el token para obtener la información
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsLoggedIn(true);
        setUserRole(payload.role || payload.rol); // Considerar ambos campos
        setUserId(payload.userId);
        setIsAdmin((payload.role === "admin") || (payload.rol === "admin"));
      } catch (error) {
        console.error("Error al decodificar token:", error);
        logout();
      }
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/auth/verify-admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        if (userRole === "admin") {
          // Si el token dice que es admin pero el backend dice que no, actualizar el estado
          setUserRole("user");
          setIsAdmin(false);
        }
      }
    } catch (error) {
      console.error("Error al verificar token:", error);
    }
  };

  const login = (token: string) => {
    // Guardar el token en localStorage
    localStorage.setItem("token", token);
    
    // También guardar en cookies para que el middleware pueda acceder
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 días
    
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setIsLoggedIn(true);
      setUserRole(payload.role);
      setUserId(payload.userId);
      setIsAdmin(payload.role === "admin");
    } catch (error) {
      console.error("Error al decodificar token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    // También eliminar la cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
