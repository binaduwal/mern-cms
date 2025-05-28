const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the destination folder for gallery uploads
const GALLERY_UPLOADS_SUBFOLDER = 'galleries';
const UPLOADS_ROOT_FOLDER = 'uploads';
const GALLERY_UPLOADS_PATH = path.join(UPLOADS_ROOT_FOLDER, GALLERY_UPLOADS_SUBFOLDER);

const absoluteUploadPath = path.join(__dirname, '..', GALLERY_UPLOADS_PATH);
if (!fs.existsSync(absoluteUploadPath)) {
  fs.mkdirSync(absoluteUploadPath, { recursive: true });
  console.log(`Created directory: ${absoluteUploadPath}`);
} else {
  console.log(`Directory already exists: ${absoluteUploadPath}`);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, absoluteUploadPath); 
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, fileExt);
    const sanitizedBaseName = baseName.toLowerCase().split(' ').join('-');
    const uniqueSuffix = Date.now();
    cb(null, `${sanitizedBaseName}-${uniqueSuffix}${fileExt}`);
  },
});

// Configure multer instance for gallery uploads
const galleryMulter = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit per file
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (e.g., jpeg, png, gif) are allowed for the gallery!'), false);
    }
  },
});

// Middleware function
const MAX_IMAGE_COUNT = 10; 

module.exports = (req, res, next) => {
  const upload = galleryMulter.array('images', MAX_IMAGE_COUNT);

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next(); 
  });
};