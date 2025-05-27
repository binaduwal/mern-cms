const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  teamA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  scoreA: {
    type: Number,
    default: 0,
  },
  teamB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  scoreB: {
    type: Number,
    default: 0,
  },
  gameType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GameType",
    trim: true,
  },
  matchDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  day: {
    type: String,
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  status: {
    type: String,
    enum: ["Upcoming", "Full Time"],
    default: "Upcoming",
  },
});

module.exports = mongoose.model("Match", matchSchema);
