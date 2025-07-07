"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario es administrador
    async function checkAdmin() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          // Si no es admin, redirigir a la página principal
          router.push("/");
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error("Error verificando permisos de administrador:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }

    checkAdmin();
  }, [router]);

  // Si está cargando o no es admin, no mostrar el componente
  if (loading || !isAdmin) {
    return null;
  }

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
