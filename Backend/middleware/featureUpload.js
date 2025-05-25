const multer = require('multer');
const path = require('path');
const fs = require('fs');

const featureUploadDir = path.join(__dirname, '..', 'uploads', 'features');

if (!fs.existsSync(featureUploadDir)) {
    fs.mkdirSync(featureUploadDir, { recursive: true });
    console.log(`Created directory: ${featureUploadDir}`);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, featureUploadDir); 
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        let baseName = path.basename(file.originalname, extension); 
        baseName = baseName.replace(/[^a-zA-Z0-9._-]/g, ''); 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, baseName + '-' + uniqueSuffix + extension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) { 
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image file for the feature.'), false);
    }
};

const multerMiddleware = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
}).single('icon'); 
const featureUpload = (req, res, next) => {
    multerMiddleware(req, res, (err) => {
        console.log("req.body:", JSON.stringify(req.body, null, 2));
        console.log("req.file:", req.file);
        if (err) {
            console.error("Multer error in custom middleware:", err);
            return res.status(400).json({ message: err.message || 'File upload error' });
        }
        next(); 
    });
};

module.exports = featureUpload;