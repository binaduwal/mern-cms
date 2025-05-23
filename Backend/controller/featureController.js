const Feature = require('../models/featureModel');

exports.createFeature = async (req, res) => {
  try {

    const feature = new Feature(req.body);
    await feature.save();

    await feature.save();
    res.status(201).json(feature);
  } catch (err) {
    res.status(500).json({ message: err.message},
       
    );
  }
};

exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(feature);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    await Feature.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feature deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
