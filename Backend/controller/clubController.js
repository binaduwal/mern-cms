const Club = require("../models/clubModel");
const fs = require('fs');
const path = require('path');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    let logoUrl = null;

    if (req.file) {
      logoUrl = `/uploads/club/${req.file.filename}`;
    } else if (req.body.logo && typeof req.body.logo === 'string') {
      logoUrl = req.body.logo;
    }

    const club = new Club({ name, logo: logoUrl });
    const saved = await club.save();

    console.log("Club created:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create Club Error:", err);
    res.status(400).json({ error: err.message || "Failed to create club" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json({ data: clubs });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

exports.getById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ error: "Club not found" });

    res.status(200).json(club);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch club" });
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedFields = { name };

    const existingClub = await Club.findById(req.params.id);
    if (!existingClub) {
      return res.status(404).json({ error: "Club not found" });
    }

    let oldLogoPath = existingClub.logo;
    let logoPathChanged = false;

    if (req.file) {
      updatedFields.logo = `/uploads/club/${req.file.filename}`;
      logoPathChanged = true;
    } else if (Object.prototype.hasOwnProperty.call(req.body, 'logo')) {
      if (typeof req.body.logo === 'string') {
        updatedFields.logo = req.body.logo;
        if (existingClub.logo !== req.body.logo) {
          logoPathChanged = true;
        }
      } else if (req.body.logo === null || req.body.logo === "null" || req.body.logo === "") {
        updatedFields.logo = null;
        if (existingClub.logo) {
          logoPathChanged = true;
        }
      }
    }

    if (logoPathChanged && oldLogoPath && !oldLogoPath.startsWith('http') && oldLogoPath.includes('/uploads/')) {
      const fullOldPath = path.join(__dirname, '..', oldLogoPath);
      if (fs.existsSync(fullOldPath)) {
        try {
          fs.unlinkSync(fullOldPath);
          console.log('Old club logo file deleted:', fullOldPath);
        } catch (unlinkErr) {
          console.error('Error deleting old club logo file:', unlinkErr);
        }
      }
    }

    const updated = await Club.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Club not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Club Error:", err);
    res.status(400).json({ error: "Failed to update club" });
  }
};

exports.delete = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ error: "Club not found" });

    if (club.logo && !club.logo.startsWith('http') && club.logo.includes('/uploads/')) {
      const fullLogoPath = path.join(__dirname, '..', club.logo);
      if (fs.existsSync(fullLogoPath)) {
        try {
          fs.unlinkSync(fullLogoPath);
          console.log('Club logo file deleted on delete:', fullLogoPath);
        } catch (unlinkErr) {
          console.error('Error deleting club logo file on delete:', unlinkErr);
        }
      }
    }

    res.status(200).json({ message: "Club deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete club" });
  }
};
