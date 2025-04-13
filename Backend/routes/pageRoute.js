const express = require('express');
const Page = require('../models/pages');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { title, content, status,parent} = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const newPage = new Page({ title, slug, content,status, parent });
    await newPage.save();
    res.status(201).json(newPage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/edit/:slug', async (req, res) => {
  try {
    const { title, content, status, parent } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const updatedPage = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { title, slug, content,status, parent },
      { new: true }
    );
    if (!updatedPage) return res.status(404).json({ message: 'Page not found' });
    res.json(updatedPage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:slug', async (req, res) => {
  try {
    const deletedPage = await Page.findOneAndDelete({ slug: req.params.slug });
    if (!deletedPage) return res.status(404).json({ message: 'Page not found' });
    res.json({ message: 'Page deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
