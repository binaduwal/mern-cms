const express = require('express');
const router = express.Router();
const galleryController = require('../controller/galleryController');
const galleryUpload = require('../middleware/galleryUploadMiddleware'); 

router.post('/create', galleryUpload, galleryController.createGallery);
router.get('/all', galleryController.getAllGalleries);
router.get('/:id', galleryController.getGalleryById);
router.put("/edit/:id", galleryUpload, galleryController.updateGallery);
router.delete("/:id/deleteImage", galleryController.deleteGalleryImage);

module.exports = router;
