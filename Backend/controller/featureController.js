const Feature = require('../models/featureModel');
const fs = require('fs');
const path = require('path');

exports.createFeature = async (req, res) => {
  try {
    const { title, description } = req.body;
    const icon = req.file ? req.file.path : '';

    const feature = new Feature({ title, description, icon });
    await feature.save();

    res.status(201).json(feature);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedData = { title, description };

    const existingFeature = await Feature.findById(req.params.id);
    if (!existingFeature) return res.status(404).json({ message: 'Feature not found' });

    if (req.file) {
      if (existingFeature.icon && fs.existsSync(existingFeature.icon)) {
        fs.unlinkSync(existingFeature.icon);
      }
      updatedData.icon = req.file.path;
    }

    const updatedFeature = await Feature.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedFeature);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);
    if (!feature) return res.status(404).json({ message: 'Feature not found' });

    if (feature.icon && fs.existsSync(feature.icon)) {
      fs.unlinkSync(feature.icon);
    }

    res.status(200).json({ message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
