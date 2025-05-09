const Banner = require('../models/BannerModel');

 exports.createBanner = async (req, res) => {
  try {
    const { heading, paragraph, image, button } = req.body;

    if (!heading || !image || !image.url || !image.alt || !button || !button.text || !button.link) {
      return res.status(400).json({ message: 'Please provide all required fields: heading, image (url, alt), button (text, link)' });
    }

    const banner = new Banner({
      heading,
      paragraph, 
      image,
      button,
    });

    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ message: 'Server error while creating banner', error: error.message });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find({});
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
  try {
    const { heading, paragraph, image, button } = req.body;
    const banner = await Banner.findById(req.params.id);

    if (banner) {
      banner.heading = heading || banner.heading;
      banner.paragraph = paragraph || banner.paragraph; 
      banner.image = image || banner.image;
      banner.button = button || banner.button;

      const updatedBanner = await banner.save();
      res.json(updatedBanner);
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error)
  {
    console.error(`Error updating banner with ID ${req.params.id}:`, error);
     if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Banner not found (invalid ID format)' });
    }
    res.status(500).json({ message: 'Server error while updating banner', error: error.message });
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

