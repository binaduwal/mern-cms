const Page = require('../models/pages');

exports.createPage = async (req, res) => {
  try {
    const { title, content, status, parent, image } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const imageName = image? path.basename(image)  
    : null;
    
    const newPage = new Page({
      title,
      slug,
      content,
      status,
      parent: parent || null,
      image:imageName
    });

    await newPage.save();
    res.status(201).json(newPage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find().populate('parent', 'title');
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const { title, content, status, parent,image } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const imageName = image ? path.basename(image) : null;

    const updatedPage = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title,
        slug,
        content,
        status,
        parent: parent === 'None' ? null : parent,
        image:imageName,
      },
      { new: true }
    );

    if (!updatedPage) return res.status(404).json({ message: 'Page not found' });
    res.json({ message: 'Page updated successfully', page: updatedPage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fs = require('fs');
const path = require('path');

exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ message: 'Page not found' });

    if (page.image) {
      const imagePath = path.join(__dirname, '../uploads', path.basename(page.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const imageRegex = /<img[^>]+src="http:\/\/localhost:3000\/uploads\/([^">]+)"/g;
    let match;
    while ((match = imageRegex.exec(page.content)) !== null) {
      const filename = match[1];
      const filePath = path.join(__dirname, '../uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Page.deleteOne({ slug: req.params.slug });
    res.json({ message: 'Page and associated files deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
