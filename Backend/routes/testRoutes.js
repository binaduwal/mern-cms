const express = require('express');
const router = express.Router();
const testController = require('../controller/testController'); // Adjust path
const { uploadMultipleImages } = require('../middleware/uploadMiddleware'); // Adjust path

router.post('/create', uploadMultipleImages, testController.createTestGallery);

router.get('/all', testController.getAllTestGalleries);

router.get('/:id', testController.getTestGalleryById);

router.put('/edit/:id', uploadMultipleImages, testController.updateTestGallery);

router.delete('/delete/:id', testController.deleteTestGallery);

module.exports = router;
