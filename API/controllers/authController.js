const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id, 
      role: user.rol,
      nombre: user.nombre,
      email: user.email // <-- Incluir email en el token
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { email, password, nombre, apellido } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email ya registrado' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, nombre, apellido });
    res.status(201).json({ userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};

// Verificar si un usuario es administrador
exports.verifyAdmin = async (req, res) => {
  try {
    // El middleware de autenticación ya verifica el token y lo decodifica
    // Verificamos si el rol es 'admin', usando req.user.role que proviene del middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    // Verificar en la base de datos que el usuario realmente tenga rol de admin
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    if (user.rol === 'admin') {
      return res.status(200).json({ isAdmin: true });
    }
    
    return res.status(403).json({ message: 'Acceso denegado' });
  } catch (err) {
    console.error('Error en verifyAdmin:', err);
    res.status(500).json({ message: 'Error al verificar permisos', error: err.message });
  }
};
