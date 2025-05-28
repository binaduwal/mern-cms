const TestGallery = require('../models/testModel'); // Adjust path if necessary
const fs = require('fs');
const path = require('path');

const deleteUploadedFiles = (files) => {
  if (files && files.length > 0) {
    files.forEach(file => {
      const filePath = file.path; // multer provides the full path
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log('Deleted temporary file:', filePath);
        } catch (err) {
          console.error('Error deleting temporary file:', filePath, err);
        }
      }
    });
  }
};

// Helper function to delete specific files by URL (relative to uploads)
const deleteFilesByRelativeUrls = (relativeUrls, subfolder = 'test_gallery_images') => {
    if (relativeUrls && relativeUrls.length > 0) {
        relativeUrls.forEach(relativeUrl => {
            if (relativeUrl && !relativeUrl.startsWith('http')) { // Only delete local files
                const fullPath = path.join(__dirname, '..', 'uploads', subfolder, path.basename(relativeUrl));
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
        });
    }
};


// Create a new TestGallery with multiple images
exports.createTestGallery = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded.' });
    }

    // Construct image URLs (relative to your server's public/uploads path)
    // The base URL will be prepended by the frontend or a reverse proxy
    const imageUrls = req.files.map(file => `/uploads/test_gallery_images/${file.filename}`);

    const newGallery = new TestGallery({
      image: imageUrls
    });

    const savedGallery = await newGallery.save();
    res.status(201).json(savedGallery);
  } catch (error) {
    console.error("Error creating test gallery:", error);
    // If gallery creation fails, delete the uploaded files
    if (req.files) {
      deleteUploadedFiles(req.files);
    }
    res.status(500).json({ message: 'Error creating test gallery', error: error.message });
  }
};

// Get all TestGalleries
exports.getAllTestGalleries = async (req, res) => {
  try {
    const galleries = await TestGallery.find();
    res.json(galleries);
  } catch (error) {
    console.error("Error fetching test galleries:", error);
    res.status(500).json({ message: 'Error fetching test galleries', error: error.message });
  }
};

// Get a single TestGallery by ID
exports.getTestGalleryById = async (req, res) => {
  try {
    const gallery = await TestGallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Test gallery not found' });
    }
    res.json(gallery);
  } catch (error) {
    console.error("Error fetching test gallery by ID:", error);
    res.status(500).json({ message: 'Error fetching test gallery', error: error.message });
  }
};

// Update a TestGallery (replaces all images)
exports.updateTestGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const existingGallery = await TestGallery.findById(id);

    if (!existingGallery) {
      // If gallery doesn't exist and files were uploaded, delete them
      if (req.files) {
        deleteUploadedFiles(req.files);
      }
      return res.status(404).json({ message: 'Test gallery not found' });
    }

    let newImageUrls = existingGallery.image; // Keep old images if no new ones are uploaded

    if (req.files && req.files.length > 0) {
      // Delete old images from the server
      deleteFilesByRelativeUrls(existingGallery.image);

      // Set new image URLs
      newImageUrls = req.files.map(file => `/uploads/test_gallery_images/${file.filename}`);
    }

    const updatedGallery = await TestGallery.findByIdAndUpdate(
      id,
      { image: newImageUrls },
      { new: true, runValidators: true }
    );

    if (!updatedGallery) {
        // Should not happen if existingGallery was found, but as a safeguard
        if (req.files) {
            deleteUploadedFiles(req.files);
        }
        return res.status(404).json({ message: 'Test gallery not found during update' });
    }

    res.json(updatedGallery);
  } catch (error) {
    console.error("Error updating test gallery:", error);
    // If update fails and new files were uploaded, delete them
    if (req.files) {
      deleteUploadedFiles(req.files);
    }
    res.status(500).json({ message: 'Error updating test gallery', error: error.message });
  }
};

// Delete a TestGallery
exports.deleteTestGallery = async (req, res) => {
  try {
    const gallery = await TestGallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Test gallery not found' });
    }

    // Delete associated images from the server
    deleteFilesByRelativeUrls(gallery.image);

    res.json({ message: 'Test gallery deleted successfully' });
  } catch (error) {
    console.error("Error deleting test gallery:", error);
    res.status(500).json({ message: 'Error deleting test gallery', error: error.message });
  }
};
