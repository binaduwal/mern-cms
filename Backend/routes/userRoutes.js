const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/all', userController.getAllUsers);          
router.get('/:id', userController.getUserById);       
router.put('/edit/:id', userController.updateUser);       
router.delete('/delete/:id', userController.deleteUser);     

module.exports = router;
