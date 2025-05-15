const express = require('express');
const router = express.Router();
const BannerController = require('../controller/BannerController');
const bannerUpload = require('../middleware/bannerUpload'); 

router.post('/create', bannerUpload, BannerController.createBanner);
router.get('/all', BannerController.getAllBanners);
router.get('/:id', BannerController.getBannerById);
router.put('/edit/:id', BannerController.updateBanner); 
router.delete('/delete/:id', BannerController.deleteBanner);

module.exports = router;
