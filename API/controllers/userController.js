const { User } = require('../models');

// Obtener todos los usuarios (solo admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Obtener perfil de un usuario específico (admin o el mismo usuario)
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.userId !== id) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

// Actualizar perfil del usuario (admin o el mismo)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    if (req.user.role !== 'admin' && req.user.userId !== id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario (admin o el mismo)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.userId !== id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

// Cambiar rol de usuario (solo admin)
exports.changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: 'Error al cambiar rol', error: err.message });
  }
};

// Activar/desactivar usuario (solo admin)
exports.toggleUserActive = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    user.activo = !user.activo;
    await user.save();
    res.json({ success: true, activo: user.activo });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: err.message });
  }
};
