import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";
import { User } from "./types";

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users", { credentials: "include" });
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
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
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
      const res = await fetch(`/api/users/${id}/toggle-active`, {
        method: "PATCH",
        credentials: "include",
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
      const res = await fetch(`/api/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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

  return (
    <div>
      <AdminNav />
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {actionError && <p className="text-red-500">{actionError}</p>}
      {!loading && !error && (
        <table className="min-w-full border mt-4">
          <thead>
            <tr>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Rol</th>
              <th className="border px-2 py-1">Activo</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-2 py-1">{user.nombre}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user._id, e.target.value)}
                    disabled={actionLoading === user._id}
                    className="bg-transparent border rounded px-1"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => handleToggleActive(user._id)}
                    disabled={actionLoading === user._id}
                    className={`px-2 py-1 rounded ${
                      user.activo ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {user.activo ? "Sí" : "No"}
                  </button>
                </td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => handleDelete(user._id)}
                    disabled={actionLoading === user._id}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
