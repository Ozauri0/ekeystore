"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();
  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/usuarios", label: "Usuarios" },
    { href: "/admin/productos", label: "Productos" },
    { href: "/admin/ordenes", label: "Órdenes" },
    { href: "/admin/licencias", label: "Licencias" },
  ];
  return (
    <nav className="flex gap-4 mb-8 border-b pb-2 bg-white rounded-t-lg px-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-1 rounded font-semibold transition-colors duration-200 ${pathname === link.href ? "bg-gradient-to-r from-purple-400 to-violet-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
