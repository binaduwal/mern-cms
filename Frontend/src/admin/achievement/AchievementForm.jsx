import React, { useState, useEffect } from "react"
import { useAddItemMutation, useUpdateItemMutation } from "../../app/services/QuerySettings"

const AchievementForm = ({ onClose, onSave ,initialData }) => {
const [formData, setFormData] = useState({
    number: "",
    description: "",
  })
    const [message, setMessage] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)

  const [addData, { isLoading: isAdding }] = useAddItemMutation()
  const [updateData, { isLoading: isUpdating }] = useUpdateItemMutation()

    const isLoading = isAdding || isUpdating


    useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        number: initialData.number || "",
        description: initialData.description || "",
      })
      setIsEditMode(true); 
    }
    else{
    setFormData({ number: "", description: "" })
    setIsEditMode(false)
  }
  }, [initialData])


  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData((prev)=>({...prev,[name]:value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    try {
        let result;
       if(isEditMode){
       result = await updateData({
            url:`/achievements/edit/${initialData._id}`,
            data:formData,
        }).unwrap()
        setMessage("Data updated successfully!")
       }
       else{
       result = await addData({
            url:'/achievements/create',
            data:formData,
        }).unwrap()
        setMessage("Data created successfully!")
       }

       if (onSave) {
        onSave(result); 
       }
    } catch(error) {
        console.error(`Error while ${isEditMode ? "updating" : "creating"} permission`, error);
      setMessage(error?.data?.error || error?.data?.message || `Failed to ${isEditMode ? "update" : "create"} permission.`)
    }
  }

  return (
    <div className="p-4 bg-transparent w-full max-w-md ">
      <h1 className="text-xl font-semibold text-left text-indigo-600 mb-4">
        {isEditMode ? "Edit Achievements" : "Create New Achievements"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {message && (
            <p
              className={`${
                message.startsWith("Failed") || message.includes("Error")
                  ? "text-red-500"
                  : "text-blue-500"
              } mb-2`}
            >
              {message}
            </p>
          )}

          <label className="block text-gray-700 font-medium text-left">
            Number
          </label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-200 bg-transparent"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {isLoading
              ? "Submitting..."
              : isEditMode
              ? "Update Achievements"
              : "Create Achievements"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AchievementForm
