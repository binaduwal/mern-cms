const express = require('express');
const router = express.Router();
const pageController = require('../controller/pageController');
const upload=require('../middleware/upload')

router.post('/create', upload.single('image'), pageController.createPage);
router.get('/all', pageController.getAllPages);
router.get('/:slug', pageController.getPageBySlug);
router.put('/edit/:slug', pageController.updatePage);
router.delete('/delete/:slug', pageController.deletePage);
router.post('/upload', upload.single('image'), (req, res) => {
    res.json({ 
      imageUrl: `http://localhost:3000/uploads/${req.file.filename}`
    });
})
module.exports = router;
