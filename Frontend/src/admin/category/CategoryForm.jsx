import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RxCrossCircled } from "react-icons/rx";

const CategoryForm = ({ onClose,onCategoryAdded,categoryToEdit=null
  
}) => { 
  const [formData, setFormData] = useState({
    categoryName: '',
    status: false,
    slug: '',
    description: '',
    parent:''
  });
  const [categories,setCategories]=useState([])



useEffect(()=>{
  axios.get('http://localhost:3000/categories/all')
  .then(res=>setCategories(res.data))
  .catch(err=>console.error('Failed to fetch categories',err))
},[])

useEffect(()=>{
  if(categoryToEdit){
    setFormData({
      categoryName:categoryToEdit.category_name,
      status: categoryToEdit.status === 'active',
      slug: categoryToEdit.slug,
      description: categoryToEdit.description,
      parent: categoryToEdit.parent?._id || ''    })
  }
},[categoryToEdit])
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      category_name: formData.categoryName,
      status: formData.status ? 'active' : 'inactive',
      slug:formData.slug,
      description: formData.description,
      parent: formData.parent || null
    };

    try {
      if (categoryToEdit) {
        // edit mode
        await axios.put(
          `http://localhost:3000/categories/edit/${categoryToEdit._id}`,
          payload
        );
        alert('Category updated!');
      }
       else {
        //create mode
      await axios.post('http://localhost:3000/categories/create', payload);
      alert('Category created successfully!');
       }
      onClose(); 
      onCategoryAdded();
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white relative ">
      <button
        onClick={onClose} 
        className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700 bg-transparent"
      >
      <RxCrossCircled />
</button>

      <h2 className="text-lg font-semibold mb-4">
      {categoryToEdit ? 'Edit Category' : 'Create New Category'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-medium text-left">Name</label>
          <input
            type="text"
            name="category_name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
            value={formData.categoryName}
            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-left">Slug</label>
          <input
            type="text"
            name="slug"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
            value={formData.slug}
            onChange={e =>
              {
                const sanitized=e.target.value.replace(/\s+/g,'-')
                setFormData({ ...formData, slug: sanitized })
              } }
                
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-left">Descrition</label>
          <input
            type="text"
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-left">Parent</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
            value={formData.parent|| ''}
            onChange={(e)=>setFormData({...formData,parent:e.target.value})}
            >
<option value="">
  None
</option>
{categories.map(cat=>(
  <option key={cat._id} value={cat._id}>
    {cat.category_name}
  </option>
))}
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="status"
            name="status"
            className="mr-2"
            checked={formData.status}
            onChange={(e) =>setFormData({...formData,status:e.target.checked})}
          />
          <label htmlFor="status" className="text-gray-700 font-medium">
            Active
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
        >
          {categoryToEdit ? 'Update' : 'Create'}
          </button>
      </form>
    </div>
  );
};

export default CategoryForm;
