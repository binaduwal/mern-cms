const mongoose=require('mongoose')

const pagesItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pages',
    default: 'None'
  },
  image: { type: String },
},
{ timestamps: true }
);
  

module.exports = mongoose.model("Pages", pagesItemSchema);
