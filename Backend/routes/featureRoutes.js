const express = require('express');
const router = express.Router();
const featureController = require('../controller/featureController');
const featureUpload = require("../middleware/featureUpload");

router.post('/create', featureUpload, featureController.createFeature);
router.get('/all', featureController.getAllFeatures);
router.patch('/edit/:id', featureUpload, featureController.updateFeature);
router.delete('/delete/:id', featureController.deleteFeature);

module.exports = router;
