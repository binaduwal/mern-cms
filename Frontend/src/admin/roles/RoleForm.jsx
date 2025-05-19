import React, { useState, useEffect } from "react"
import { useAddItemMutation, useGetItemQuery, useUpdateItemMutation } from "../../app/services/QuerySettings"


const RoleForm = ({ onClose, onSave ,initialData }) => {
const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    description: "",
  })

    const [selectedPermissions, setSelectedPermissions] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)

// RTK Query 
     const {
    data: permissionsData = [],
  } = useGetItemQuery({ url: "/permissions/all" })


    const [addRoles, { isLoading: isAdding }] = useAddItemMutation()
  const [updateRoles, { isLoading: isUpdating }] = useUpdateItemMutation()

    const isLoading = isAdding || isUpdating



useEffect(() => {
    if (initialData?._id) {
      setFormData({
        name: initialData.name || "",
        display_name: initialData.display_name || "",
        description: initialData.description || "",
      })
if (initialData.permissions && Array.isArray(initialData.permissions)) {
        const permIds = initialData.permissions.map(p => 
          typeof p === 'string' ? p : p._id 
        ).filter(id => id); 
        setSelectedPermissions(permIds);
      } else {
        setSelectedPermissions([]); 
      }      setIsEditMode(true)
    } else {
      setFormData({ name: "", display_name: "", description: "" })
      setSelectedPermissions([])
      setIsEditMode(false)
    }
  }, [initialData])
  


  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const handleDisplayNameChange = (e) => {
    const updatedDisplayName = e.target.value
    setFormData((prevData)=>({
      ...prevData,
      display_name:updatedDisplayName,
     name:updatedDisplayName.replace(/\s+/g, "-").toLowerCase(),

    }))
  }

    const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData((prev)=>({...prev,[name]:value}))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
        let result;
       if(isEditMode){
       result = await updateRoles({
            url:`/roles/edit/${initialData._id}`,
            data:{
                ...formData,
                permissions: selectedPermissions,
            }

        }).unwrap()
       }
       else{
       result = await addRoles({
            url:'/roles/create',    
            data:{
                ...formData,
                permissions:selectedPermissions,
                
            }
        }).unwrap()
       }  
       
              if (onSave) {
        onSave(result); 
       }


        if (!isEditMode) {
    setFormData({ name: "", display_name: "", description: "" });
    setSelectedPermissions([]);
}


    } catch (error) {
      console.error("Error creating role:", error)
    }
  }

  return (
    <div className="p-4 bg-white">
      <h1 className="text-xl font-semibold text-indigo-600 mb-4">
        {isEditMode ? "Edit Role" : "Create New Role"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium text-left">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            onChange={handleDisplayNameChange}
            className="w-full p-1 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Display Name</label>
          <input
            type="text"
            value={formData.display_name}
            onChange={handleDisplayNameChange}
            required
            className="w-full p-1 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
           name="description"
            value={formData.description}
         onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Permissions</label>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {permissionsData.map((permission) => (
              <label key={permission._id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission._id)}
                  onChange={() => handleCheckboxChange(permission._id)}
                  className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
 <span className="ml-2">{permission.display_name}</span>
                       </label>
            ))}
          </div>
        </div>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {isLoading ? "Submitting..." : (isEditMode ? "Update Role" : "Create Role")}
          </button>
      </form>
    </div>
  )
}

export default RoleForm