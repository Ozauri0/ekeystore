"use client";
import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";

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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <AdminNav />
      <h1 className="text-3xl font-bold mb-6 gradient-text">Gestión de Licencias</h1>
      {loading && <p className="text-gray-700 dark:text-gray-200">Cargando licencias...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gradient-to-r from-purple-400 to-violet-500 text-white">
              <tr>
                <th className="border border-gray-200 px-3 py-2 text-left">ID</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Key</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Producto</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Usuario</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Estado</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {licencias.map((lic, idx) => {
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
                  <tr key={lic._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="border border-gray-200 px-3 py-2 text-xs break-all">{lic._id}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">{lic.key}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">{producto}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">{usuario}</td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${lic.estado === 'activa' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{lic.estado}</span>
                    </td>
                    <td className="border border-gray-200 px-3 py-2 text-xs">{new Date(lic.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
