import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Verificar si la ruta comienza con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Obtener el token de las cookies
    const token = request.cookies.get('token')?.value;
    
    // Si no hay token, redirigir al login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      // Decodificar el token para verificar el rol
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Verificar si el usuario es administrador
      if (payload.role !== 'admin' && payload.rol !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      // El usuario es un administrador según el token, permitir el acceso
      return NextResponse.next();
    } catch (error) {
      console.error('Error procesando el token:', error);
      // Error en la verificación, redirigir al login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Para otras rutas, continuar normalmente
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
  ],
};
