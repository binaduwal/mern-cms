const express = require('express');
const router = express.Router();
const gameTypeController = require('../controller/gameTypeController');
const uploadGameTypeLogo = require('../middleware/gameTypeUpload');

router.post(
  '/create',
  uploadGameTypeLogo.single('logo'), 
  gameTypeController.createGameType
);

router.get('/all', gameTypeController.getAllGameTypes);
router.get('/:id', gameTypeController.getGameTypeById);
router.patch('/edit/:id', uploadGameTypeLogo.single('logo'), gameTypeController.updateGameType);
router.delete('/delete/:id', gameTypeController.deleteGameType);

module.exports = router;