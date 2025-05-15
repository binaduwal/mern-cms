const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload directory for banners
const bannerUploadDir = path.join(__dirname, '..', 'uploads', 'banners');

// Ensure the directory exists, create it if it doesn't
if (!fs.existsSync(bannerUploadDir)) {
    fs.mkdirSync(bannerUploadDir, { recursive: true });
    console.log(`Created directory: ${bannerUploadDir}`);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, bannerUploadDir); // Save files to 'uploads/banners/'
    },
    filename: function (req, file, cb) {
        // Create a unique filename to avoid overwrites and keep it somewhat readable
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '').replace(extension, '');
        cb(null, safeOriginalName + '-' + uniqueSuffix + extension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) { // Accept only image files
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image file for the banner.'), false);
    }
};

// Create the multer middleware instance for a single file upload with the field name 'image'
const multerMiddleware = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
}).single('image'); // Assuming the field name for the image file is 'image'

// Custom middleware function to wrap multer and add logging
const bannerUpload = (req, res, next) => {
    multerMiddleware(req, res, (err) => {
        console.log("--- Inside bannerUpload custom middleware (after multer processing) ---");
        console.log("req.body:", JSON.stringify(req.body, null, 2));
        console.log("req.file:", req.file);
        if (err) {
            console.error("Multer error in custom middleware:", err);
            return res.status(400).json({ message: err.message || 'File upload error' });
        }
        next(); // Proceed to the next middleware or controller
    });
};

module.exports = bannerUpload;