import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from './CategoryForm';
import { FaEdit, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import ConfirmationModal from '../../reusables/ConfirmationModal'
import SearchBar from '../../reusables/SearchBar';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading,setLoading]=useState(true)
  const [editingCategory, setEditing] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});



  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    finally{
      setLoading(false)
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);


    const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCloseForm = () => {
    setShowForm(false); 
  };

  const handleDelete = () => {
    if (!deleteData) return;
  
    axios.delete(`http://localhost:3000/categories/delete/${deleteData}`)
      .then(() => {
        setShowDeleteConfirmation(false);
        setDeleteData(null);
        fetchCategories(); 
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };


  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setShowForm(true);
  };
  
  
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };


  // Get children of a category
  const getCategoryChildren = (categoryId) => {
    return categories.filter(category => 
      category.parent && category.parent._id === categoryId
    );
  };

  const getFilteredCategories = () => {
    if (searchTerm) {
      return categories.filter(category => 
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return categories.filter(category => !category.parent);
    }
  };

  const renderCategoryRow = (category, level = 0) => {
    console.log("Rendering category:", category);
    const isExpanded = expandedCategories[category._id];
    const childCategories = getCategoryChildren(category._id);
    const hasChildCategories = childCategories.length > 0;

    return (
      <React.Fragment key={category._id}>
        <tr className="border-t">
          <td className="px-4 py-3">
            <div className="flex items-center">
              {hasChildCategories && (
                <button 
                  onClick={() => toggleCategory(category._id)}
                  className="mr-2 text-gray-500 focus:outline-none bg-transparent"
                >
                  {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                </button>
              )}
              <div 
                className="text-sm text-gray-600 truncate"
                style={{ marginLeft: level > 0 ? `${level * 20}px` : '0' }}
              >
                {category.category_name}
              </div>
            </div>
          </td>
          <td className="px-4 py-3">
            <span className="text-sm text-gray-700">
              {category.slug}
            </span>
          </td>
          <td className="px-4 py-3">
            <span className="text-sm text-gray-700">
              {category.status}
            </span>
          </td>
          <td className="px-4 py-3">
            <span className="text-sm text-gray-700">
              {category.description}
            </span>
          </td>
          <td className="px-4 py-3 text-gray-600 flex gap-3 items-center">
            <button
              onClick={() => openEdit(category)}
              className="text-gray-600 hover:text-blue-600 bg-transparent"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => {
                setDeleteData(category._id);
                setShowDeleteConfirmation(true);
              }}
              className="bg-transparent text-gray-700 hover:text-red-700 font-bold py-1 px-3 rounded text-xl"
              title="Delete"
            >
              <AiOutlineDelete />
            </button>
          </td>
        </tr>
        
        {isExpanded && hasChildCategories && childCategories.map(child => renderCategoryRow(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-xl mb-4">Categories</h2>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <button
        onClick={openCreate} 
         className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
        >
          Add Category
        </button>

        </div>
      </div>

      {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white p-6 rounded-2xl w-full max-w-xl">
      <CategoryForm onClose={handleCloseForm} onCategoryAdded={fetchCategories} />
    </div>
  </div>
)}
{showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white p-6 rounded-2xl w-full max-w-xl">
      <CategoryForm
        categoryToEdit={editingCategory}
        onClose={handleCloseForm}
        onCategoryAdded={fetchCategories}
      />
    </div>
  </div>
)}


      <div>

        {loading?(
          <div className="text-gray-500 text-center py-10">
          Loading categories...
        </div>
        ):(
        <table className="w-full table-auto bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Category Name</th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Slug</th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Description</th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
          {getFilteredCategories().length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-6">
                  No matching results found.
                </td>
              </tr>
            ) : (
              getFilteredCategories().map(category => renderCategoryRow(category))
            )}
          </tbody>
        </table>
        )}

        <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this page"
      />
      </div>
    </div>
  );
};

export default CategoryTable;
