const express = require('express');
const router = express.Router();
const EventController = require("../controller/eventController");
const eventImageUpload = require('../middleware/multerMiddleware.js');

router.post('/create', eventImageUpload, EventController.createEvent);
router.get('/all', EventController.getAllEvents);
router.get('/:id', EventController.getEventById);
router.patch('/edit/:id', eventImageUpload, EventController.updateEvent);
router.delete('/delete/:id', EventController.deleteEvent);

module.exports = router;
