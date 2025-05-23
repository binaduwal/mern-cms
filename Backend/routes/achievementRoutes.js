const express = require('express');
const router = express.Router();

const achievementController = require('../controller/achievementController');

router.post('/create', achievementController.createAchievement);
router.get('/all', achievementController.getAllAchievements);
router.get('/:id', achievementController.getAchievementById);
router.patch('/edit/:id', achievementController.updateAchievement);
router.delete('/delete/:id', achievementController.deleteAchievement);

module.exports = router;
