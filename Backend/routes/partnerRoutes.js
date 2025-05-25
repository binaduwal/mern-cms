const express = require('express');
const router = express.Router();
const partnerController = require('../controller/partnerController');
const partnerUpload = require('../middleware/partnerUpload');

router.post('/create', partnerUpload, partnerController.createPartner);
router.get('/all', partnerController.getAllPartners);
router.get('/:id', partnerController.getPartnerById);
router.patch('/edit/:id', partnerUpload, partnerController.updatePartner);
router.delete('/delete/:id', partnerController.deletePartner);

module.exports = router;
