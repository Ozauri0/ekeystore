// scripts/seedProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');

const productos = [
  // Windows
  {
    nombre: "Windows 11 Pro",
    categoria: "Windows",
    precio: 29.99,
    precioOriginal: 199.99,
    descripcionCorta: "Sistema operativo completo con características avanzadas para profesionales",
    descripcion: "Windows 11 Pro incluye todas las características de Windows 11 Home, además de importantes funciones comerciales para cifrado, acceso remoto, creación de máquinas virtuales y más. Obtén un inicio rápido, un menú Inicio familiar y nuevas formas de ser productivo, además de múltiples capas de seguridad y características comerciales compatibles.",
    imagen: "Windows 11 Pro",
    descuento: 85,
    destacado: true,
    etiquetas: ["Más vendido", "Oferta"],
    valoracion: 4.8,
    numeroReseñas: 1250,
    sistemaOperativo: ["PC"],
    requisitos: "Procesador: 1 GHz o más rápido, RAM: 4 GB (64 bits), Almacenamiento: 64 GB",
    idiomas: ["Español", "Inglés", "Francés", "Alemán"],
    version: "22H2"
  },
  {
    nombre: "Windows 10 Pro",
    categoria: "Windows",
    precio: 24.99,
    precioOriginal: 139.99,
    descripcionCorta: "Versión profesional del sistema operativo más utilizado del mundo",
    descripcion: "Windows 10 Pro tiene todas las características de Windows 10 Home, además de características importantes para empresas como BitLocker, acceso remoto, capacidad de unirse a dominios y más.",
    imagen: "Windows 10 Pro",
    descuento: 82,
    destacado: false,
    etiquetas: ["Estable", "Empresarial"],
    valoracion: 4.7,
    numeroReseñas: 2100,
    sistemaOperativo: ["PC"],
    requisitos: "Procesador: 1 GHz o más rápido, RAM: 2 GB (64 bits), Almacenamiento: 32 GB",
    idiomas: ["Español", "Inglés", "Francés", "Alemán"],
    version: "22H2"
  },
  {
    nombre: "Windows 11 Home",
    categoria: "Windows",
    precio: 19.99,
    precioOriginal: 139.99,
    descripcionCorta: "La última versión de Windows para uso doméstico",
    descripcion: "Windows 11 Home es la versión más reciente de Windows con un diseño renovado, mejor rendimiento y nuevas características para productividad y entretenimiento.",
    imagen: "Windows 11 Home",
    descuento: 86,
    destacado: false,
    etiquetas: ["Nuevo", "Hogar"],
    valoracion: 4.6,
    numeroReseñas: 890,
    sistemaOperativo: ["PC"],
    requisitos: "Procesador: 1 GHz o más rápido, RAM: 4 GB (64 bits), Almacenamiento: 64 GB",
    idiomas: ["Español", "Inglés"],
    version: "22H2"
  },

  // Microsoft Office
  {
    nombre: "Microsoft Office 2021 Professional Plus",
    categoria: "Office",
    precio: 39.99,
    precioOriginal: 439.99,
    descripcionCorta: "Suite completa de productividad con Word, Excel, PowerPoint y más",
    descripcion: "Office 2021 Professional Plus incluye las versiones más recientes de Word, Excel, PowerPoint, Outlook, OneNote, Access, Publisher y Teams. Diseñado para uso profesional con características avanzadas.",
    imagen: "Office 2021",
    descuento: 91,
    destacado: true,
    etiquetas: ["Profesional", "Oferta"],
    valoracion: 4.9,
    numeroReseñas: 890,
    sistemaOperativo: ["Windows", "Mac"],
    requisitos: "Windows 10/11 o macOS 10.14 o posterior",
    idiomas: ["Español", "Inglés", "Francés"],
    version: "2021"
  },
  {
    nombre: "Microsoft Office 2019 Professional Plus",
    categoria: "Office",
    precio: 34.99,
    precioOriginal: 399.99,
    descripcionCorta: "Versión estable y confiable de la suite Office",
    descripcion: "Office 2019 Professional Plus incluye Word, Excel, PowerPoint, Outlook, OneNote, Access y Publisher. Versión permanente sin suscripción mensual.",
    imagen: "Office 2019",
    descuento: 91,
    destacado: false,
    etiquetas: ["Estable", "Sin suscripción"],
    valoracion: 4.8,
    numeroReseñas: 1560,
    sistemaOperativo: ["Windows"],
    requisitos: "Windows 10 o posterior",
    idiomas: ["Español", "Inglés"],
    version: "2019"
  },

  // Steam
  {
    nombre: "Steam Wallet Gift Card $50",
    categoria: "Steam",
    precio: 47.99,
    precioOriginal: 50.00,
    descripcionCorta: "Tarjeta de regalo digital para Steam",
    descripcion: "Añade $50 USD a tu cartera de Steam para comprar juegos, DLC, software y más. Se entrega como código digital inmediatamente después de la compra.",
    imagen: "Steam $50",
    descuento: 4,
    destacado: true,
    etiquetas: ["Popular", "Gaming"],
    valoracion: 5.0,
    numeroReseñas: 2100,
    tipoEntrega: "instantanea",
    idiomas: ["Global"]
  },
  {
    nombre: "Steam Wallet Gift Card $25",
    categoria: "Steam",
    precio: 23.99,
    precioOriginal: 25.00,
    descripcionCorta: "Tarjeta de regalo digital para Steam",
    descripcion: "Añade $25 USD a tu cartera de Steam. Perfecto para compras pequeñas o como regalo.",
    imagen: "Steam $25",
    descuento: 4,
    destacado: false,
    etiquetas: ["Gaming", "Regalo"],
    valoracion: 4.9,
    numeroReseñas: 1800,
    tipoEntrega: "instantanea",
    idiomas: ["Global"]
  },
  {
    nombre: "Steam Wallet Gift Card $100",
    categoria: "Steam",
    precio: 95.99,
    precioOriginal: 100.00,
    descripcionCorta: "Tarjeta de regalo digital para Steam",
    descripcion: "Añade $100 USD a tu cartera de Steam. Ideal para compras grandes o múltiples juegos.",
    imagen: "Steam $100",
    descuento: 4,
    destacado: false,
    etiquetas: ["Gaming", "Valor"],
    valoracion: 5.0,
    numeroReseñas: 950,
    tipoEntrega: "instantanea",
    idiomas: ["Global"]
  },

  // Antivirus
  {
    nombre: "Kaspersky Internet Security 2024",
    categoria: "Antivirus",
    precio: 29.99,
    precioOriginal: 79.99,
    descripcionCorta: "Protección avanzada contra malware y amenazas online",
    descripcion: "Kaspersky Internet Security 2024 ofrece protección completa contra virus, malware, phishing y otras amenazas online. Incluye firewall, control parental y protección de privacidad.",
    imagen: "Kaspersky 2024",
    descuento: 63,
    destacado: false,
    etiquetas: ["Seguridad", "Protección"],
    valoracion: 4.7,
    numeroReseñas: 650,
    sistemaOperativo: ["Windows", "Mac", "Android"],
    requisitos: "Windows 7 o posterior, 2 GB RAM",
    idiomas: ["Español", "Inglés"],
    version: "2024"
  },
  {
    nombre: "Norton 360 Deluxe",
    categoria: "Antivirus",
    precio: 34.99,
    precioOriginal: 99.99,
    descripcionCorta: "Protección integral con VPN y backup en la nube",
    descripcion: "Norton 360 Deluxe incluye antivirus, firewall, VPN segura, 50GB de backup en la nube, control parental y monitoreo de identidad.",
    imagen: "Norton 360",
    descuento: 65,
    destacado: true,
    etiquetas: ["Completo", "VPN incluida"],
    valoracion: 4.6,
    numeroReseñas: 890,
    sistemaOperativo: ["Windows", "Mac", "Android", "iOS"],
    requisitos: "Windows 8 o posterior, 2 GB RAM",
    idiomas: ["Español", "Inglés"],
    version: "2024"
  },

  // Adobe
  {
    nombre: "Adobe Photoshop 2024",
    categoria: "Adobe",
    precio: 89.99,
    precioOriginal: 252.00,
    descripcionCorta: "El software de edición de imágenes más popular del mundo",
    descripcion: "Adobe Photoshop 2024 es el estándar de la industria para edición de imágenes, diseño gráfico y arte digital. Incluye las últimas herramientas de IA y características avanzadas.",
    imagen: "Photoshop 2024",
    descuento: 64,
    destacado: true,
    etiquetas: ["Profesional", "IA"],
    valoracion: 4.8,
    numeroReseñas: 1200,
    sistemaOperativo: ["Windows", "Mac"],
    requisitos: "Windows 10 v1903 o posterior, 8 GB RAM",
    idiomas: ["Español", "Inglés"],
    version: "2024"
  },
  {
    nombre: "Adobe Illustrator 2024",
    categoria: "Adobe",
    precio: 79.99,
    precioOriginal: 252.00,
    descripcionCorta: "Software de ilustración vectorial profesional",
    descripcion: "Adobe Illustrator 2024 es la herramienta estándar para crear logotipos, iconos, dibujos, tipografías y ilustraciones complejas para cualquier medio.",
    imagen: "Illustrator 2024",
    descuento: 68,
    destacado: false,
    etiquetas: ["Vectorial", "Diseño"],
    valoracion: 4.7,
    numeroReseñas: 780,
    sistemaOperativo: ["Windows", "Mac"],
    requisitos: "Windows 10 v1903 o posterior, 8 GB RAM",
    idiomas: ["Español", "Inglés"],
    version: "2024"
  },

  // VPN
  {
    nombre: "NordVPN Premium 2 Años",
    categoria: "VPN",
    precio: 89.99,
    precioOriginal: 287.76,
    descripcionCorta: "VPN premium con servidores en más de 60 países",
    descripcion: "NordVPN ofrece conexión VPN rápida y segura con más de 5400 servidores mundiales, bloqueo de anuncios, protección contra malware y hasta 6 dispositivos simultáneos.",
    imagen: "NordVPN",
    descuento: 69,
    destacado: true,
    etiquetas: ["2 años", "Premium"],
    valoracion: 4.9,
    numeroReseñas: 2200,
    sistemaOperativo: ["Windows", "Mac", "Android", "iOS", "Linux"],
    requisitos: "Conexión a internet",
    idiomas: ["Español", "Inglés"],
    version: "Premium"
  },
  {
    nombre: "ExpressVPN 1 Año",
    categoria: "VPN",
    precio: 99.99,
    precioOriginal: 143.88,
    descripcionCorta: "VPN ultra-rápida con servidores en 94 países",
    descripcion: "ExpressVPN es conocida por su velocidad y confiabilidad, con servidores en 94 países, cifrado de grado militar y política de no logs verificada.",
    imagen: "ExpressVPN",
    descuento: 31,
    destacado: false,
    etiquetas: ["Rápida", "Confiable"],
    valoracion: 4.8,
    numeroReseñas: 1650,
    sistemaOperativo: ["Windows", "Mac", "Android", "iOS", "Linux"],
    requisitos: "Conexión a internet",
    idiomas: ["Español", "Inglés"],
    version: "Premium"
  }
];

async function seedProducts() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await connectDB();
    
    console.log('🗑️ Eliminando productos existentes...');
    await Product.deleteMany({});
    
    console.log('📦 Agregando productos de prueba...');
    const productosCreados = await Product.insertMany(productos);
    
    console.log(`✅ ${productosCreados.length} productos agregados exitosamente!`);
    console.log('📊 Resumen de productos por categoría:');
    
    const resumen = productos.reduce((acc, producto) => {
      acc[producto.categoria] = (acc[producto.categoria] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(resumen).forEach(([categoria, cantidad]) => {
      console.log(`   - ${categoria}: ${cantidad} productos`);
    });
    
    console.log('\n🎉 Base de datos poblada exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
}

// Ejecutar si el archivo se ejecuta directamente
if (require.main === module) {
  seedProducts();
}

module.exports = seedProducts;
