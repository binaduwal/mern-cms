const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required.'],
    trim: true,
  },
  summary: {
    type: String,
    required: [true, 'Service summary is required.'],
    trim: true,
  },
  desc: { 
    type: String,
    trim: true,
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Service', serviceSchema);