const express = require('express');
const router = express.Router();
const ctaCtrl = require('../controller/callToActionController');

router.post('/create', ctaCtrl.createCTA);
router.get('/all', ctaCtrl.getAllCTAs);
router.get('/:id', ctaCtrl.getCTAById);
router.patch('/edit/:id', ctaCtrl.updateCTA);
router.delete('/delete/:id', ctaCtrl.deleteCTA);

module.exports = router;
