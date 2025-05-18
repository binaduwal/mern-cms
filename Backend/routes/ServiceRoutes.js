const express = require('express');
const router = express.Router();
const serviceController = require('../controller/ServiceController');

router.post('/create',serviceController.createService);
router.get('/all',serviceController.getAllServices);
router.get('/:id',serviceController.getServiceById);
router.patch('/edit/:id',serviceController.updateService);
router.delete('/delete/:id',serviceController.deleteService);

module.exports = router;


