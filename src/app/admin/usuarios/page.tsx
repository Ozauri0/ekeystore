"use client";
import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";
import { User } from "./types";

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
    <div className="max-w-6xl mx-auto p-4">
      <AdminNav />
      <h1 className="text-3xl font-bold mb-6 gradient-text">Gestión de Usuarios</h1>
      {loading && <p className="text-gray-700">Cargando usuarios...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Buscar por nombre, email o ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-xs"
        />
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gradient-to-r from-purple-400 to-violet-500 text-white">
            <tr>
              <th className="border border-gray-200 px-3 py-2 text-left">ID</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Nombre</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Email</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Rol</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Activo</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredUsers.map((user, idx) => (
              <tr key={user._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="border border-gray-200 px-3 py-2 text-xs break-all">{user._id}</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">{user.nombre || '-'}</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">{user.email}</td>
                <td className="border border-gray-200 px-3 py-2 text-xs">
                  <select
                    className="border rounded px-2 py-1 text-xs bg-white"
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
                <td className="border border-gray-200 px-3 py-2 text-xs">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.activo === false ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700'}`}>{user.activo === false ? 'No' : 'Sí'}</span>
                </td>
                <td className="border border-gray-200 px-3 py-2 text-xs space-x-2">
                  <button className="btn-primary text-white px-2 py-1 rounded text-xs" onClick={() => handleToggleActive(user._id)} disabled={actionLoading === user._id}>
                    {user.activo === false ? 'Activar' : 'Desactivar'}
                  </button>
                  <button className="btn-secondary text-white px-2 py-1 rounded text-xs" onClick={() => handleDelete(user._id)} disabled={actionLoading === user._id}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {actionError && <p className="text-red-500 mt-2">{actionError}</p>}
    </div>
  );
}
