// d:\consultancy\Backend\middleware\partnerUpload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOADS_FOLDER_PARTNERS = './uploads/partners/';

// Ensure the upload directory exists
if (!fs.existsSync(UPLOADS_FOLDER_PARTNERS)) {
  fs.mkdirSync(UPLOADS_FOLDER_PARTNERS, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER_PARTNERS);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image file.'), false);
  }
};

const partnerUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
  },
  fileFilter: fileFilter
});

module.exports = partnerUpload;
