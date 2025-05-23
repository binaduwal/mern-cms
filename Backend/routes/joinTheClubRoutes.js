const express = require('express');
const router = express.Router();
const joinTheClubController = require('../controller/joinTheClubController');

router.get('/all', joinTheClubController.getAll);         
router.get('/:id', joinTheClubController.getById);      
router.post('/create', joinTheClubController.create);         
router.patch('/edit/:id', joinTheClubController.update);       
router.delete('/delete/:id', joinTheClubController.delete);    

module.exports = router;
