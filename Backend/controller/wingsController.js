const Wings = require('../models/wingsModel');

exports.createWing = async (req, res) => {
  try {
    const wing = new Wings(req.body);
    await wing.save();
    res.status(201).json(wing);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
      return res.status(404).json({ message: 'Wing not found' });
    }
    res.status(200).json(wing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWing = async (req, res) => {
  try {
    const wing = await Wings.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!wing) {
      return res.status(404).json({ message: 'Wing not found' });
    }
    res.status(200).json(wing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWing = async (req, res) => {
  try {
    const wing = await Wings.findByIdAndDelete(req.params.id);
    if (!wing) {
      return res.status(404).json({ message: 'Wing not found' });
    }
    res.status(200).json({ message: 'Wing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
