const express = require('express');
const router = express.Router();
const BannerController = require('../controller/BannerController');

router.post('/create', BannerController.createBanner);
router.get('/all', BannerController.getAllBanners);
router.get('/:id', BannerController.getBannerById);
router.put('/edit/:id', BannerController.updateBanner);
router.delete('/delete/:id', BannerController.deleteBanner);

module.exports = router;
