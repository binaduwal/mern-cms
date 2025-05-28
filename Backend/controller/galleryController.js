const Gallery = require('../models/galleryModel');
const fs = require('fs');
const path = require('path');

const deleteUploadedFile = (filePathSuffix) => {
  if (filePathSuffix && !filePathSuffix.startsWith('http')) {
    const fullPath = path.join(__dirname, '..', filePathSuffix.startsWith('/') ? filePathSuffix.substring(1) : filePathSuffix);
    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
        console.log('Deleted file:', fullPath);
      } catch (err) {
        console.error('Error deleting file:', fullPath, err);
      }
    } else {
      console.warn('File not found for deletion:', fullPath);
    }
  }
};

exports.createGallery = async (req, res) => {
  try {
    const { description, imageUrls, imageAltTexts, altTexts } = req.body;
    const uploadedFiles = req.files;

    const imageEntries = [];

    if (uploadedFiles && uploadedFiles.length > 0) {
      uploadedFiles.forEach((file, index) => {
        imageEntries.push({
          url: `/uploads/gallery/${file.filename}`,
          altText: altTexts && altTexts[index] ? altTexts[index] : file.originalname
        });
      });
    }

    if (imageUrls && Array.isArray(imageUrls)) {
      imageUrls.forEach((url, index) => {
        imageEntries.push({
          url: url,
          altText: imageAltTexts && imageAltTexts[index] ? imageAltTexts[index] : ''
        });
      });
    }

    const newGallery = new Gallery({
      description,
      images: imageEntries
    });

    const savedGallery = await newGallery.save();
    res.status(201).json(savedGallery);
  } catch (error) {
    console.error("Error creating gallery:", error);
    if (req.files) {
        req.files.forEach(file => {
            deleteUploadedFile(`uploads/gallery/${file.filename}`);
        });
    }
    res.status(500).json({ message: 'Error creating gallery', error: error.message });
  }
};

exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    res.status(500).json({ message: 'Error fetching galleries', error: error.message });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery by ID:", error);
    res.status(500).json({ message: 'Error fetching gallery', error: error.message });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, imageUrls, imageAltTexts, altTexts } = req.body;
    const uploadedFiles = req.files; 

    const existingGallery = await Gallery.findById(id);
    if (!existingGallery) {
      if (uploadedFiles) {
        uploadedFiles.forEach(file => deleteUploadedFile(`uploads/gallery/${file.filename}`));
      }
      return res.status(404).json({ message: 'Gallery not found' });
    }

    const oldLocalImageUrls = existingGallery.images
        .filter(img => img.url && !img.url.startsWith('http') && img.url.includes('/uploads/gallery/'))
        .map(img => img.url);

    const updatedImageEntries = [];

    if (uploadedFiles && uploadedFiles.length > 0) {
      uploadedFiles.forEach((file, index) => {
        updatedImageEntries.push({
          url: `/uploads/gallery/${file.filename}`,
          altText: altTexts && altTexts[index] ? altTexts[index] : file.originalname
        });
      });
    }

    if (imageUrls && Array.isArray(imageUrls)) {
      imageUrls.forEach((url, index) => {
        updatedImageEntries.push({
          url: url,
          altText: imageAltTexts && imageAltTexts[index] ? imageAltTexts[index] : ''
        });
      });
    }
    
    const updatePayload = {
      description,
      images: updatedImageEntries
    };

    const updatedGallery = await Gallery.findByIdAndUpdate(id, updatePayload, { new: true });
    if (!updatedGallery) {
      if (uploadedFiles) {
        uploadedFiles.forEach(file => deleteUploadedFile(`uploads/gallery/${file.filename}`));
      }
      return res.status(404).json({ message: 'Gallery not found' });
    }

    const currentLocalImageUrls = updatedImageEntries
        .filter(img => img.url && !img.url.startsWith('http') && img.url.includes('/uploads/gallery/'))
        .map(img => img.url);

    oldLocalImageUrls.forEach(oldUrl => {
        if (!currentLocalImageUrls.includes(oldUrl)) {
            deleteUploadedFile(oldUrl.substring(1)); 
        }
    });

    res.json(updatedGallery);
  } catch (error) {
    console.error("Error updating gallery:", error);
    if (req.files) {
        req.files.forEach(file => {
            deleteUploadedFile(`uploads/gallery/${file.filename}`);
        });
    }
    res.status(500).json({ message: 'Error updating gallery', error: error.message });
  }
};

// exports.deleteGallery = async (req, res) => {
//   try {
//     const gallery = await Gallery.findByIdAndDelete(req.params.id);
//     if (!gallery) {
//       return res.status(404).json({ message: 'Gallery not found' });
//     }

//     if (gallery.images && gallery.images.length > 0) {
//       gallery.images.forEach(img => {
//         if (img.url && !img.url.startsWith('http') && img.url.includes('/uploads/gallery/')) {
//           deleteUploadedFile(img.url.substring(1));
//         }
//       });
//     }

//     res.json({ message: 'Gallery deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting gallery:", error);
//     res.status(500).json({ message: 'Error deleting gallery', error: error.message });
//   }
// };


// DELETE /gallery/:id/deleteImage

exports.deleteGalleryImage = async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  try {
    const gallery = await Gallery.findById(id);
    if (!gallery) return res.status(404).send({ message: "Not found" });

    gallery.images = gallery.images.filter(img => img.url !== url);
    await gallery.save();


    res.json(gallery);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

