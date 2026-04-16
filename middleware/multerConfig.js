const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File types handled natively by Cloudinary (images and videos)
const cloudinaryExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.mp4', '.webm', '.mov', '.avi', '.mkv'];

// Cloudinary storage (for images and videos)
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const originalName = file.originalname.split('.')[0];
    const timestamp = Date.now();
    return {
      folder: 'sathishare',
      resource_type: 'auto',
      public_id: `${originalName}-${timestamp}`,
    };
  },
});

// Local disk storage (for PDFs and other documents)
const localStorageDir = path.join(__dirname, '..', 'storage');
if (!fs.existsSync(localStorageDir)) {
  fs.mkdirSync(localStorageDir, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, localStorageDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

// Dynamic storage engine that routes to Cloudinary or local disk
const hybridStorage = {
  _handleFile(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (cloudinaryExtensions.includes(ext)) {
      cloudinaryStorage._handleFile(req, file, cb);
    } else {
      diskStorage._handleFile(req, file, cb);
    }
  },
  _removeFile(req, file, cb) {
    const ext = path.extname(file.originalname || '').toLowerCase();
    if (cloudinaryExtensions.includes(ext)) {
      cloudinaryStorage._removeFile(req, file, cb);
    } else {
      diskStorage._removeFile(req, file, cb);
    }
  },
};

module.exports = {
  multer,
  storage: hybridStorage,
  cloudinary,
  cloudinaryExtensions,
};