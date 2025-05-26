const CallToAction = require('../models/callToActionModel');

exports.createCTA = async (req, res) => {
  try {
    const { caption, title, description, buttonText, buttonUrl } = req.body;
    const cta = await CallToAction.create({
      caption, title, description, buttonText, buttonUrl
    });
    res.status(201).json({ message: 'CTA created', data: cta });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllCTAs = async (req, res) => {
  try {
    const list = await CallToAction.find().sort({ createdAt: -1 });
    res.status(200).json({ data: list });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getCTAById = async (req, res) => {
  try {
    const cta = await CallToAction.findById(req.params.id);
    if (!cta) return res.status(404).json({ message: 'CTA not found' });
    res.status(200).json({ data: cta });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateCTA = async (req, res) => {
  try {
    const updates = (({ caption, title, description, buttonText, buttonUrl }) => 
      ({ caption, title, description, buttonText, buttonUrl })
    )(req.body);

    const cta = await CallToAction.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!cta) return res.status(404).json({ message: 'CTA not found' });
    res.status(200).json({ message: 'CTA updated', data: cta });
  } catch (err) {
    console.error('updateCTA error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteCTA = async (req, res) => {
  try {
    const cta = await CallToAction.findByIdAndDelete(req.params.id);
    if (!cta) return res.status(404).json({ message: 'CTA not found' });
    res.status(200).json({ message: 'Call to action deleted' });
  } catch (err) {
    console.error('deleteCTA error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
