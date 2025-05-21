const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  
  refRole: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Role',
},
  role: {
    type: String,
    enum: ['admin','user'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;