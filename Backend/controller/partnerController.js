const Partner = require("../models/partnerModel");
const fs = require('fs');
const path = require('path');

exports.createPartner = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    let logoUrl = null;

    if (req.file) {
      logoUrl = `/uploads/partners/${req.file.filename}`;
    } else if (req.body.logo && typeof req.body.logo === 'string') {
      logoUrl = req.body.logo;
    }

    const partner = new Partner({ name, description, status, logo: logoUrl });
    const saved = await partner.save();

    console.log("Partner created:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create Partner Error:", err);
    res.status(400).json({ error: err.message || "Failed to create partner" });
  }
};

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json({data:partners});
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch partners" });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ error: "Partner not found" });

    res.status(200).json(partner);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch partner" });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const updatedFields = { name, description, status };

    const existingPartner = await Partner.findById(req.params.id);
    if (!existingPartner) {
      return res.status(404).json({ error: "Partner not found" });
    }

    let oldLogoPath = existingPartner.logo;
    let logoPathChanged = false;

    if (req.file) {
      updatedFields.logo = `/uploads/partners/${req.file.filename}`;
      logoPathChanged = true;
    } else if (Object.prototype.hasOwnProperty.call(req.body, 'logo')) {
      if (typeof req.body.logo === 'string') {
        updatedFields.logo = req.body.logo;
        if (existingPartner.logo !== req.body.logo) {
          logoPathChanged = true;
        }
      } else if (req.body.logo === null || req.body.logo === "null" || req.body.logo === "") { // Explicitly setting logo to null/empty
        updatedFields.logo = null;
        if (existingPartner.logo) { 
          logoPathChanged = true;
        }
      }
    }

    if (logoPathChanged && oldLogoPath && !oldLogoPath.startsWith('http') && oldLogoPath.includes('/uploads/')) {
      const fullOldPath = path.join(__dirname, '..', oldLogoPath);
      if (fs.existsSync(fullOldPath)) {
        try {
          fs.unlinkSync(fullOldPath);
          console.log('Old partner logo file deleted:', fullOldPath);
        } catch (unlinkErr) {
          console.error('Error deleting old partner logo file:', unlinkErr);
        }
      }
    }

    const updated = await Partner.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Partner not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Partner Error:", err);
    res.status(400).json({ error: "Failed to update partner" });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ error: "Partner not found" });

    if (partner.logo && !partner.logo.startsWith('http') && partner.logo.includes('/uploads/')) {
      const fullLogoPath = path.join(__dirname, '..', partner.logo);
      if (fs.existsSync(fullLogoPath)) {
        try {
          fs.unlinkSync(fullLogoPath);
          console.log('Partner logo file deleted on partner delete:', fullLogoPath);
        } catch (unlinkErr) {
          console.error('Error deleting partner logo file on partner delete:', unlinkErr);
        }
      }
    }

    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete partner" });
  }
};
