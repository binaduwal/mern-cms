import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IoIosArrowDown } from 'react-icons/io';
import { ReactSortable  } from 'react-sortablejs';

export default function AddMenuItems() {
  const [pages, setPages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(null);


  const catRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3000/pages/all')
      .then(res => setPages(res.data))
      .catch(console.error);
    axios.get('http://localhost:3000/categories/all')
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, []);

  const parents = categories.filter(c => !c.parent);
  const childrenByParent = categories.reduce((acc, c) => {
    if (c.parent) {
      const pid = c.parent._id;
      (acc[pid] = acc[pid] || []).push(c);
    }
    return acc;
  }, {});

  const controlClasses = "w-full border border-gray-300 rounded px-3 py-2 text-base text-gray-700 bg-white";

  const togglePage = (page) => {
    setSelectedPages(prev =>
      prev.some(p => p._id === page._id)
        ? prev.filter(p => p._id !== page._id)
        : [...prev, page]
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCats(prev =>
      prev.some(c => c._id === cat._id)
        ? prev.filter(c => c._id !== cat._id)
        : [...prev, cat]
    );
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

  const handleAddToMenu = (items, type) => {
    const newItems=items.map(item=>({...item,type}));

    const filteredItems=newItems.filter(item=>
      !menuItems.some(existingItem=>existingItem._id===item._id)
    )
    setMenuItems(prev=>[...prev,...filteredItems])

    if(type==='pages') setSelectedPages([]);
    if(type==='categories') setSelectedCats([]);
  };

  return (
    <div className="flex justify-between p-4">
      {/* Left panel */}
      <div className="w-1/3 bg-white p-4 shadow-sm">
        <h4 className="text-lg mb-4">Add Menu Items</h4>

        {/* Pages dropdown */}
        <label className="block mb-1 text-sm  font-medium">Pages</label>
        <div className="relative mb-6" ref={pageRef}>
          <button
            className={`${controlClasses} flex justify-between items-center`}
            onClick={() =>
{               setIsPageOpen(prev => !prev)
               setActiveTab('pages')
               setIsCatOpen(false)
}              }
          >
            Select Pages
            <IoIosArrowDown className={`ml-2 transform transition-transform ${isPageOpen ? 'rotate-180' : ''}`} />
          </button>

          {isPageOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto z-20">
              <div className="px-3 py-2 border-b">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPages.length === pages.length}
                    onChange={handleSelectAllPages}
                  />
                  <span>Select All</span>
                </label>
              </div>

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

              <div className="px-3 py-2 border-t">
                <button
                  onClick={() => handleAddToMenu(selectedPages, 'pages')}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-1 rounded"
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
            onClick={() => 
            {
              setIsCatOpen(prev => !prev)
              setActiveTab('categories')

            }
             }
          >
            Select Categories
            <IoIosArrowDown className={`ml-2 transform transition-transform ${isCatOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCatOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto z-20">
              <div className="px-3 py-2 border-b">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    onChange={handleSelectAllCategories}
                    checked={selectedCats.length === parents.length + Object.values(childrenByParent).flat().length}
                  />
                  <span>Select All</span>
                </label>
              </div>

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

              <div className="px-3 py-2 border-t">
                <button
                  onClick={() => handleAddToMenu(selectedCats, 'categories')}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-1 rounded"
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
<ReactSortable 
  tag="ul"
  list={activeTab === 'pages' ? menuItems.filter(item => item.type === 'pages') : menuItems.filter(item => item.type === 'categories')}
  setList={(newList) => {
    const updatedList = menuItems.filter(item => item.type !== activeTab).concat(newList);
    setMenuItems(updatedList);
  }}
  filter=".addImageButtonContainer"
  animation="200"
  dragClass="sortableDrag"
  easing="ease-out"
  className="space-y-2"
>
  {activeTab === 'pages' 
    ? menuItems.filter(item => item.type === 'pages').map((item, index) => (
        <li key={index} className="flex w-[300px] justify-between items-center p-2 border rounded bg-gray-50">
          {/* Render Pages */}
          <div className="w-full cursor-pointer" onClick={() => setOpenItemIndex(openItemIndex === index ? null : index)}>
            {item.title}
            {openItemIndex === index && (
              <div className="p-4 bg-white border-t space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Navigation Label</label>
                  <p className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm">{item.title}</p>
                </div>
                {/* Add more settings for pages */}
              </div>
            )}
          </div>
        </li>
      ))
    : menuItems.filter(item => item.type === 'categories').map((item, index) => (
        <li key={index} className="flex w-[300px] justify-between items-center p-2 border rounded bg-gray-50">
          {/* Render Categories */}
          <div className="w-full cursor-pointer" onClick={() => setOpenItemIndex(openItemIndex === index ? null : index)}>
            {item.category_name}
            {openItemIndex === index && (
              <div className="p-4 bg-white border-t space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Navigation Label</label>
                  <p className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm">{item.category_name}</p>
                </div>
                {/* Add more settings for categories */}
              </div>
            )}
          </div>
        </li>
      ))}
</ReactSortable>
        </div>
      </div>
    </div>
  );
}
