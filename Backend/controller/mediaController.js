const fs = require('fs');
const path = require('path');
const ImageModel = require('../models/imageModel'); 

const getAllMedia = async (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');

  try {
    const files = fs.readdirSync(uploadDir);
    
    const images = await ImageModel.find();

    const altTextMap = {};
    const titleMap   = {};
    const descriptionMap   = {};
    images.forEach(img => {
      const name = img.url.split('/').pop();
      altTextMap[name] = img.altText;
      titleMap[name]   = img.title;
      descriptionMap[name] = img.description;

    });


const fileUrls = files.map(file => {
      const filePath = path.join(uploadDir, file);
      const { size } = fs.statSync(filePath);

      return {
        filename: file,
        url:      `http://localhost:3000/uploads/${file}`,
        size,
        altText: altTextMap[file] || '',
        title:   titleMap[file]   || '',
        description:   descriptionMap[file]   || ''
      };
    });
    
    res.json(fileUrls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching media files', error: err });
  }
};

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const newImage = new ImageModel({
    url: `http://localhost:3000/uploads/${req.file.filename}`,
    altText: req.body.altText || '',
    title:   req.body.title    || '',    
    size: req.file.size, 
  });

  try {
    await newImage.save();
    res.json({
      message: 'File uploaded successfully',
      imageUrl: newImage.url,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving image', error });
  }
};

const deleteImage = async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename);
  console.log("Attempting to delete file: ", filename);
  try {
    await ImageModel.deleteOne({ url: `http://localhost:3000/uploads/${filename}` });
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.warn(`File not found on disk, skipping unlink: ${filePath}`);
    }
        res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error("Error deleting file: ", err); 
    res.status(500).json({ message: 'Failed to delete file', error: err });
  }
};

const updateAltText = async (req, res) => {
  const { url, altText, title,description } = req.body;
  try {
    await ImageModel.findOneAndUpdate({ url }, { altText,title,description}, { new: true }); 
    res.status(200).json({ message: 'Alt text updated successfully' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error updating alt text', error });
  }
};

module.exports = { getAllMedia, uploadImage, deleteImage, updateAltText };
