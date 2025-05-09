import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IoIosArrowDown } from 'react-icons/io';
import { useAddItemMutation } from '../../app/services/QuerySettings';

export default function AddMenuItems() {
  const [addItem, { isLoading, isError, error }] = useAddItemMutation();
  const [pages, setPages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customLinkText, setCustomLinkText] = useState('');
  const [isCustomLinkOpen, setIsCustomLinkOpen] = useState(false);

  const catRef = useRef(null);
  const pageRef = useRef(null);

  // Debug logging to troubleshoot
  useEffect(() => {
    console.log('Current menu items:', menuItems);
  }, [menuItems]); 

  useEffect(() => {
    axios.get('http://localhost:3000/pages/all')
      .then(res => setPages(res.data))
      .catch(err => {
        console.error('Error fetching pages:', err);
      });
    axios.get('http://localhost:3000/categories/all')
      .then(res => setCategories(res.data))
      .catch(err => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/menu/all');
        console.log('Fetched menu items:', response.data);
        setMenuItems(response.data);
      } catch (err) {
        console.error('Error fetching menu items:', err);
      }
    };
    fetchMenuItems();
  }, []);

  const parents = categories.filter(c => !c.parent);
  const childrenByParent = categories.reduce((acc, c) => {
    if (c.parent) {
      const pid = c.parent._id || (typeof c.parent === 'string' ? c.parent : null);
      if (pid) {
        (acc[pid] = acc[pid] || []).push(c);
      }
    }
    return acc;
  }, {});

  // Function to organize menu items into a hierarchical structure
  const organizeMenuItems = (items) => {
    // First, get all top-level items 
    const topLevel = items.filter(item => !item.parent || item.parent === null);
    
    // Create a map of children by parent ID
    const childrenMap = {};
    items.forEach(item => {
      if (item.parent) {
        const parentId = typeof item.parent === 'string' ? item.parent : item.parent._id;
        if (!childrenMap[parentId]) {
          childrenMap[parentId] = [];
        }
        childrenMap[parentId].push(item);
      }
    });
    
    // Sort all items by their order
    topLevel.sort((a, b) => a.order - b.order);
    Object.values(childrenMap).forEach(children => {
      children.sort((a, b) => a.order - b.order);
    });
    
    return { topLevel, childrenMap };
  };

  const controlClasses = "w-full border border-gray-300 rounded px-3 py-2 text-base text-gray-700 bg-white";

  const togglePage = (page) => {
    setSelectedPages(prev =>
      prev.some(p => p._id === page._id)
        ? prev.filter(p => p._id !== page._id)
        : [...prev, page]
    );
    setActiveTab('pages');
  };

  const toggleCategory = (cat) => {
    setSelectedCats(prev =>
      prev.some(c => c._id === cat._id)
        ? prev.filter(c => c._id !== cat._id)
        : [...prev, cat]
    );
    setActiveTab('categories');
  };

  const isPageSelected = (id) => selectedPages.some(p => p._id === id);
  const isCatSelected = (id) => selectedCats.some(c => c._id === id);

  const handleSelectAllPages = () => {
    setSelectedPages(pages.length === selectedPages.length ? [] : pages);
  };

  const handleSelectAllCategories = () => {
    const allCats = [...parents, ...Object.values(childrenByParent).flat()];
    setSelectedCats(selectedCats.length === allCats.length ? [] : allCats);
  };

  const handleAddToMenu = async (items, type) => {
    try {
      if (!Array.isArray(items) || items.length === 0) {
        alert("Please select at least one item");
        return;
      }
  
      const newItems = items.map((item, index) => ({
        title: type === "categories" ? item.category_name : item.title,
        type: type,
        order: menuItems.length + index + 1,
        parent: null,
        status: "active",
        ...(type === "categories" && {
          categoryId: item._id,
          slug: item.slug || "",
        }),
        ...(type === "pages" && {
          pageId: item._id,
          slug: item.slug || "",
        }),
        ...(type === "custom" && {
          url: item.url || "",
        }),
      }));
  
      const res = await addItem({
        url: "/menu/add", // Your backend route
        data: {
          items: newItems,
          type: type,
        },
      }).unwrap(); // unwrap throws errors you can catch
  
      if (res.message === "Menu items added successfully") {
        setMenuItems(() =>
          [...res.items].sort((a, b) => a.order - b.order)
        );
  
        if (type === "pages") setSelectedPages([]);
        else if (type === "categories") setSelectedCats([]);
  
        setActiveTab(type);
      } else {
        throw new Error("Failed to add menu items");
      }
    } catch (err) {
      console.error("Error adding menu items:", err);
      alert(err.message || "Failed to add menu items. Check console.");
    }
  };
  
              
  const handleDelete = async (itemId) => {
    try {
      console.log('Attempting to delete menu item with ID:', itemId);
      
      // First check if the item exists in our state
      const itemExists = menuItems.some(item => item._id === itemId);
      console.log('Item exists in state:', itemExists);
      
      // Find the item to get its type
      const item = menuItems.find(item => item._id === itemId);
      if (!item) {
        throw new Error('Item not found in state');
      }

      // Delete the item with type
      const response = await axios.delete(`http://localhost:3000/menu/delete/${itemId}`, {
        params: { type: item.type }
      });
      console.log('Delete response:', response.data);

      // Update local state first for better UX
      setMenuItems(prev => prev.filter(item => item._id !== itemId));

      // Refresh menu items from server to ensure consistency
      const updatedItems = await axios.get('http://localhost:3000/menu/all');
      console.log('Updated menu items count:', updatedItems.data.length);
      setMenuItems(updatedItems.data);
    } catch (err) {
      console.error('Error deleting menu item:', err);
      console.error('Error details:', err.response?.data);
      alert('Failed to delete menu item. Check console for details.');
    }
  };

  const handleParentChange = async (itemId, parentId) => {
    try {
      const parent = parentId === '' ? null : parentId;

      await axios.put(`http://localhost:3000/menu/update/${itemId}`, {
        parent: parent,
        order: menuItems.find(item => item._id === itemId)?.order
      });

      const response = await axios.get('http://localhost:3000/menu/all');
      setMenuItems(response.data);
    } catch (err) {
      console.error('Error updating parent:', err);
      alert('Failed to update parent');
    }
  };

  const handleOrderChange = async (itemId, newOrder) => {
    try {
      await axios.put('http://localhost:3000/menu/order', {
        itemId,
        newOrder,
        type: menuItems.find(item => item._id === itemId)?.type || activeTab
      });

      const response = await axios.get('http://localhost:3000/menu/all');
      setMenuItems(response.data);
    } catch (err) {
      console.error('Error updating menu order:', err);
      alert('Failed to update menu order');
    }
  };

  const handleAddCustomLink = async () => {
    try {
      if (!customUrl || !customLinkText) {
        alert('Please fill both URL and Link Text fields');
        return;
      }

      const newItem = {
        title: customLinkText,
        url: customUrl,
        type: 'custom',
        order: menuItems.filter(item => item.type === 'custom').length + 1,
        status: 'active'
      };

      console.log('Adding custom link:', newItem);

      await handleAddToMenu([newItem], 'custom');

      setCustomUrl('');
      setCustomLinkText('');
    } catch (err) {
      console.error('Error adding custom link:', err);
      alert(err.response?.data?.message || 'Failed to add custom link');
    }
  };

  const getParentId = (item) => {
    if (!item.parent) return '';
    return typeof item.parent === 'string' ? item.parent : item.parent._id;
  };

  // Recursive function to render menu items
  const renderMenuItem = (item, childrenMap, level = 0) => {
    const isOpen = openItemIndex === item._id;
    const children = childrenMap[item._id] || [];
    
    return (
      <React.Fragment key={item._id}>
        <li className={`flex w-full justify-between items-center p-2 border rounded bg-gray-50 ${level > 0 ? 'ml-6' : ''}`}>
          <div className="w-full cursor-pointer" 
            onClick={(e) => {
              if (!e.target.closest('select')) {
                e.stopPropagation();
                setOpenItemIndex(isOpen ? null : item._id);
              }
            }}>
            {item.title}
            {isOpen && (
              <div className="p-4 bg-white border-t space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Navigation Label</label>
                  <p className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm">{item.title}</p>
                </div>
                <div className='col-span-2 grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className="block text-sm font-medium text-gray-700">Menu Parent</label>
                    <select 
                      value={getParentId(item)}
                      onChange={(e) => handleParentChange(item._id, e.target.value)}
                      className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm"
                    >
                      <option value="">Select Parent</option>
                      {menuItems
                        .filter(menuItem => 
                          menuItem._id !== item._id &&
                          !isDescendantOf(menuItem._id, item._id, menuItems)
                        )
                        .map(menuItem => (
                          <option 
                            key={menuItem._id} 
                            value={menuItem._id}
                          >
                            {menuItem.title || menuItem.category_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className='space-y-2'>
                    <label className="block text-sm font-medium text-gray-700">Menu order</label>
                    <select
                      value={item.order}
                      onChange={(e) => {
                        handleOrderChange(item._id, parseInt(e.target.value));
                      }}
                      className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm"
                    >
                      {Array.from({ length: menuItems.length }, (_, i) => (
                        <option 
                          key={i + 1} 
                          value={i + 1}
                        >
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                    className='text-red-500 hover:underline px-2 bg-transparent'
                  >
                    Remove
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenItemIndex(null);
                    }}
                    className='text-gray-500 hover:underline px-2 bg-transparent'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Save changes
                      const menuItem = {
                        ...item,
                        parent: getParentId(item) || null,
                        order: item.order
                      };
                      axios.put(`http://localhost:3000/menu/update/${item._id}`, {
                        parent: menuItem.parent,
                        order: menuItem.order
                      }).then(() => {
                        // Refresh menu items
                        axios.get('http://localhost:3000/menu/all')
                          .then(response => setMenuItems(response.data))
                          .catch(console.error);
                      }).catch(console.error);
                      setOpenItemIndex(null);
                    }}
                    className='bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600'
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </li>
        {children.map(child => renderMenuItem(child, childrenMap, level + 1))}
      </React.Fragment>
    );
  };

  const isDescendantOf = (itemId, potentialAncestorId, items) => {
    if (itemId === potentialAncestorId) return true;
    
    const item = items.find(i => i._id === itemId);
    if (!item || !item.parent) return false;
    
    const parentId = typeof item.parent === 'string' ? item.parent : item.parent._id;
    return isDescendantOf(parentId, potentialAncestorId, items);
  };

  // Organize menu items for rendering
  const organizedItems = organizeMenuItems(menuItems);

  return (
    <div className="flex justify-between p-4">
      {/* Left panel */}
      <div className="w-1/3 bg-white p-4 shadow-sm">
        <h4 className="text-lg mb-4">Add Menu Items</h4>

        {/* Pages dropdown */}
        <label className="block mb-1 text-sm font-medium">Pages</label>
        <div className="relative mb-6" ref={pageRef}>
          <button
            className={`${controlClasses} flex justify-between items-center`}
            onClick={() => {
              setIsPageOpen(prev => !prev);
              setActiveTab('pages');
              setIsCatOpen(false);
              setIsCustomLinkOpen(false);
            }}
          >
            Select Pages
            <IoIosArrowDown className={`ml-2 transform transition-transform ${isPageOpen ? 'rotate-180' : ''}`} />
          </button>

          {isPageOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto z-20">
              {/* Parent Pages */}
              {pages.map(page => (
                <div
                  key={page._id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => togglePage(page)}
                >
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isPageSelected(page._id)}
                      onChange={() => togglePage(page)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>{page.title}</span>
                  </label>
                </div>
              ))}

              <div className="px-3 py-2 border-t col-span-2 grid grid-cols-2">
                <div className="px-3 py-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedPages.length === pages.length}
                      onChange={handleSelectAllPages}
                    />
                    <span>Select All</span>
                  </label>
                </div>

                <button
                  onClick={() => {
                    handleAddToMenu(selectedPages, 'pages');
                    setIsPageOpen(false);
                  }}
                  className="w-full bg-transparent text-gray-800 border border-gray-300 hover:bg-indigo-400 py-1 rounded"
                >
                  Add to Menu
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Categories dropdown */}
        <label className="block mb-1 text-sm font-medium">Categories</label>
        <div className="relative" ref={catRef}>
          <button
            className={`${controlClasses} flex justify-between items-center`}
            onClick={() => {
              setIsCatOpen(prev => !prev);
              setActiveTab('categories');
              setIsPageOpen(false);
              setIsCustomLinkOpen(false);
            }}
          >
            Select Categories
            <IoIosArrowDown className={`ml-2 transform transition-transform ${isCatOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCatOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-80 overflow-y-auto z-50">
              {parents.map(parent => (
                <div key={parent._id}>
                  <div
                    onClick={() => setHoveredParent(prev => prev === parent._id ? null : parent._id)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isCatSelected(parent._id)}
                        onChange={() => toggleCategory(parent)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span>{parent.category_name}</span>
                    </label>
                    {childrenByParent[parent._id] && (
                      <IoIosArrowDown className="text-gray-400 text-sm" />
                    )}
                  </div>

                  {hoveredParent === parent._id &&
                    (childrenByParent[parent._id] || []).map(child => (
                      <div
                        key={child._id}
                        className="px-8 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(child);
                        }}
                      >
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={isCatSelected(child._id)}
                            onChange={() => toggleCategory(child)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span>{child.category_name}</span>
                        </label>
                      </div>
                    ))}
                </div>
              ))}

              <div className="px-3 py-2 border-t col-span-2 grid grid-cols-2">
                <div className="px-3 py-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      onChange={handleSelectAllCategories}
                      checked={selectedCats.length === parents.length + Object.values(childrenByParent).flat().length}
                    />
                    <span>Select All</span>
                  </label>
                </div>

                <button
                  onClick={() => {
                    handleAddToMenu(selectedCats, 'categories');
                    setIsCatOpen(false);
                  }}
                  className="w-full bg-transparent text-gray-800 border border-gray-300 hover:bg-indigo-600 py-1 rounded"
                >
                  Add to Menu
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative mt-4">
          <button
            className={`${controlClasses} flex justify-between items-center`}
            onClick={() => {
              setIsCustomLinkOpen(!isCustomLinkOpen);
              setIsPageOpen(false);
              setIsCatOpen(false);
            }}
          >
            Custom Link
            <IoIosArrowDown className={`ml-2 transform transition-transform ${isCustomLinkOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCustomLinkOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg p-4 z-20">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Text</label>
                  <input
                    type="text"
                    placeholder="Custom Link Name"
                    value={customLinkText}
                    onChange={(e) => setCustomLinkText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <button
                  onClick={() => {
                    handleAddCustomLink();
                    setIsCustomLinkOpen(false);
                  }}
                  className="w-full bg-transparent text-gray-800 border border-gray-300 hover:bg-indigo-400 py-1 rounded"
                >
                  Add to Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-2/3 bg-white p-4 shadow-sm">
        <h4 className="text-lg mb-2">Menu Structure</h4>
        <label className="mb-1 text-sm font-medium">Menu Name</label>
        <input
          type="text"
          placeholder="Enter here..."
          className={`${controlClasses} ml-4 w-1/2`}
        />

        <div className="mt-10">
          {menuItems.length === 0 ? (
            <p className="text-gray-500 italic">No menu items added yet.</p>
          ) : (
            <ul className="space-y-2 w-full">
              {/* Render all menu items in a single list */}
              {organizedItems.topLevel.map(item => 
                renderMenuItem(item, organizedItems.childrenMap)
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}