const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['pages', 'categories','custom'] 
  },
  order: { type: Number, required: true },
  slug: { type: String },
  url: { type: String },
  parent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Menu',
    default: null
  },
  
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }],
  status: { type: String, default: 'active' }
}, {
  timestamps: true,
});

menuSchema.virtual('childrenCount').get(function() {
  return this.children?.length || 0;
});

module.exports = mongoose.model('Menu', menuSchema);
