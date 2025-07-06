"use client";
import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";

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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <AdminNav />
      <h1 className="text-3xl font-bold mb-6 gradient-text">Gestión de Órdenes</h1>
      {loading && <p className="text-gray-700">Cargando órdenes...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <div className="mb-4 flex justify-end">
            <input
              type="text"
              placeholder="Buscar por usuario, email o ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border px-3 py-2 rounded w-full max-w-xs"
            />
          </div>
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gradient-to-r from-purple-400 to-violet-500 text-white">
              <tr>
                <th className="border border-gray-200 px-3 py-2 text-left">ID</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Usuario</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Estado</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Total</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Fecha</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredOrdenes.map((orden, idx) => {
                let usuario = "-";
                if (orden.user) {
                  usuario = orden.user.email || orden.user.nombre || orden.user._id || "-";
                }
                return (
                  <tr key={orden._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="border border-gray-200 px-3 py-2 text-xs break-all">{orden._id}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">{usuario}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${orden.status === 'completada' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{orden.status}</span>
                    </td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">${orden.costo_total}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">{new Date(orden.orden_fecha || orden.createdAt).toLocaleString()}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">
                      <button
                        className="btn-primary text-white px-2 py-1 rounded text-xs mr-2"
                        onClick={() => setSelectedOrden(orden)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {selectedOrden && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[320px] max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setSelectedOrden(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">Detalle de Orden</h2>
            <div className="mb-2"><b>ID:</b> {selectedOrden._id}</div>
            <div className="mb-2"><b>Usuario:</b> {selectedOrden.user?.email || selectedOrden.user?.nombre || "-"}</div>
            <div className="mb-2"><b>Estado:</b> {selectedOrden.status}</div>
            <div className="mb-2"><b>Total:</b> ${selectedOrden.costo_total}</div>
            <div className="mb-2"><b>Fecha:</b> {new Date(selectedOrden.orden_fecha || selectedOrden.createdAt).toLocaleString()}</div>
            {/* Agrega aquí más detalles según tu modelo, como productos, dirección, etc. */}
          </div>
        </div>
      )}
    </div>
  );
}
