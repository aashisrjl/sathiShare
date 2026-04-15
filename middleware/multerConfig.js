const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sathishare',
    resource_type: 'auto', // Support all file types including archives
    public_id: (req, file) => file.originalname.split('.')[0] + '-' + Date.now(),
  },
});

module.exports = {
  multer,
  storage,
  cloudinary // Exported for deletion logic
};