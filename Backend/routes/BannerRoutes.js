const express = require('express');
const router = express.Router();
const BannerController = require('../controller/BannerController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/banners/'); 
  },
  filename: function (req, file, cb) {
    cb(null, 'banner-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/webp') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .png, .gif, .webp formats allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter,
     limits: { fileSize: 1024 * 1024 * 5 }
 });

router.post('/create', upload.single('image'), BannerController.createBanner);
router.get('/all', BannerController.getAllBanners);
router.get('/:id', BannerController.getBannerById);
router.put('/edit/:id', BannerController.updateBanner);
router.delete('/delete/:id', BannerController.deleteBanner);

module.exports = router;
