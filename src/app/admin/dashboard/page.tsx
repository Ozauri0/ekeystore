"use client";
import AdminNav from "../AdminNav";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <AdminNav />
      <h1 className="text-3xl font-bold mb-6 gradient-text">Panel de Administración</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 text-lg">Bienvenido al dashboard del administrador. Aquí puedes ver estadísticas y accesos rápidos.</p>
      </div>
    </div>
  );
}
