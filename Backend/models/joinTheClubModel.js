const mongoose = require('mongoose');

const ServiceItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service item title is required.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Service item description is required.'],
    trim: true,
  },
  image: {
    type: String, 
  }
});

//Main Schema
const JoinTheClubSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Main title for Join the Club section is required.'],
        trim: true,
  },
  description: {
    type: String,
    required: [true, 'Main description for Join the Club section is required.'],
        trim: true,
  },
  services: [ServiceItemSchema] 
}, );

module.exports = mongoose.model('JoinTheClub', JoinTheClubSchema);