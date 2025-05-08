const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
  try {
    const { category_name, slug, description, status, parent } = req.body;
    const newCategory = new Category({
      category_name,
      slug,
      description,
      status,
      parent: parent || null,
    });
    
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    .sort({ createdAt: -1 })
    .populate('parent','category_name')
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    .populate('parent','category_name');
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { category_name, slug, description, status, parent } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { category_name, slug, description, status, parent: parent || null },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
