const express = require('express');
const router = express.Router();
const partnerController = require('../controller/partnerController');

router.post('/create', partnerController.createPartner);
router.get('/all', partnerController.getAllPartners);
router.get('/:id', partnerController.getPartnerById);
router.patch('/edit/:id', partnerController.updatePartner); 
router.delete('/delete/:id', partnerController.deletePartner);

module.exports = router;
