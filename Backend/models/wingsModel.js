const mongoose = require('mongoose');

const wingsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String, 
    required: false,
  },
  gallery: [
    {
      type: String,
    }
  ],
  coverImage: {
    type: String,
    required: false,
  }
}, );

const Wings = mongoose.model('Wings', wingsSchema);
module.exports = Wings;