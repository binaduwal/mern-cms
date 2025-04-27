
const fs = require('fs');
const path = require('path');

 const getAllMedia = (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');
  
  try {
    const files = fs.readdirSync(uploadDir);
    
    const fileUrls = files.map(file => ({
      filename: file,
      url: `http://localhost:3000/uploads/${file}` 
    }));

    res.json(fileUrls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching media files', error: err });
  }
};

 const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    message: 'File uploaded successfully',
    imageUrl: `http://localhost:3000/uploads/${req.file.filename}`,
  });
};

module.exports = { getAllMedia, uploadImage };
