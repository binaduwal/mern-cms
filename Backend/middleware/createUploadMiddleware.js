const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploadMiddleware = (options) => {
    const {
        directory = 'default', 
        fieldName = 'file',    
        entityName = 'file',   
        fileSizeLimit = 1024 * 1024 * 5, 
        allowedMimeTypes = /^image\// // Default to images
    } = options;

    const uploadDir = path.join(__dirname, '..', 'uploads', directory);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`Created directory: ${uploadDir}`);
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir);
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
        if (allowedMimeTypes.test(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type! Please upload a valid file for the ${entityName}.`), false);
        }
    };

    const multerInstance = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: fileSizeLimit }
    }).single(fieldName);

    return (req, res, next) => {
        multerInstance(req, res, (err) => {
            if (err) {
                console.error(`Multer error during ${entityName} upload to ${directory}:`, err);
                return res.status(400).json({ message: err.message || 'File upload error' });
            }
            next();
        });
    };
};

module.exports = createUploadMiddleware;