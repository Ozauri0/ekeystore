import AdminNav from "./AdminNav";

export default function AdminPage() {
  return (
    <div>
      <AdminNav />
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <p>Selecciona una sección del panel usando la navegación superior.</p>
    </div>
  );
}
