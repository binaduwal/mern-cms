const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true,
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  }
},);

module.exports = mongoose.model('Feature', featureSchema);
