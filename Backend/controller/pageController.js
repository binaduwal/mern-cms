const Page = require('../models/pagesModel');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');


exports.createPage = async (req, res) => {
  try {
    let { title, content, status, parent, image } = req.body;    const slug = title.toLowerCase().replace(/\s+/g, '-');
    
    content = await processEmbeddedImages(content);
    const imageName = image ? path.basename(image) : null;

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

async function processEmbeddedImages(content) {
  if (!content) return content;
  
  const imageRegex = /<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"/g;
  let match;
  let processedContent = content;
  
  while ((match = imageRegex.exec(content)) !== null) {
    const base64Data = match[2];
    const fileBuffer = Buffer.from(base64Data, 'base64');
    const imageType = match[1];
    
    const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
    const filename = `${hash}.${imageType}`;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, fileBuffer);
    }
    
    const imageUrl = `http://localhost:3000/uploads/${filename}`;
    processedContent = processedContent.replace(match[0], `<img src="${imageUrl}"`);
  }
  
  return processedContent;
}

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
    let { title, content, status, parent, image } = req.body;    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const imageName = image ? path.basename(image) : null;
    content = await processEmbeddedImages(content);

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
