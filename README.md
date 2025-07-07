# 🔑 EKeyStore

EKeyStore es una plataforma completa para la venta de licencias de software, desarrollada con Next.js (Frontend) y Express.js (Backend API).

![EKeyStore Logo](public/file.svg)

## 📋 Descripción

EKeyStore permite a los usuarios buscar, comprar y gestionar licencias de software. Incluye un panel de administración completo para gestionar productos, usuarios, licencias y órdenes.

### Características principales

- 🛒 Carrito de compras
- 🔐 Sistema de autenticación y autorización
- 👤 Perfiles de usuario
- 📊 Panel de administración
- 💳 Procesamiento de pagos
- 📧 Notificaciones por email
- 🌐 API RESTful
## 🚀 Configuración del proyecto

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- MongoDB (local o en la nube)

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto frontend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Instalación

1. **Frontend (Next.js)**

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

2. **Backend (API Express)**

```bash
# Navegar al directorio de la API
cd API

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🏗️ Estructura del proyecto

```
/
├── API/                  # Backend API (Express.js)
│   ├── config/           # Configuración (DB, email, etc.)
│   ├── controllers/      # Controladores
│   ├── middlewares/      # Middlewares
│   ├── models/           # Modelos de datos
│   ├── routes/           # Rutas API
│   ├── scripts/          # Scripts útiles
│   ├── services/         # Servicios
│   └── server.js         # Punto de entrada
│
├── public/               # Archivos estáticos
│
└── src/                  # Frontend (Next.js)
    ├── app/              # Páginas y rutas
    │   ├── admin/        # Panel de administración
    │   ├── carrito/      # Carrito y checkout
    │   └── ...
    ├── components/       # Componentes reutilizables
    ├── contexts/         # Contextos de React
    └── services/         # Servicios del cliente
```

## 💻 Comandos disponibles

### Frontend

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar en modo producción
npm start

# Ejecutar linter
npm run lint
```

### Backend (API)

```bash
# Desarrollo con hot-reload
npm run dev

# Iniciar en modo producción
npm start

# Generar cuenta de administrador
npm run generate:admin

# Poblar la base de datos con productos de prueba
npm run seed:products
```

## 🌐 Despliegue

### Frontend (Next.js)

El frontend puede desplegarse en Vercel o cualquier otro proveedor que soporte Next.js.

### Backend (API)

La API puede desplegarse en servicios como:
- Heroku
- Railway
- DigitalOcean
- AWS

Asegúrate de configurar las variables de entorno adecuadas en tu entorno de producción.

## ⚙️ Configuración de CORS

Para evitar problemas de CORS al comunicar el frontend con la API, asegúrate de:

1. Configurar correctamente el dominio del frontend en la API
2. Utilizar variables de entorno para las URLs de la API
3. Configurar proxies si es necesario

