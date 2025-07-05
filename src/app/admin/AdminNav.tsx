import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className="flex gap-4 mb-8 border-b pb-2">
      <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
      <Link href="/admin/usuarios" className="hover:underline">Usuarios</Link>
      <Link href="/admin/productos" className="hover:underline">Productos</Link>
      <Link href="/admin/ordenes" className="hover:underline">Órdenes</Link>
      <Link href="/admin/licencias" className="hover:underline">Licencias</Link>
    </nav>
  );
}
