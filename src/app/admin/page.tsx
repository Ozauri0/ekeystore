"use client";
import AdminNav from "./AdminNav";

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <AdminNav />
      <h1 className="text-3xl font-bold mb-6 gradient-text">Panel de Administración</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 text-lg">Selecciona una sección del panel usando la navegación superior.</p>
      </div>
    </div>
  );
}
