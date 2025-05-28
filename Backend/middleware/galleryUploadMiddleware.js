const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOADS_FOLDER = path.join('uploads', 'gallery'); // Specific to gallery

const dir = path.join(__dirname, '..', UPLOADS_FOLDER);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Created directory: ${dir}`);
} else {
  console.log(`Directory already exists: ${dir}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const baseName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-');
    cb(null, `${baseName}-${uniqueSuffix}${fileExt}`);
  },
});

const galleryImageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit per file
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (e.g., jpeg, png, gif) are allowed!'), false);
    }
  },
});

module.exports = galleryImageUpload.array('images', 10);