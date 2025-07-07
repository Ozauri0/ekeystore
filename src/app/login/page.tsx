"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, isAdmin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token en localStorage y actualizar el contexto de autenticación
        login(data.token);
        
        // Siempre redirigir a la página principal (tienda)
        router.push('/');
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión. Verifica que la API esté funcionando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Iniciar Sesión
            </span>
          </h1>
          <p className="text-gray-400">Accede a tu cuenta de EKeyStore</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-900/50 border border-gray-600 text-gray-200 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 rounded-xl px-4 py-3 focus:outline-none transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full bg-gray-900/50 border border-gray-600 text-gray-200 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 rounded-xl px-4 py-3 focus:outline-none transition-colors"
                placeholder="Tu contraseña"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-white font-semibold py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 hover:text-purple-300 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}