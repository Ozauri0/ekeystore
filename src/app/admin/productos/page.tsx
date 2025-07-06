"use client";
import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";

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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <AdminNav />
      <h1 className="text-3xl font-bold mb-6 gradient-text">Gestión de Productos</h1>
      {loading && <p className="text-gray-700">Cargando productos...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <div className="mb-4">
        <button
          onClick={openCreateForm}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear producto
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmitForm} className="mb-6 p-4 border rounded bg-gray-50">
          <div className="mb-2">
            <label className="block font-semibold">Nombre</label>
            <input name="nombre" value={form.nombre || ""} onChange={handleFormChange} className="border px-2 py-1 w-full" required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Categoría</label>
            <input name="categoria" value={form.categoria || ""} onChange={handleFormChange} className="border px-2 py-1 w-full" required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Precio</label>
            <input name="precio" type="number" value={form.precio || ""} onChange={handleFormChange} className="border px-2 py-1 w-full" required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Descripción</label>
            <textarea name="descripcion" value={form.descripcion || ""} onChange={handleFormChange} className="border px-2 py-1 w-full" required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Stock</label>
            <input name="stock" type="number" value={form.stock || ""} onChange={handleFormChange} className="border px-2 py-1 w-full" />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Activo</label>
            <select name="activo" value={form.activo ? "true" : "false"} onChange={handleFormChange} className="border px-2 py-1 w-full">
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Imagen</label>
            <input name="image" type="file" accept="image/*" onChange={handleImageChange} className="border px-2 py-1 w-full" />
          </div>
          <div className="flex gap-2 mt-2">
            <button type="submit" disabled={actionLoading === "form"} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
              {isEditing ? "Guardar cambios" : "Crear"}
            </button>
            <button type="button" onClick={closeForm} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
          </div>
          {actionError && <p className="text-red-500 mt-2">{actionError}</p>}
        </form>
      )}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gradient-to-r from-purple-400 to-violet-500 text-white">
              <tr>
                <th className="border border-gray-200 px-3 py-2 text-left">ID</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Nombre</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Categoría</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Precio</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Activo</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Destacado</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {productos.map((prod, idx) => (
                <tr key={prod._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border border-gray-200 px-3 py-2 text-xs break-all">{prod._id}</td>
                  <td className="border border-gray-200 px-3 py-2 text-xs">{prod.nombre}</td>
                  <td className="border border-gray-200 px-3 py-2 text-xs">{prod.categoria}</td>
                  <td className="border border-gray-200 px-3 py-2 text-xs">${prod.precio}</td>
                  <td className="border border-gray-200 px-3 py-2 text-xs">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${prod.activo ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{prod.activo ? 'Sí' : 'No'}</span>
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-xs">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${prod.destacado ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-700'}`}>{prod.destacado ? 'Sí' : 'No'}</span>
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-xs space-x-2">
                    <button className="btn-primary text-white px-2 py-1 rounded text-xs" onClick={() => openEditForm(prod)}>
                      Editar
                    </button>
                    <button className="btn-secondary text-white px-2 py-1 rounded text-xs" onClick={() => handleDelete(prod._id)} disabled={actionLoading === prod._id}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {actionError && <p className="text-red-500 mt-2">{actionError}</p>}
    </div>
  );
}