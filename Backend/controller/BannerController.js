const Banner = require('../models/BannerModel');

exports.createBanner = async (req, res) => {
  try {
    console.log('--- Create Banner Request ---');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const { heading, paragraph, alt, btnText, btnLink } = req.body;

    // validate
    const missing = [];
    if (!heading)   missing.push('heading');
    if (!paragraph) missing.push('paragraph');
    if (!req.file)  missing.push('image file');
    if (!alt)       missing.push('image alt');
    if (!btnText)   missing.push('button text');
    if (!btnLink)   missing.push('button link');

    if (missing.length) {
      return res.status(400).json({
        message: `Please provide all required fields. Missing: ${missing.join(', ')}`
      });
    }

const banner = await Banner.create({
      heading,
      paragraph,
      image: 
          { url: `/uploads/banners/${req.file.filename}`, alt },
      button: {
        text: btnText,
        link: btnLink,
      },
    });

    const createdBanner = await banner.save();
    res.status(201).json(banner);

  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({
      message: 'Server error while creating banner',
      error: error.message
    });
  }
};



exports.getAllBanners = async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache'); 
    res.setHeader('Expires', '0'); 
    const banners = await Banner.find({}).sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Server error while fetching banners', error: error.message });
  }
};

exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (banner) {
      res.json(banner);
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error) {
    console.error(`Error fetching banner with ID ${req.params.id}:`, error);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Banner not found (invalid ID format)' });
    }
    res.status(500).json({ message: 'Server error while fetching banner', error: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
  try {
    const { heading, paragraph, alt, btnText, btnLink } = req.body;
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    if (heading)   banner.heading   = heading;
    if (paragraph) banner.paragraph = paragraph;
    if (btnText)   banner.button.text = btnText;
    if (btnLink)   banner.button.link = btnLink;

    if (req.file) {
      banner.image = {
        url: `/uploads/banners/${req.file.filename}`,
        alt: alt || banner.image.alt
      };
    } else if (alt) {
      banner.image.alt = alt;
    }

    const updated = await banner.save();
    return res.json(updated);

  } catch (error) {
    console.error(`Error updating banner with ID ${req.params.id}:`, error);
    return res.status(500).json({
      message: 'Server error while updating banner',
      error: error.message
    });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (banner) {
      res.json({ message: 'Banner removed' });
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error) {
    console.error(`Error deleting banner with ID ${req.params.id}:`, error);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Banner not found (invalid ID format)' });
    }
    res.status(500).json({ message: 'Server error while deleting banner', error: error.message });
  }
};
