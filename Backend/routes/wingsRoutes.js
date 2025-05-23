const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const wingsController = require('../controller/wingsController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/wings')); 
},
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

const cpUpload = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'gallery', maxCount: 10 } 
]);

router.post('/create', cpUpload, wingsController.createWing);
router.get('/all', wingsController.getAllWings);
router.get('/:id', wingsController.getWingById);
router.patch('/edit/:id', cpUpload, wingsController.updateWing);
router.delete('/delete/:id', wingsController.deleteWing);

module.exports = router;
