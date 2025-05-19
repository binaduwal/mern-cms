const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');

router.post('/create', roleController.createRole);
router.get('/all', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById); 
router.patch('/edit/:id', roleController.editRole);
router.delete('/delete/:id', roleController.deleteRole);

module.exports = router;

