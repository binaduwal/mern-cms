const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
  
// Get all menu items
router.get('/all', async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate('parent')
      .sort({ order: 1 });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { items } = req.body;
    
    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }

    // Add new items with proper ordering
    const newItems = items.map((item, index) => ({
      ...item,
      order: index + 1, // Start from 1 for each new batch
      parent: item.parent || null
    }));

    // Validate each item
    for (const item of newItems) {
      if (item.parent) {
        const parentExists = await Menu.findById(item.parent);
        if (!parentExists) {
          return res.status(400).json({ message: `Parent menu item ${item.parent} not found` });
        }
      }
    }

    // First, create the menu items with proper relationships
    const createdItems = await Menu.insertMany(newItems);
    
    // Update parent relationships
    for (const item of createdItems) {
      if (item.parent) {
        const parentItem = await Menu.findById(item.parent);
        if (parentItem) {
          parentItem.children.push(item._id);
          await parentItem.save();
        }
      }
    }

    // Refresh and reorder all items
    const allItems = await Menu.find()
      .populate('parent')
      .sort({ order: 1 });
    
    // Update order numbers
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].order !== i + 1) {
        allItems[i].order = i + 1;
        await allItems[i].save();
      }
    }

    // Return all menu items in the response
    res.json({ 
      message: 'Menu items added successfully',
      items: allItems
    });
  } catch (err) {
    console.error('Error adding menu items:', err);
    res.status(500).json({ 
      message: 'Failed to add menu items', 
      error: err.message 
    });
  }
}
);

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { parent, order } = req.body;
    
    // Validate parent exists if provided
    if (parent) {
      const parentExists = await Menu.findById(parent);
      if (!parentExists) {
        return res.status(400).json({ message: 'Parent menu item not found' });
      }
    }
    
    // Find and update the menu item
    const menuItem = await Menu.findByIdAndUpdate(
      id,
      { 
        parent: parent || null,
        order
      },
      { new: true }
    );

    // Update parent relationships
    if (parent) {
      const parentItem = await Menu.findById(parent);
      if (parentItem) {
        parentItem.children = await Menu.find({ parent: parentItem._id });
        await parentItem.save();
      }
    } else {
      // If parent is null, remove it from any parent's children array
      const oldParent = await Menu.findOne({ 'children._id': id });
      if (oldParent) {
        oldParent.children = oldParent.children.filter(child => child._id.toString() !== id);
        await oldParent.save();
      }
    }

    // Refresh all menu items to ensure proper ordering
    const allItems = await Menu.find().sort({ order: 1 });
    
    // Update order numbers to ensure they're sequential
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].order !== i + 1) {
        allItems[i].order = i + 1;
        await allItems[i].save();
      }
    }

    res.json({ message: 'Menu item updated successfully', menuItem });
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { type } = req.query;
    const { id } = req.params;
    
    // Validate input
    if (!type) {
      return res.status(400).json({ message: 'Type parameter is required' });
    }

    // Delete the specific menu item
    const deleteResult = await Menu.deleteOne({ _id: id, type });
    
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Reorder remaining items
    const remainingItems = await Menu.find({ type }).sort({ order: 1 });
    for (let i = 0; i < remainingItems.length; i++) {
      if (remainingItems[i].order !== i + 1) {
        remainingItems[i].order = i + 1;
        await remainingItems[i].save();
      }
    }
    
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(500).json({ 
      message: 'Failed to delete menu item', 
      error: err.message 
    });
  }
});

router.put('/order', async (req, res) => {
  try {
    const { itemId, newOrder, type } = req.body;
    
    // Get all items of this type
    const items = await Menu.find({ type }).sort({ order: 1 });
    
    // Find the item to move
    const itemIndex = items.findIndex(item => item._id.toString() === itemId);
    const item = items[itemIndex];
    
    // Remove the item from its current position
    items.splice(itemIndex, 1);
    
    // Insert at new position
    items.splice(newOrder - 1, 0, item);
    
    // Update orders
    for (let i = 0; i < items.length; i++) {
      items[i].order = i + 1;
      await items[i].save();
    }
    
    // Update parent relationships
    if (item.parent) {
      const parentItem = await Menu.findById(item.parent);
      if (parentItem) {
        parentItem.children = await Menu.find({ parent: parentItem._id });
        await parentItem.save();
      }
    }
    
    res.json({ message: 'Menu order updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;



