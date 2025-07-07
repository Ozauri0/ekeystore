"use client";
import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";
import "../admin.css"; // Importamos los estilos de administración

// Ajusta los campos según tu modelo de orden
interface Orden {
  _id: string;
  user?: {
    _id: string;
    email: string;
    nombre?: string;
    apellido?: string;
    rol?: string;
  };
  status: string;
  costo_total: number;
  orden_fecha: string;
  createdAt: string;
  // Agrega más campos si tu modelo los tiene
}

export default function OrdenesPage() {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrden, setSelectedOrden] = useState<Orden | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrdenes();
  }, []);

  // Función para obtener órdenes desde la API
  const fetchOrdenes = async () => {
    try {
      setLoading(true);
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error al obtener órdenes: ${response.status} - ${text}`);
      }
      const data = await response.json();
      console.log("Respuesta órdenes:", data);
      setOrdenes(data.data || data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrdenes = ordenes.filter(
    (orden) =>
      orden._id?.toLowerCase().includes(search.toLowerCase()) ||
      orden.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      orden.user?.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  // Función para determinar el color de estado
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completada':
      case 'completed':
      case 'entregada':
        return 'bg-green-900/50 text-green-300';
      case 'pendiente':
      case 'pending':
        return 'bg-amber-900/50 text-amber-300';
      case 'cancelada':
      case 'cancelled':
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
              Gestión de Órdenes
            </span>
          </h1>
          <p className="text-gray-400">Administra los pedidos de tu tienda</p>
        </div>

        {loading && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg p-4 text-gray-300">
            Cargando órdenes...
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
              <h2 className="text-xl font-bold text-white">Lista de Órdenes</h2>
              <input
                type="text"
                placeholder="Buscar por usuario, email o ID..."
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
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Usuario</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Fecha</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredOrdenes.map((orden) => {
                    let usuario = "-";
                    if (orden.user) {
                      usuario = orden.user.email || orden.user.nombre || orden.user._id || "-";
                    }
                    return (
                      <tr key={orden._id} className="hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-3 text-xs break-all text-gray-300">{orden._id}</td>
                        <td className="px-4 py-3 text-xs text-gray-300">{usuario}</td>
                        <td className="px-4 py-3 text-xs">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(orden.status)}`}>
                            {orden.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-300">${orden.costo_total}</td>
                        <td className="px-4 py-3 text-xs text-gray-300">{new Date(orden.orden_fecha || orden.createdAt).toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs">
                          <button
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-blue-700"
                            onClick={() => setSelectedOrden(orden)}
                          >
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {!loading && !error && filteredOrdenes.length === 0 && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg p-6 text-center text-gray-400">
            No se encontraron órdenes que coincidan con tu búsqueda.
          </div>
        )}
        
        {selectedOrden && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700 p-6 rounded-lg shadow-lg max-w-lg w-full relative ring-1 ring-purple-500/50">
              <button
                className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
                onClick={() => setSelectedOrden(null)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Detalle de Orden
              </h2>
              
              <div className="space-y-3 text-gray-300">
                <div className="grid grid-cols-3 gap-2 pb-2 border-b border-gray-700">
                  <div className="font-medium text-gray-400">ID:</div>
                  <div className="col-span-2 break-all">{selectedOrden._id}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pb-2 border-b border-gray-700">
                  <div className="font-medium text-gray-400">Usuario:</div>
                  <div className="col-span-2">{selectedOrden.user?.email || selectedOrden.user?.nombre || "-"}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pb-2 border-b border-gray-700">
                  <div className="font-medium text-gray-400">Estado:</div>
                  <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrden.status)}`}>
                      {selectedOrden.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pb-2 border-b border-gray-700">
                  <div className="font-medium text-gray-400">Total:</div>
                  <div className="col-span-2">${selectedOrden.costo_total}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pb-2 border-b border-gray-700">
                  <div className="font-medium text-gray-400">Fecha:</div>
                  <div className="col-span-2">{new Date(selectedOrden.orden_fecha || selectedOrden.createdAt).toLocaleString()}</div>
                </div>
                
                {/* Agrega aquí más detalles según tu modelo, como productos, dirección, etc. */}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setSelectedOrden(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
