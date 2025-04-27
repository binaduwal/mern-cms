const express = require('express');
const mediaController = require('../controller/mediaController');
const upload=require('../middleware/upload')
const router = express.Router();
const {handleDuplicateImage} =require('../middleware/upload')

router.get('/all', mediaController.getAllMedia);
router.post('/upload', upload.single('image'), handleDuplicateImage, mediaController.uploadImage);

module.exports = router;
