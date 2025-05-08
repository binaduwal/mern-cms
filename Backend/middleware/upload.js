const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    try {
      const tempName = 'temp-' + Date.now() + path.extname(file.originalname);
      req.tempFilePath = path.join('uploads/', tempName);
      cb(null, tempName);
    } catch (err) {
      cb(err);
    }
  }});


  const handleDuplicateImage = async (req, res, next) => {
    if (!req.file)
       return next();

    try {
      // Calculate hash of the uploaded file
      const fileBuffer = fs.readFileSync(req.file.path);
      const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
      
      const uploadDir = path.join(__dirname, '../uploads');
      const files = fs.readdirSync(uploadDir);
      
      let existingFile = null;
      
      // Look through existing files to find a match
      for (const file of files) {
        if (file === path.basename(req.file.path)) continue; // Skip the file we just uploaded
        
        const filePath = path.join(uploadDir, file);
        const fileStats = fs.statSync(filePath);
        
        // Only compare files, not directories
        if (fileStats.isFile()) {
          const existingBuffer = fs.readFileSync(filePath);
          const existingHash = crypto.createHash('md5').update(existingBuffer).digest('hex');
          
          if (existingHash === hash) {
            existingFile = file;
            break;
          }
        }
      }
      
      if (existingFile) {
        // Delete the duplicate we just uploaded
        fs.unlinkSync(req.file.path);
        
        // Use the existing file path instead
        req.file.filename = existingFile;
        req.file.path = path.join(uploadDir, existingFile);
      } else {
        // Rename the file to include hash for future comparisons
        const newFilename = `${hash}${path.extname(req.file.originalname)}`;
        const newPath = path.join(uploadDir, newFilename);
        
        fs.renameSync(req.file.path, newPath);
        
        req.file.filename = newFilename;
        req.file.path = newPath;
      }
      
      next();
    } catch (err) {
      next(err);
    }
  };
  


const upload = multer({ storage: storage });

module.exports = upload;              
module.exports.handleDuplicateImage = handleDuplicateImage;
