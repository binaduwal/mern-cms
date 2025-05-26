const mongoose = require('mongoose');

const callToActionSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  buttonText: {
    type: String,
    required: true,
    trim: true
  },
  buttonUrl: {
    type: String,
    required: true,
    trim: true
  }
},);

module.exports = mongoose.model('CallToAction', callToActionSchema);
