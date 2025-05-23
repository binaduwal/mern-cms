const Partner = require("../models/partnerModel");

exports.createPartner = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const logo = req.file ? req.file.filename : null;

    const partner = new Partner({ name, description, status, logo });
    const saved = await partner.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Create Partner Error:", err);
    res.status(400).json({ error: err.message || "Failed to create partner" });
  }
};

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    console.log(partners);
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
    const logo = req.file ? req.file.filename : undefined;

    const updatedFields = {
      name,
      description,
      status,
    };

    if (logo) updatedFields.logo = logo;

    const updated = await Partner.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
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
    const deleted = await Partner.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Partner not found" });

    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete partner" });
  }
};
