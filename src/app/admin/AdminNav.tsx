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
    <nav className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl mb-6 p-1">
      <ul className="flex flex-wrap gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`inline-block px-4 py-2 rounded-lg transition-colors ${
                pathname === link.href
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                  : "text-gray-200 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
