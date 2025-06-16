// scripts/generateAdmin.js
require('dotenv').config();
const readline = require('readline');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/database');

// Configurar interfaz de entrada
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para hacer preguntas
const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

// Función para ocultar contraseña (input silencioso)
const hiddenQuestion = (query) => {
  return new Promise((resolve) => {
    process.stdout.write(query);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let password = '';
    
    const onData = (key) => {
      if (key === '\u0003') { // Ctrl+C
        process.exit();
      }
      
      if (key === '\r' || key === '\n') { // Enter
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        process.stdout.write('\n');
        resolve(password);
      } else if (key === '\u007f') { // Backspace
        if (password.length > 0) {
          password = password.slice(0, -1);
          process.stdout.write('\b \b');
        }
      } else {
        password += key;
        process.stdout.write('*');
      }
    };
    
    process.stdin.on('data', onData);
  });
};

// Función para validar email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

async function generateAdmin() {
  try {
    console.log('🔧 Generador de Administrador - EKeyStore API');
    console.log('================================================\n');

    // Conectar a la base de datos
    console.log('🔄 Conectando a la base de datos...');
    await connectDB();
    console.log('✅ Conectado a MongoDB\n');

    // Recopilar datos del administrador
    let nombre, apellido, email, password;

    // Nombre
    while (!nombre || nombre.trim().length < 2) {
      nombre = await question('👤 Nombre del administrador: ');
      if (!nombre || nombre.trim().length < 2) {
        console.log('❌ El nombre debe tener al menos 2 caracteres');
      }
    }

    // Apellido
    while (!apellido || apellido.trim().length < 2) {
      apellido = await question('👤 Apellido del administrador: ');
      if (!apellido || apellido.trim().length < 2) {
        console.log('❌ El apellido debe tener al menos 2 caracteres');
      }
    }

    // Email
    while (!email || !isValidEmail(email)) {
      email = await question('📧 Email del administrador: ');
      if (!email || !isValidEmail(email)) {
        console.log('❌ Por favor ingresa un email válido');
        continue;
      }

      // Verificar si el email ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('❌ Este email ya está registrado');
        email = null;
      }
    }

    // Contraseña
    while (!password || password.length < 6) {
      password = await hiddenQuestion('🔒 Contraseña (mínimo 6 caracteres): ');
      if (!password || password.length < 6) {
        console.log('❌ La contraseña debe tener al menos 6 caracteres');
      }
    }

    // Confirmar contraseña
    let confirmPassword;
    while (confirmPassword !== password) {
      confirmPassword = await hiddenQuestion('🔒 Confirmar contraseña: ');
      if (confirmPassword !== password) {
        console.log('❌ Las contraseñas no coinciden');
      }
    }

    console.log('\n🔄 Creando administrador...');

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario administrador
    const admin = await User.create({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      rol: 'admin'
    });

    console.log('\n✅ ¡Administrador creado exitosamente!');
    console.log('==========================================');
    console.log(`👤 Nombre: ${admin.nombre} ${admin.apellido}`);
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Rol: ${admin.rol}`);
    console.log(`🆔 ID: ${admin._id}`);
    console.log(`📅 Creado: ${admin.createdAt.toLocaleString()}`);
    console.log('==========================================\n');
    console.log('🎉 El administrador puede ahora iniciar sesión en el sistema');

  } catch (error) {
    console.error('❌ Error al generar administrador:', error.message);
    process.exit(1);
  } finally {
    rl.close();
    process.exit(0);
  }
}

// Manejar interrupciones
process.on('SIGINT', () => {
  console.log('\n\n❌ Operación cancelada por el usuario');
  rl.close();
  process.exit(0);
});

// Ejecutar si el archivo se ejecuta directamente
if (require.main === module) {
  generateAdmin();
}

module.exports = generateAdmin;