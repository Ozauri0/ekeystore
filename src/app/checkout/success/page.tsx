import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">¡Pago realizado con éxito!</h1>
      <p className="text-lg mb-8">Gracias por tu compra. Recibirás un correo con los detalles de tu pedido en breve.</p>
      <Link href="/" className="btn-primary px-6 py-3 rounded-xl font-semibold text-white">Volver a la tienda</Link>
    </div>
  );
}
