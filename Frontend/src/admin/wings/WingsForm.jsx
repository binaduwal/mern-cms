import React, { useState,useEffect } from "react"
import { useAddItemMutation, useUpdateItemMutation } from "../../app/services/QuerySettings";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WingsForm = ({ initialData = {}, isEdit = false,onSave }) => {
 const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    logo: initialData?.logo || "",
    gallery: initialData?.gallery || [],
    coverImage: initialData?.coverImage || "",
  });
  const [message, setMessage] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)

  const [addData,] = useAddItemMutation()
  const [updateData,] = useUpdateItemMutation()


    useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
    title: initialData?.title || "",
    description: initialData?.description || "",
    logo: initialData?.logo || "",
    gallery: initialData?.gallery || [],
    coverImage: initialData?.coverImage || "",
      })
      setIsEditMode(true); 
    }
    else{
    setFormData({ title: "", description: "" ,icon: "" })
    setIsEditMode(false)
  }
  }, [initialData])



  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (files) {
      if (name === "gallery") {
        setFormData((prev) => ({ ...prev, gallery: [...files] }))
      } else {
        setFormData((prev) => ({ ...prev, [name]: files[0] }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    try {
        let result;
       if(isEditMode){
       result = await updateData({
            url:`/wings/edit/${initialData._id}`,
            data:formData,
        }).unwrap()
        setMessage("Data updated successfully!")
       }
       else{
       result = await addData({
            url:'/wings/create',
            data:formData,
        }).unwrap()
        setMessage("Data created successfully!")
       }

       if (onSave) {
        onSave(result); 
       }
    } catch(error) {
        console.error(`Error while ${isEditMode ? "updating" : "creating"} data`, error);
      setMessage(error?.data?.error || error?.data?.message || `Failed to ${isEditMode ? "update" : "create"} data.`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-6 bg-white rounded-lg ">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">
        {isEdit ? "Edit Wings" : "Create New Wings"}
      </h2>

      {message && <p className="mb-4 text-sm text-blue-500">{message}</p>}

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-indigo-500"
          required
        />
      </div>

      {/* <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-indigo-500"
          required
        ></textarea>
      </div> */}

      <div className="mb-4">
  <label className="block mb-1 text-gray-700 font-medium">Description</label>
  <ReactQuill
    value={formData.description}
    onChange={(value) =>
      setFormData((prev) => ({ ...prev, description: value }))
    }
    theme="snow"
    placeholder="Enter description here..."
  />
</div>


      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Logo</label>
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Cover Image</label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Gallery Images</label>
        <input
          type="file"
          name="gallery"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </form>
  )
}

export default WingsForm
