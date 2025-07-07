"use client";
import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";
import "../admin.css"; // Importamos los estilos de administración

type Product = {
  _id: string;
  nombre: string;
  categoria: string;
  precio: number;
  precioOriginal: number;
  descripcion: string;
  descripcionCorta?: string;
  imagen?: string;
  descuento?: number;
  stock?: number;
  activo: boolean;
  destacado?: boolean;
  etiquetas?: string[];
  valoracion?: number;
  numeroReseñas?: number;
  tipoEntrega?: string;
  sistemaOperativo?: string[];
  requisitos?: string;
  garantia?: string;
  idiomas?: string[];
  version?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Estado para el formulario de crear/editar
  const [form, setForm] = useState<Partial<Product> & { imageFile?: File | null }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  // Función para obtener productos desde la API
  const fetchProductos = async () => {
    try {
      setLoading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      setProductos(data.data || []);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setProductos([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  async function handleDelete(id: string) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
    setActionLoading(id);
    setActionError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      setProductos((prev) => prev.filter((p) => p._id !== id));
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}/toggle-active`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error("Error al cambiar estado");
      await fetchProductos();
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  }

  // Manejo de cambios en el formulario
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, imageFile: file }));
  }

  function openCreateForm() {
    setForm({});
    setIsEditing(false);
    setShowForm(true);
  }

  function openEditForm(product: Product) {
    // Mapear los campos del backend al frontend
    setForm({
      _id: product._id,
      nombre: product.nombre,
      categoria: product.categoria ?? product.tipo ?? "",
      precio: product.precio,
      precioOriginal: product.precioOriginal ?? product.precio,
      descripcion: product.descripcion,
      descripcionCorta: product.descripcionCorta ?? "",
      imagen: product.imagen,
      descuento: product.descuento ?? 0,
      stock: product.stock ?? 1000,
      activo: product.activo ?? true,
      destacado: product.destacado ?? false,
      etiquetas: product.etiquetas ?? [],
      valoracion: product.valoracion ?? 5,
      numeroReseñas: product.numeroReseñas ?? 0,
      tipoEntrega: product.tipoEntrega ?? "instantanea",
      sistemaOperativo: product.sistemaOperativo ?? [],
      requisitos: product.requisitos ?? "",
      garantia: product.garantia ?? "De por vida",
      idiomas: product.idiomas ?? [],
      version: product.version ?? ""
    });
    setIsEditing(true);
    setShowForm(true);
  }

  function closeForm() {
    setForm({});
    setShowForm(false);
    setIsEditing(false);
  }

  // Crear o editar producto
  async function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    setActionLoading("form");
    setActionError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;
      let method = "POST";
      if (isEditing && form._id) {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${form._id}`;
        method = "PUT";
      }
      let body: BodyInit;
      let headers: Record<string, string> = {};
      // Enviar todos los campos requeridos por el modelo
      if (form.imageFile) {
        const fd = new FormData();
        fd.append("nombre", form.nombre || "");
        fd.append("categoria", form.categoria || "");
        fd.append("precio", String(form.precio || 0));
        fd.append("precioOriginal", String(form.precioOriginal || form.precio || 0));
        fd.append("descripcion", form.descripcion || "");
        fd.append("descripcionCorta", form.descripcionCorta || "");
        fd.append("descuento", String(form.descuento ?? 0));
        fd.append("stock", String(form.stock ?? 1000));
        fd.append("activo", String(form.activo ?? true));
        fd.append("destacado", String(form.destacado ?? false));
        fd.append("valoracion", String(form.valoracion ?? 5));
        fd.append("numeroReseñas", String(form.numeroReseñas ?? 0));
        fd.append("tipoEntrega", form.tipoEntrega || "instantanea");
        fd.append("requisitos", form.requisitos || "");
        fd.append("garantia", form.garantia || "De por vida");
        fd.append("version", form.version || "");
        if (form.etiquetas && Array.isArray(form.etiquetas)) fd.append("etiquetas", JSON.stringify(form.etiquetas));
        if (form.sistemaOperativo && Array.isArray(form.sistemaOperativo)) fd.append("sistemaOperativo", JSON.stringify(form.sistemaOperativo));
        fd.append("imagen", form.imageFile);
        body = fd;
      } else {
        body = JSON.stringify({
          nombre: form.nombre,
          categoria: form.categoria,
          precio: form.precio,
          precioOriginal: form.precioOriginal ?? form.precio,
          descripcion: form.descripcion,
          descripcionCorta: form.descripcionCorta,
          imagen: form.imagen,
          descuento: form.descuento,
          stock: form.stock,
          activo: form.activo,
          destacado: form.destacado,
          etiquetas: form.etiquetas,
          valoracion: form.valoracion,
          numeroReseñas: form.numeroReseñas,
          tipoEntrega: form.tipoEntrega,
          sistemaOperativo: form.sistemaOperativo,
          requisitos: form.requisitos,
          garantia: form.garantia,
          idiomas: form.idiomas,
          version: form.version
        });
        headers["Content-Type"] = "application/json";
      }
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(url, { method, headers, body });
      if (!res.ok) throw new Error(isEditing ? "Error al editar producto" : "Error al crear producto");
      const data = await res.json();
      // Actualiza la lista
      await fetchProductos();
      closeForm();
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  }

  const filteredProductos = productos.filter(
    (prod) =>
      prod.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      prod.categoria?.toLowerCase().includes(search.toLowerCase()) ||
      prod._id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminNav />
        
        <div className="mb-8 mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Gestión de Productos
            </span>
          </h1>
          <p className="text-gray-400">Administra los productos de tu tienda</p>
        </div>

        {loading && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg p-4 text-gray-300">
            Cargando productos...
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 backdrop-blur rounded-lg p-4 text-red-200 mb-4">
            {error}
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={openCreateForm}
            className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-violet-700 transition-colors"
          >
            Crear producto
          </button>
          
          <input
            type="text"
            placeholder="Buscar por nombre, categoría o ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full max-w-xs"
          />
        </div>
        
        {showForm && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg ring-1 ring-purple-500/50 p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-white">
              {isEditing ? "Editar Producto" : "Crear Nuevo Producto"}
            </h2>
            <form onSubmit={handleSubmitForm}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-1">Nombre</label>
                  <input 
                    name="nombre" 
                    value={form.nombre || ""} 
                    onChange={handleFormChange} 
                    className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">Categoría</label>
                  <input 
                    name="categoria" 
                    value={form.categoria || ""} 
                    onChange={handleFormChange} 
                    className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">Precio</label>
                  <input 
                    name="precio" 
                    type="number" 
                    value={form.precio || ""} 
                    onChange={handleFormChange} 
                    className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">Stock</label>
                  <input 
                    name="stock" 
                    type="number" 
                    value={form.stock || ""} 
                    onChange={handleFormChange} 
                    className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full" 
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">Activo</label>
                  <select 
                    name="activo" 
                    value={form.activo ? "true" : "false"} 
                    onChange={handleFormChange} 
                    className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full"
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">Destacado</label>
                  <select 
                    name="destacado" 
                    value={form.destacado ? "true" : "false"} 
                    onChange={handleFormChange} 
                    className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full"
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Descripción</label>
                <textarea 
                  name="descripcion" 
                  value={form.descripcion || ""} 
                  onChange={handleFormChange} 
                  className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full h-24" 
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Imagen</label>
                <input 
                  name="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="bg-gray-900/70 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full" 
                />
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  type="submit" 
                  disabled={actionLoading === "form"} 
                  className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-violet-700 transition-colors"
                >
                  {actionLoading === "form" ? "Procesando..." : isEditing ? "Guardar cambios" : "Crear producto"}
                </button>
                <button 
                  type="button" 
                  onClick={closeForm} 
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
        
        {!loading && !error && filteredProductos.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg ring-1 ring-purple-500/50 p-6 mb-6 overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Categoría</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Precio</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Activo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Destacado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredProductos.map((prod, idx) => (
                  <tr key={prod._id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 text-xs break-all text-gray-300">{prod._id}</td>
                    <td className="px-4 py-3 text-xs text-gray-300">{prod.nombre}</td>
                    <td className="px-4 py-3 text-xs text-gray-300">{prod.categoria}</td>
                    <td className="px-4 py-3 text-xs text-gray-300">${prod.precio}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${prod.activo ? 'bg-green-900/50 text-green-300' : 'bg-gray-800 text-gray-400'}`}>
                        {prod.activo ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${prod.destacado ? 'bg-amber-900/50 text-amber-300' : 'bg-gray-800 text-gray-400'}`}>
                        {prod.destacado ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs space-x-2">
                      <button 
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-blue-700" 
                        onClick={() => openEditForm(prod)}
                      >
                        Editar
                      </button>
                      <button 
                        className="bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-amber-700" 
                        onClick={() => handleToggleActive(prod._id)} 
                        disabled={actionLoading === prod._id}
                      >
                        {actionLoading === prod._id ? '...' : prod.activo ? 'Desactivar' : 'Activar'}
                      </button>
                      <button 
                        className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-red-700" 
                        onClick={() => handleDelete(prod._id)} 
                        disabled={actionLoading === prod._id}
                      >
                        {actionLoading === prod._id ? '...' : 'Eliminar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {!loading && !error && filteredProductos.length === 0 && (
          <div className="bg-gray-800/50 border border-gray-700 backdrop-blur rounded-lg p-6 text-center text-gray-400">
            No se encontraron productos que coincidan con tu búsqueda.
          </div>
        )}
        
        {actionError && !showForm && (
          <div className="bg-red-900/50 border border-red-700 backdrop-blur rounded-lg p-4 text-red-200 mt-4">
            {actionError}
          </div>
        )}
      </div>
    </div>
  );
}