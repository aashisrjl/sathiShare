const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const originalName = file.originalname.split('.')[0];
    const timestamp = Date.now();
    
    // Define document extensions that should be handled as 'raw'
    const docExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.zip', '.rar'];
    const isRaw = docExtensions.includes(extension);

    return {
      folder: 'sathishare',
      resource_type: isRaw ? 'raw' : 'auto',
      public_id: isRaw 
        ? `${originalName}-${timestamp}${extension}` 
        : `${originalName}-${timestamp}`,
    };
  },
});

module.exports = {
  multer,
  storage,
  cloudinary // Exported for deletion logic
};