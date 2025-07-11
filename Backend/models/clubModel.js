const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
  },
  logo: { 
    type: String 
  }             
}, );

module.exports = mongoose.model('Club', clubSchema);
