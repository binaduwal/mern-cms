const express = require('express');
const router = express.Router();
const galleryController = require('../controller/galleryController');
const galleryUpload = require('../middleware/galleryUploadMiddleware'); // Use the new specific middleware

router.post('/create', galleryUpload, galleryController.createGallery);
router.get('/all', galleryController.getAllGalleries);
router.get('/:id', galleryController.getGalleryById);
router.put("/edit/:id", galleryUpload, galleryController.updateGallery);
router.delete("/delete/:id", galleryController.deleteGallery);

module.exports = router;
