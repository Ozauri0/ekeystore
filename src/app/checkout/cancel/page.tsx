import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Pago cancelado</h1>
      <p className="text-lg mb-8">No se ha realizado ningún cargo. Puedes intentarlo nuevamente cuando quieras.</p>
      <Link href="/carrito" className="btn-primary px-6 py-3 rounded-xl font-semibold text-white">Volver al carrito</Link>
    </div>
  );
}
