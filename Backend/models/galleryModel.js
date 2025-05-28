const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String, default: '' }
}, { _id: false });

const gallerySchema = new mongoose.Schema({
  description: { type: String, default: '' },
  images: [galleryImageSchema], 
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema); 
module.exports = Gallery;