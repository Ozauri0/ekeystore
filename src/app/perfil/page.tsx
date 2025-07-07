"use client";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface User {
  _id: string;
  nombre?: string;
  email: string;
  rol?: string;
}

export default function PerfilPage() {
  const { userId } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editPassword2, setEditPassword2] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiBaseUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("No se pudo obtener el usuario");
      const data = await res.json();
      setUser(data);
      setEditNombre(data.nombre || "");
      setEditEmail(data.email || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    if (editPassword && editPassword !== editPassword2) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
      const body: any = { nombre: editNombre, email: editEmail };
      if (editPassword) body.password = editPassword;
      const res = await fetch(`${apiBaseUrl}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("No se pudo actualizar el usuario");
      setSuccess("Datos actualizados correctamente");
      setEditPassword("");
      setEditPassword2("");
      fetchUser();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          {loading && <p className="text-gray-400">Cargando datos...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="text-green-400">{success}</p>}
          {user && (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Nombre</label>
                <input
                  type="text"
                  value={editNombre}
                  onChange={e => setEditNombre(e.target.value)}
                  className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Nueva contraseña</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={e => setEditPassword(e.target.value)}
                  className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg w-full"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Repetir nueva contraseña</label>
                <input
                  type="password"
                  value={editPassword2}
                  onChange={e => setEditPassword2(e.target.value)}
                  className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg w-full"
                  autoComplete="new-password"
                />
              </div>
              <button type="submit" className="btn-primary px-6 py-2 rounded-lg">Guardar cambios</button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
