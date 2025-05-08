const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category_name: {
  type: String,
  required: true,
  unique: true 
  },

  slug:{
  type:String,
  unique:true,
  required:true,
  },

  description:{
  type:String,
  unique:true,
  required:true,
  },

  status: {
    type: String,
    enum: ['active', 'inactive'], 
    required: true,
  },

  parent:{
    type:mongoose.Schema.Types.ObjectId,
    unique:true,
    ref:'Category',
  },

}, { timestamps: true });

module.exports = mongoose.model("Category", CategorySchema);
