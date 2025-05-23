const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Achievement', achievementSchema);
