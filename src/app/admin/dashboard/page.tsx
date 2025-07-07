"use client";
import AdminNav from "../AdminNav";

export default function DashboardPage() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminNav />
        
        <div className="mb-8 mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Panel de Administración
            </span>
          </h1>
          <p className="text-gray-400">Gestiona tu tienda desde un solo lugar</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tarjeta de estadísticas */}
          {[
            { title: "Productos", value: "126", icon: "📦", gradient: "from-blue-600 to-purple-600" },
            { title: "Ventas", value: "32", icon: "💰", gradient: "from-orange-500 to-red-600" },
            { title: "Usuarios", value: "254", icon: "👥", gradient: "from-green-600 to-emerald-600" },
            { title: "Ingresos", value: "$3,540", icon: "💵", gradient: "from-red-600 to-pink-600" }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-all duration-300 backdrop-blur rounded-lg ring-1 ring-purple-500/50 card-hover">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white text-lg`}>
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">{stat.title}</h3>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Accesos rápidos */}
        <div className="mt-8 bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg ring-1 ring-purple-500/50 p-6">
          <h2 className="text-xl font-bold mb-4 text-white">Accesos Rápidos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Añadir producto", gradient: "category-gradient-1" },
              { name: "Ver pedidos", gradient: "category-gradient-2" },
              { name: "Configuración", gradient: "category-gradient-3" },
              { name: "Gestionar usuarios", gradient: "category-gradient-4" }
            ].map((action, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-700 hover:bg-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group backdrop-blur rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-white">{action.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Actividad reciente */}
        <div className="mt-8 bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg ring-1 ring-purple-500/50 p-6">
          <h2 className="text-xl font-bold mb-4 text-white">Actividad Reciente</h2>
          <div className="space-y-4">
            {[
              { action: "Nuevo pedido recibido", time: "Hace 5 minutos" },
              { action: "Producto actualizado", time: "Hace 2 horas" },
              { action: "Nueva reseña", time: "Hace 1 día" }
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-3">
                <p className="text-white">{activity.action}</p>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
