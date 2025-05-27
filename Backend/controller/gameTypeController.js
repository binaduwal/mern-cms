const GameType = require('../models/gameModel');
const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
  if (filePath && !filePath.startsWith('http') && filePath.includes('/uploads/')) {
    const fullPath = path.join(__dirname, '..', filePath); 
    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
        console.log('Old logo file deleted:', fullPath);
      } catch (unlinkErr) {
        console.error('Error deleting old logo file:', unlinkErr);
      }
    }
  }
};

exports.createGameType = async (req, res) => {
  try {
    const { title, status } = req.body;
    let logoUrl = null;

    if (req.file) {
      logoUrl = `/uploads/gametypes/${req.file.filename}`;
    } else if (req.body.logo && typeof req.body.logo === 'string') { 
      logoUrl = req.body.logo;
    }

    const gameType = new GameType({ title, status, logo: logoUrl });
    const savedGameType = await gameType.save();

    console.log("GameType created:", savedGameType);
    res.status(201).json(savedGameType);
  } catch (err) {
    console.error("Create GameType Error:", err);
    if (req.file) {
      deleteFile(`/uploads/gametypes/${req.file.filename}`);
    }
    res.status(400).json({ error: err.message || "Failed to create game type" });
  }
};

exports.getAllGameTypes = async (req, res) => {
  try {
    const gameTypes = await GameType.find().sort({ createdAt: -1 });
    res.status(200).json({ data: gameTypes });
  } catch (err) {
    console.error("Get All GameTypes Error:", err);
    res.status(500).json({ error: "Failed to fetch game types" });
  }
};

exports.getGameTypeById = async (req, res) => {
  try {
    const gameType = await GameType.findById(req.params.id);
    if (!gameType) {
      return res.status(404).json({ error: "Game type not found" });
    }
    res.status(200).json(gameType);
  } catch (err) {
    console.error("Get GameType By ID Error:", err);
    res.status(500).json({ error: "Failed to fetch game type" });
  }
};

exports.updateGameType = async (req, res) => {
  try {
    const { title, status } = req.body;
    const updatedFields = { title, status };

    const existingGameType = await GameType.findById(req.params.id);
    if (!existingGameType) {
      if (req.file) {
        deleteFile(`/uploads/gametypes/${req.file.filename}`);
      }
      return res.status(404).json({ error: "Game type not found" });
    }

    let oldLogoPath = existingGameType.logo;
    let logoPathChanged = false;

    if (req.file) {
      updatedFields.logo = `/uploads/gametypes/${req.file.filename}`;
      logoPathChanged = true;
    } else if (Object.prototype.hasOwnProperty.call(req.body, 'logo')) {
      if (existingGameType.logo !== req.body.logo) {
        updatedFields.logo = req.body.logo; 
        logoPathChanged = true;
      }
    }

    if (logoPathChanged && oldLogoPath) {
      deleteFile(oldLogoPath);
    }

    const updatedGameType = await GameType.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedGameType) {
      if (req.file && updatedFields.logo === `/uploads/gametypes/${req.file.filename}`) {
        deleteFile(updatedFields.logo);
      }
      return res.status(404).json({ error: "Game type not found during update" });
    }

    console.log("GameType updated:", updatedGameType);
    res.status(200).json(updatedGameType);
  } catch (err) {
    console.error("Update GameType Error:", err);
    if (req.file) {
        deleteFile(`/uploads/gametypes/${req.file.filename}`);
    }
    res.status(400).json({ error: err.message || "Failed to update game type" });
  }
};

exports.deleteGameType = async (req, res) => {
  try {
    const gameType = await GameType.findByIdAndDelete(req.params.id);
    if (!gameType) {
      return res.status(404).json({ error: "Game type not found" });
    }

    if (gameType.logo) {
      deleteFile(gameType.logo);
    }

    console.log("GameType deleted:", gameType);
    res.status(200).json({ message: "Game type deleted successfully" });
  } catch (err) {
    console.error("Delete GameType Error:", err);
    res.status(500).json({ error: "Failed to delete game type" });
  }
};