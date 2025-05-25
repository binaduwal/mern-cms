const Feature = require('../models/featureModel');
const fs = require('fs');
const path = require('path');

exports.createFeature = async (req, res) => {
  // Log the state of req.body and req.file as soon as the controller is entered
  console.log('[Controller Create] req.body:', JSON.stringify(req.body));
  console.log('[Controller Create] req.file:', req.file);

  try {
    if (!req.body) {
      console.error('[Controller Create] req.body is undefined or null!');
      return res.status(400).json({ error: "Request body is missing." });
    }

    const { title, description } = req.body;

    if (typeof title === 'undefined') {
      console.error('[Controller Create] title is undefined in req.body.');
      return res.status(400).json({ error: "Title is missing from request body." });
    }

    let iconPath = '';
    if (req.file) { 
      iconPath = req.file.path;
    } else if (req.body.icon && typeof req.body.icon === 'string') { 
      iconPath = req.body.icon;
    }

    const featureData = {
      title,
      description,
      icon: iconPath
    };

    const feature = new Feature(featureData);
    await feature.save();

    res.status(201).json(feature);
  } catch (error) {
    console.error("[Controller Create] Error in createFeature:", error);
    if (error.name === 'ValidationError') {
        let errors = {};
        for (let field in error.errors) { errors[field] = error.errors[field].message; }
        return res.status(400).json({ error: "Validation failed", errors });
    }
    if (error instanceof TypeError && error.message.includes("Cannot destructure property")) {
        return res.status(400).json({ error: "Internal server error: Failed to process request body. Check server logs." });
    }
    res.status(400).json({ error: error.message || "Failed to create feature." });
  }
};

exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.status(200).json(features);
  } catch (error) {
    console.error("[Controller GetAll] Error in getAllFeatures:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateFeature = async (req, res) => {
  console.log('[Controller Update] req.body:', JSON.stringify(req.body, null, 2));
  console.log('[Controller Update] req.file:', req.file);
  try {
    if (!req.body) {
      console.error('[Controller Update] req.body is undefined or null!');
      return res.status(400).json({ error: "Request body is missing for update." });
    }

    const { title, description } = req.body;
    const updatedData = {};

    if (typeof title !== 'undefined') updatedData.title = title;
    if (typeof description !== 'undefined') updatedData.description = description;

    const existingFeature = await Feature.findById(req.params.id);
    if (!existingFeature) return res.status(404).json({ message: 'Feature not found' });

    let oldIconPath = existingFeature.icon;
    let iconPathChanged = false;

    if (req.file) {
      updatedData.icon = req.file.path;
      iconPathChanged = true;
    } else if (Object.prototype.hasOwnProperty.call(req.body, 'icon')) { 
      if (typeof req.body.icon === 'string') {
        updatedData.icon = req.body.icon; 
        if (existingFeature.icon !== req.body.icon) {
          iconPathChanged = true;
        }
      }
    }

    if (iconPathChanged && oldIconPath && !oldIconPath.startsWith('http') && fs.existsSync(oldIconPath)) {
      try {
        fs.unlinkSync(oldIconPath);
        console.log('Old icon file deleted during update:', oldIconPath);
      } catch (unlinkErr) {
        console.error('Error deleting old icon file during update:', unlinkErr);
      }
    }

    const updatedFeature = await Feature.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
    if (!updatedFeature) return res.status(404).json({ message: 'Feature not found after update attempt.' });

    res.status(200).json(updatedFeature);
  } catch (error) {
    console.error("[Controller Update] Error in updateFeature:", error);
    if (error.name === 'ValidationError') {
        let errors = {};
        for (let field in error.errors) { errors[field] = error.errors[field].message; }
        return res.status(400).json({ error: "Validation failed", errors });
    }
    res.status(400).json({ error: error.message || "Failed to update feature." });
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);
    if (!feature) return res.status(404).json({ message: 'Feature not found' });

    if (feature.icon && !feature.icon.startsWith('http') && fs.existsSync(feature.icon)) {
      try {
        fs.unlinkSync(feature.icon);
        console.log('Icon file deleted on feature delete:', feature.icon);
      } catch (unlinkErr) {
        console.error('Error deleting icon file on feature delete:', unlinkErr);
      }
    }

    res.status(200).json({ message: 'Feature deleted successfully' });
  } catch (error) {
    console.error("[Controller Delete] Error in deleteFeature:", error);
    res.status(500).json({ error: error.message || "Failed to delete feature." });
  }
};
