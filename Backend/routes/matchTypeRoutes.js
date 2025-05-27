const express = require('express');
const router = express.Router();
const matchController = require('../controller/matchTypeController');

router.post('/create', matchController.create);
router.get('/all', matchController.getAll);
router.get('/:id', matchController.getById);
router.patch('/edit/:id', matchController.update);
router.delete('/delete/:id', matchController.delete);

module.exports = router;
