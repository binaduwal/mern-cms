import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, 
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
location: {
 type: String, 
 required: true 
},
  attendees: {
    type: Number, 
    required: true,
  },

  image:{
    type:String,
  }
});

export default mongoose.model('Event', eventSchema);
