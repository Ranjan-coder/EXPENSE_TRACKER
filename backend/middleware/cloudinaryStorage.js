const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads', // Change as needed
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

module.exports = storage;
