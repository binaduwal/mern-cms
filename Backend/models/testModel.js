const mongoose = require('mongoose');


const testSchema = new mongoose.Schema({
  image: [{
    type: String
  }]
}, );

const Test = mongoose.model('Test', testSchema); 
module.exports = Test;