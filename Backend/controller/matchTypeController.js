const Match = require("../models/matchModel");

exports.create = async (req, res) => {
  try {
    const match = new Match(req.body);
    const saved = await match.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Match.find()
      .populate('teamA', 'name logo')
      .populate('teamB', 'name logo')
      .populate('gameType', 'title logo');
    res.status(200).json({ data: list });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Match.findById(req.params.id)
      .populate('teamA', 'name logo')
      .populate('teamB', 'name logo')
      .populate('gameType', 'title logo');
    if (!item) return res.status(404).json({ error: "Match not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch match" });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Match not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update match" });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Match.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Match not found" });
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete match" });
  }
};
