"use client";
import AdminNav from "./AdminNav";

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <AdminNav />
      <h1 className="text-4xl font-extrabold mb-8 gradient-text text-center">Panel de Administración</h1>
      <div className="bg-white rounded-lg shadow-xl p-8 border border-purple-100 transition-all duration-300 hover:shadow-2xl">
        <p className="text-gray-700 text-lg leading-relaxed">
          Bienvenido al panel de administración. Selecciona una sección usando la navegación superior.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg shadow-md border border-purple-100 card-hover">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Usuarios</h3>
            <p className="text-gray-600">Gestiona las cuentas de usuarios registrados en la plataforma.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg shadow-md border border-purple-100 card-hover">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Productos</h3>
            <p className="text-gray-600">Administra el catálogo de productos disponibles para la venta.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg shadow-md border border-purple-100 card-hover">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Licencias</h3>
            <p className="text-gray-600">Visualiza y gestiona las licencias generadas para los clientes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

