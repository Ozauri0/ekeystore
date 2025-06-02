# EKeyStore API

API backend para la aplicación EKeyStore construida con Node.js y Express (JavaScript puro).

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js (v18 o superior)
- npm o yarn

### Instalación

1. Instala las dependencias:
```bash
npm install
```

### Scripts Disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo con hot reload
- `npm start` - Ejecuta el servidor

### Estructura del Proyecto

```
API/
├── server.js          # Archivo principal del servidor
├── package.json       # Dependencias y scripts
├── .gitignore         # Archivos ignorados por Git
└── README.md          # Documentación
```

### Endpoints

- `GET /` - Información básica de la API
- `GET /api/health` - Estado de salud del servidor

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto API:

```env
NODE_ENV=development
PORT=3001
```

### Desarrollo

Para ejecutar en modo desarrollo:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

### Producción

Para ejecutar en producción:
```bash
npm start
```

## 📝 Licencia

ISC
