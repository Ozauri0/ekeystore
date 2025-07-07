"use client";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";

interface Pedido {
  _id: string;
  createdAt: string;
  costo_total: number;
  status: string;
  items: any[];
}

export default function MisPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    fetchPedidos(token);
  }, []);

  const fetchPedidos = async (token: string) => {
    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiBaseUrl}/orders/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("No se pudieron obtener los pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Mis Pedidos</h1>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          {loading && <p className="text-gray-400">Cargando pedidos...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && !error && pedidos.length === 0 && (
            <p className="text-gray-400">No tienes pedidos registrados.</p>
          )}
          {!loading && !error && pedidos.length > 0 && (
            <table className="min-w-full text-xs">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left">ID</th>
                  <th className="px-2 py-2 text-left">Fecha</th>
                  <th className="px-2 py-2 text-left">Total</th>
                  <th className="px-2 py-2 text-left">Estado</th>
                  <th className="px-2 py-2 text-left">Productos</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido._id} className="border-b border-gray-700">
                    <td className="px-2 py-2 break-all">{pedido._id}</td>
                    <td className="px-2 py-2">{new Date(pedido.createdAt).toLocaleString()}</td>
                    <td className="px-2 py-2">${pedido.costo_total}</td>
                    <td className="px-2 py-2">{pedido.status}</td>
                    <td className="px-2 py-2">
                      {pedido.items && pedido.items.length > 0 ? (
                        <ul className="list-disc ml-4">
                          {pedido.items.map((item, idx) => (
                            <li key={idx}>{item.nombre || item.producto || JSON.stringify(item)}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
