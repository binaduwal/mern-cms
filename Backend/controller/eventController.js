const Event = require('../models/eventsModel').default;
const fs = require('fs');
const path = require('path');

const deleteEventImage = (filePath) => {
  if (filePath && !filePath.startsWith('http') && filePath.includes('/uploads')) {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
        console.log('Event image file deleted:', fullPath);
      } catch (unlinkErr) {
        console.error('Error deleting event image file:', unlinkErr);
      }
    } else {
      console.warn('Event image file not found for deletion:', fullPath);
    }
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, location, attendees } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/events/${req.file.filename}`;
    } else if (req.body.image && typeof req.body.image === 'string') {
      imageUrl = req.body.image;
    }

    const event = new Event({
      title,
      description,
      date,
      startTime,
      endTime,
      location, 
      attendees,
      image: imageUrl,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    if (req.file) {
      deleteEventImage(`/uploads/${req.file.filename}`);
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 }); 
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, location, attendees } = req.body;
    const updatedFields = { title, description, date, startTime, endTime, location, attendees };

    const existingEvent = await Event.findById(req.params.id);
    if (!existingEvent) {
      if (req.file) deleteEventImage(`/uploads/${req.file.filename}`);
      return res.status(404).json({ message: 'Event not found' });
    }

    let oldImagePath = existingEvent.image;
    let imagePathChanged = false;

    if (req.file) {
      updatedFields.image = `/uploads/${req.file.filename}`;
      imagePathChanged = true;
    } else if (Object.prototype.hasOwnProperty.call(req.body, 'image')) { 
      updatedFields.image = req.body.image; 
      if (existingEvent.image !== req.body.image) {
        imagePathChanged = true;
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedFields, { new: true, runValidators: true });

    if (!updatedEvent) {
       if (req.file && updatedFields.image === `/uploads/${req.file.filename}`) { 
        deleteEventImage(updatedFields.image);
      }
      return res.status(404).json({ message: 'Event not found during update' });
    }

    if (imagePathChanged && oldImagePath) {
      deleteEventImage(oldImagePath);
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    if (req.file && err.name !== 'ValidationError') { 
        deleteEventImage(`/uploads/${req.file.filename}`);
    }
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.image) {
      deleteEventImage(event.image);
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
