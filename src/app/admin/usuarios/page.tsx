"use client";
import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";
import { User } from "./types";
import "../admin.css"; // Importamos los estilos de administración

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    setActionLoading(id);
    setActionError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleToggleActive(id: string) {
    setActionLoading(id);
    setActionError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}/toggle-active`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error("Error al cambiar estado");
      await fetchUsers();
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleChangeRole(id: string, newRole: string) {
    setActionLoading(id);
    setActionError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error("Error al cambiar rol");
      await fetchUsers();
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user._id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminNav />
        
        <div className="mb-8 mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Gestión de Usuarios
            </span>
          </h1>
          <p className="text-gray-400">Administra los usuarios de tu plataforma</p>
        </div>

        {loading && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg p-4 text-gray-300">
            Cargando usuarios...
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 backdrop-blur rounded-lg p-4 text-red-200 mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg ring-1 ring-purple-500/50 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Lista de Usuarios</h2>
            <input
              type="text"
              placeholder="Buscar por nombre, email o ID..."
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
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Rol</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Activo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.map((user, idx) => (
                  <tr key={user._id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 text-xs break-all text-gray-300">{user._id}</td>
                    <td className="px-4 py-3 text-xs text-gray-300">{user.nombre || '-'}</td>
                    <td className="px-4 py-3 text-xs text-gray-300">{user.email}</td>
                    <td className="px-4 py-3 text-xs">
                      <select
                        className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        value={user.role || (user as any).rol}
                        onChange={e => {
                          if (confirm(`¿Seguro que deseas cambiar el rol de este usuario a '${e.target.value}'?`)) {
                            handleChangeRole(user._id, e.target.value);
                          }
                        }}
                        disabled={actionLoading === user._id}
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.activo === false ? 'bg-gray-800 text-gray-400' : 'bg-green-900/50 text-green-300'}`}>
                        {user.activo === false ? 'No' : 'Sí'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs space-x-2">
                      <button 
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${user.activo === false ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-amber-600 text-white hover:bg-amber-700'}`} 
                        onClick={() => handleToggleActive(user._id)} 
                        disabled={actionLoading === user._id}
                      >
                        {actionLoading === user._id ? '...' : user.activo === false ? 'Activar' : 'Desactivar'}
                      </button>
                      <button 
                        className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-red-700" 
                        onClick={() => handleDelete(user._id)} 
                        disabled={actionLoading === user._id}
                      >
                        {actionLoading === user._id ? '...' : 'Eliminar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {actionError && (
          <div className="bg-red-900/50 border border-red-700 backdrop-blur rounded-lg p-4 text-red-200 mt-4">
            {actionError}
          </div>
        )}
        
        {filteredUsers.length === 0 && !loading && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg p-6 text-center text-gray-400">
            No se encontraron usuarios que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
