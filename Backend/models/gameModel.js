const mongoose = require('mongoose');

const gameTypeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
  },               
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'Active' 
  },
  logo: { 
    type: String 
  }                
}, );

module.exports = mongoose.model('GameType', gameTypeSchema);
