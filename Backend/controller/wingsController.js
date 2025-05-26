const Wings = require("../models/wingsModel");
const fs = require('fs');
const path = require('path');

exports.createWing = async (req, res) => {
  try {
    const { title, description, gallery_urls } = req.body;

    let logoPath = "";
    if (req.files?.logo?.[0]) {
      logoPath = `/uploads/wings/${req.files.logo[0].filename}`;
    } else if (req.body.logo && typeof req.body.logo === "string") {
      logoPath = req.body.logo;
    }

    let coverImagePath = "";
    if (req.files?.coverImage?.[0]) {
      coverImagePath = `/uploads/wings/${req.files.coverImage[0].filename}`;
    } else if (req.body.coverImage && typeof req.body.coverImage === "string") {
      coverImagePath = req.body.coverImage; 
    }

    const galleryPaths = [];
    if (req.files?.gallery) {
      req.files.gallery.forEach((file) => {
        galleryPaths.push(`/uploads/wings/${file.filename}`);
      });
    }
    if (gallery_urls && Array.isArray(gallery_urls)) {
      gallery_urls.forEach((url) => {
        if (typeof url === "string" && url.trim() !== "") {
          galleryPaths.push(url);
        }
      });
    }
    const wing = new Wings({
      title,
      description,
      logo: logoPath,
      coverImage: coverImagePath,
      gallery: galleryPaths,
    });

    await wing.save();
    res.status(201).json(wing);
  } catch (error) {
    if (req.files?.logo?.[0])
      fs.unlink(
        path.join(
          __dirname,
          "..",
          `/uploads/wings/${req.files.logo[0].filename}`
        ),
        (err) => {
          if (err) console.error("Error deleting logo on fail:", err);
        }
      );
    if (req.files?.coverImage?.[0])
      fs.unlink(
        path.join(
          __dirname,
          "..",
          `/uploads/wings/${req.files.coverImage[0].filename}`
        ),
        (err) => {
          if (err) console.error("Error deleting coverImage on fail:", err);
        }
      );
    if (req.files?.gallery)
      req.files.gallery.forEach((file) =>
        fs.unlink(
          path.join(__dirname, "..", `/uploads/wings/${file.filename}`),
          (err) => {
            if (err)
              console.error("Error deleting gallery image on fail:", err);
          }
        )
      );
  }
};

exports.getAllWings = async (req, res) => {
  try {
    const wings = await Wings.find();
    res.status(200).json(wings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWingById = async (req, res) => {
  try {
    const wing = await Wings.findById(req.params.id);
    if (!wing) {
      return res.status(404).json({ message: "Wing not found" });
    }
    res.status(200).json(wing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, gallery_urls } = req.body;
    const updatedFields = { title, description };

    const existingWing = await Wings.findById(id);
    if (!existingWing) {
      return res.status(404).json({ message: "Wing not found" });
    }
const deleteOldFile = (filePath) => {
      if (filePath && !filePath.startsWith('http') && filePath.includes('/uploads/')) {
        const fullOldPath = path.join(__dirname, '..', filePath);
        if (fs.existsSync(fullOldPath)) {
          try {
            fs.unlinkSync(fullOldPath);
            console.log('Old file deleted:', fullOldPath);
          } catch (unlinkErr) {
            console.error('Error deleting old file:', unlinkErr);
          }
        }
      }
    };
    if (req.files?.logo?.[0]) {
      deleteOldFile(existingWing.logo);
      updatedFields.logo = `/uploads/wings/${req.files.logo[0].filename}`;
    } else if (Object.prototype.hasOwnProperty.call(req.body, 'logo')) { 
      if (existingWing.logo !== req.body.logo) { 
        deleteOldFile(existingWing.logo);
      }
      updatedFields.logo = req.body.logo; 
    }

    if (req.files?.coverImage?.[0]) {
      deleteOldFile(existingWing.coverImage);
      updatedFields.coverImage = `/uploads/wings/${req.files.coverImage[0].filename}`;
    } else if (Object.prototype.hasOwnProperty.call(req.body, 'coverImage')) {
      if (existingWing.coverImage !== req.body.coverImage) {
        deleteOldFile(existingWing.coverImage);
      }
      updatedFields.coverImage = req.body.coverImage;
    }

    const newGalleryPaths = [];
    if (gallery_urls && Array.isArray(gallery_urls)) {
      gallery_urls.forEach(url => {
        if (typeof url === 'string' && url.trim() !== '') {
          newGalleryPaths.push(url);
        }
      });
    }

    if (req.files?.gallery) {
      req.files.gallery.forEach(file => {
        newGalleryPaths.push(`/uploads/wings/${file.filename}`);
      });
    }
    updatedFields.gallery = newGalleryPaths;

    if (existingWing.gallery && Array.isArray(existingWing.gallery)) {
      existingWing.gallery.forEach(oldPath => {
        if (!newGalleryPaths.includes(oldPath)) {
          deleteOldFile(oldPath);
        }
      });
    }


    const updatedWing = await Wings.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });
    if (!updatedWing) return res.status(404).json({ message: 'Wing not found after update attempt.' });

    res.status(200).json(updatedWing);

    } catch (error) {
          console.error("Update Wing Error:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWing = async (req, res) => {
  try {
const deletedWing = await Wings.findByIdAndDelete(req.params.id);
    if (!deletedWing) {
      return res.status(404).json({ message: "Wing not found" });
    }
    if (deletedWing.logo) deleteOldFile(deletedWing.logo);
    if (deletedWing.coverImage) deleteOldFile(deletedWing.coverImage);
    if (deletedWing.gallery && deletedWing.gallery.length > 0) {
      deletedWing.gallery.forEach(filePath => deleteOldFile(filePath));
    }
    res.status(200).json({ message: "Wing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOldFile = (filePath) => {
  if (filePath && !filePath.startsWith('http') && filePath.includes('/uploads/')) {
    const fullOldPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullOldPath)) {
      try {
        fs.unlinkSync(fullOldPath);
        console.log('Old file deleted:', fullOldPath);
      } catch (unlinkErr) {
        console.error('Error deleting old file:', unlinkErr);
      }
    }
  }
}
