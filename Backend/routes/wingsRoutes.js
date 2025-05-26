const express = require('express');
const router = express.Router();
const wingsController = require('../controller/wingsController'); 

const wingUpload = require('../middleware/wingUpload');

router.post("/create", wingUpload, wingsController.createWing);
router.get('/all', wingsController.getAllWings);
router.get('/:id', wingsController.getWingById);
router.patch("/edit/:id", wingUpload, wingsController.updateWing);
router.delete('/delete/:id', wingsController.deleteWing);

module.exports = router;
