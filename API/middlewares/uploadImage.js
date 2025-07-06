const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Carpeta de destino
const uploadDir = path.join(__dirname, '../uploads');

// Configurar multer (memoria para procesar con sharp)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const processImage = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `${Date.now()}.webp`;
  const filepath = path.join(uploadDir, filename);

  try {
    await sharp(req.file.buffer)
      .resize(800) // opcional: tamaño máximo
      .webp({ quality: 80 })
      .toFile(filepath);

    req.imageUrl = `/uploads/${filename}`;
    next();
  } catch (err) {
    console.error('Error al procesar imagen:', err);
    res.status(500).json({ message: 'Error al procesar imagen' });
  }
};

module.exports = {
  uploadImage: upload.single('imagen'),
  processImage,
};
