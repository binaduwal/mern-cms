const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  description: {
    type: String,
    // required: true,
  },
  logo: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    default: 'active',
  },
});

module.exports = mongoose.model('Partner', partnerSchema);
