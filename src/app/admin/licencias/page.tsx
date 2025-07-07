"use client";
import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";
import "../admin.css"; // Importamos los estilos de administración

interface Licencia {
  _id: string;
  key: string;
  producto?: { nombre?: string; _id?: string } | string;
  usuario?: { email?: string; _id?: string } | string;
  estado: string;
  createdAt: string;
}

export default function LicenciasPage() {
  const [licencias, setLicencias] = useState<Licencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLicencias();
  }, []);

  const fetchLicencias = async () => {
    try {
      setLoading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/keys`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) throw new Error("Error al obtener licencias");
      const data = await response.json();
      setLicencias(data.data || data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrado de licencias
  const filteredLicencias = licencias.filter(
    (lic) => {
      const searchLower = search.toLowerCase();
      // Obtener producto como string para búsqueda
      let productoStr = "";
      if (typeof lic.producto === "object" && lic.producto !== null) {
        productoStr = (lic.producto.nombre || lic.producto._id || "").toLowerCase();
      } else if (typeof lic.producto === "string") {
        productoStr = lic.producto.toLowerCase();
      }
      
      // Obtener usuario como string para búsqueda
      let usuarioStr = "";
      if (typeof lic.usuario === "object" && lic.usuario !== null) {
        usuarioStr = (lic.usuario.email || lic.usuario._id || "").toLowerCase();
      } else if (typeof lic.usuario === "string") {
        usuarioStr = lic.usuario.toLowerCase();
      }
      
      return lic._id.toLowerCase().includes(searchLower) ||
        lic.key.toLowerCase().includes(searchLower) ||
        productoStr.includes(searchLower) ||
        usuarioStr.includes(searchLower) ||
        lic.estado.toLowerCase().includes(searchLower);
    }
  );

  // Función para determinar el color de estado
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activa':
      case 'active':
      case 'activada':
        return 'bg-green-900/50 text-green-300';
      case 'inactiva':
      case 'inactive':
        return 'bg-amber-900/50 text-amber-300';
      case 'revocada':
      case 'revoked':
      case 'cancelada':
        return 'bg-red-900/50 text-red-300';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminNav />
        
        <div className="mb-8 mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Gestión de Licencias
            </span>
          </h1>
          <p className="text-gray-400">Administra las licencias generadas en tu plataforma</p>
        </div>

        {loading && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg p-4 text-gray-300">
            Cargando licencias...
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 backdrop-blur rounded-lg p-4 text-red-200 mb-4">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg ring-1 ring-purple-500/50 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Lista de Licencias</h2>
              <input
                type="text"
                placeholder="Buscar licencia..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full max-w-xs"
              />
            </div>
            
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Key</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Producto</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Usuario</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredLicencias.map((lic) => {
                    // Producto
                    let producto = "-";
                    if (typeof lic.producto === "object" && lic.producto !== null) {
                      producto = lic.producto.nombre || lic.producto._id || "-";
                    } else if (typeof lic.producto === "string") {
                      producto = lic.producto;
                    }
                    // Usuario
                    let usuario = "-";
                    if (typeof lic.usuario === "object" && lic.usuario !== null) {
                      usuario = lic.usuario.email || lic.usuario._id || "-";
                    } else if (typeof lic.usuario === "string") {
                      usuario = lic.usuario;
                    }
                    return (
                      <tr key={lic._id} className="hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-3 text-xs break-all text-gray-300">{lic._id}</td>
                        <td className="px-4 py-3 text-xs font-mono text-gray-300">{lic.key}</td>
                        <td className="px-4 py-3 text-xs text-gray-300">{producto}</td>
                        <td className="px-4 py-3 text-xs text-gray-300">{usuario}</td>
                        <td className="px-4 py-3 text-xs">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(lic.estado)}`}>
                            {lic.estado}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-300">{new Date(lic.createdAt).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {!loading && !error && filteredLicencias.length === 0 && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg p-6 text-center text-gray-400">
            No se encontraron licencias que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
