const express = require('express');
const router = express.Router();
const featureController = require('../controller/featureController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/features'); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.post('/create', upload.single('icon'), featureController.createFeature);
router.get('/all', featureController.getAllFeatures);
router.patch('/edit/:id', upload.single('icon'), featureController.updateFeature);
router.delete('/delete/:id', featureController.deleteFeature);

module.exports = router;
