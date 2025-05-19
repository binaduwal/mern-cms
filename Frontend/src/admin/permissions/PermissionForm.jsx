import React, { useState, useEffect } from "react"
import { useAddItemMutation, useUpdateItemMutation } from "../../app/services/QuerySettings"

const PermissionForm = ({ onClose, onSave ,initialData }) => {
const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    description: "",
  })
    const [message, setMessage] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)

  const [addPermission, { isLoading: isAdding }] = useAddItemMutation()
  const [updatePermission, { isLoading: isUpdating }] = useUpdateItemMutation()

    const isLoading = isAdding || isUpdating


    useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        name: initialData.name || "",
        display_name: initialData.display_name || "",
        description: initialData.description || "",
      })
      setIsEditMode(true); 
    }
    else{
    setFormData({ name: "", display_name: "", description: "" })
    setIsEditMode(false)
  }
  }, [initialData])


  const handleDisplayNameChange = (e) => {
    const updatedDisplayName = e.target.value
    setFormData((prevData) => ({
      ...prevData,
      display_name: updatedDisplayName,
      name:updatedDisplayName.replace(/\s+/g, "-").toLowerCase(),

    }))
  
  }


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
       result = await updatePermission({
            url:`/permissions/edit/${initialData._id}`,
            data:formData,
        }).unwrap()
        setMessage("Permission updated successfully!")
       }
       else{
       result = await addPermission({
            url:'/permissions/create',
            data:formData,
        }).unwrap()
        setMessage("Permission created successfully!")
       }

       if (onSave) {
        onSave(result); 
       }
        if (!isEditMode) {
            setFormData({ name: "", display_name: "", description: "" });
        }
    } catch(error) {
        console.error(`Error while ${isEditMode ? "updating" : "creating"} permission`, error);
      setMessage(error?.data?.error || error?.data?.message || `Failed to ${isEditMode ? "update" : "create"} permission.`)
    }
  }

  return (
    <div className="p-7 bg-transparent w-full max-w-md ">
      <h1 className="text-xl font-semibold text-left text-indigo-600 mb-4">
        {isEditMode ? "Edit Permission" : "Create New Permission"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        {message && (
  <p className={`${message.startsWith("Failed") || message.includes("Error") ? "text-red-500" : "text-green-500"} mb-2`}>{message}</p>
)}

          <label className="block text-gray-700 font-medium text-left">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleDisplayNameChange}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">
            Display Name
          </label>
          <input
            type="text"
            name="display_name"
            value={formData.display_name}
            onChange={handleDisplayNameChange}
            required
            placeholder="Readable name for permission"
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
            {isLoading ? "Submitting..." : (isEditMode ? "Update Permission" : "Create Permission")}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PermissionForm
