const express = require('express');
const router = express.Router();
const featureController = require('../controller/featureController');

router.post('/create', featureController.createFeature);
router.get('/all', featureController.getAllFeatures);
router.patch('/edit/:id', featureController.updateFeature);
router.delete('/delete/:id', featureController.deleteFeature);

module.exports = router;
