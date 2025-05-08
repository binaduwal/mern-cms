const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true }, 
  altText: { type: String, default: '' }, 
  title: { type: String, default: '' }, 
  size: { type: Number, required: true }, 
  description: { type: String,default: '' }, 
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);