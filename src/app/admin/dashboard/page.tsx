import AdminNav from "../AdminNav";

export default function DashboardPage() {
  return (
    <div>
      <AdminNav />
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <p>Bienvenido al dashboard del administrador. Aquí puedes ver estadísticas y accesos rápidos.</p>
    </div>
  );
}
