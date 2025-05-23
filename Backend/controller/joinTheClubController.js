const JoinTheClub = require('../models/joinTheClubModel');

exports.getAll = async (req, res) => {
  try {
    const items = await JoinTheClub.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single JoinTheClub document by ID
exports.getById = async (req, res) => {
  try {
    const item = await JoinTheClub.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'JoinTheClub item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new JoinTheClub document
exports.create = async (req, res) => {
  try {
    const newItem = new JoinTheClub(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Validation Error Details:', JSON.stringify(error, null, 2));
    res.status(400).json({ message: 'Validation error', error });
  }
};

// Update a JoinTheClub document by ID
exports.update = async (req, res) => {
  try {
    const updatedItem = await JoinTheClub.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: 'JoinTheClub item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error });
  }
};

// Delete a JoinTheClub document by ID
exports.delete = async (req, res) => {
  try {
    const deletedItem = await JoinTheClub.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'JoinTheClub item not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
