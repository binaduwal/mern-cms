const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOADS_FOLDER = 'uploads/';

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
    const fileName = file.originalname
      .replace(fileExt, '')
      .toLowerCase()
      .split(' ')
      .join('-') + '-' + Date.now();
    cb(null, fileName + fileExt);
  },
});

const eventImageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (e.g., jpeg, png, gif) are allowed!'), false);
    }
  },
});

module.exports = (req, res, next) => {
  const uploader = eventImageUpload.single('image'); 
  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};
