import React, { useState, useEffect } from "react"
import { useAddItemMutation, useUpdateItemMutation } from "../../app/services/QuerySettings"
import PreviewImage from "../components/PreviewImage"
import { useNavigate } from "react-router-dom"
import MediaCenterModal from "../components/MediaCenterModal";

const FeatureForm  = ({ onClose, onSave ,initialData }) => {
const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  })
    const [message, setMessage] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
const navigate=useNavigate()
  const [addData, { isLoading: isAdding }] = useAddItemMutation()
  const [updateData, { isLoading: isUpdating }] = useUpdateItemMutation()
const [iconPreview, setIconPreview] = useState("");
  const [isMediaCenterOpen, setIsMediaCenterOpen] = useState(false);

    const isLoading = isAdding || isUpdating


    useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        icon: initialData.icon || "",
      })
      setIsEditMode(true); 
    }
    else{
    setFormData({ title: "", description: "" ,icon: "" })
    setIsEditMode(false)
  }
  }, [initialData])

  useEffect(() => {
    let objectUrlToRevoke = null;

    if (formData.icon instanceof File) {
      objectUrlToRevoke = URL.createObjectURL(formData.icon);
      setIconPreview(objectUrlToRevoke);
    } else if (typeof formData.icon === 'string' && formData.icon) {
      setIconPreview(formData.icon); 
    } else {
      setIconPreview(""); 
    }
    return () => {
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [formData.icon]);

const handleChange = (e)=>{
const {name,value,files}=e.target
if (name === "icon" && files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, icon: file })); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
}

const handleIconSelectFromMediaCenter = (selectedMedia) => {
  if (selectedMedia && selectedMedia.length > 0) {
    const iconUrl = selectedMedia[0].url;
      setFormData(prev => ({ ...prev, icon: iconUrl })); 
  }
  setIsMediaCenterOpen(false);
};


  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    try {
        let result;
       if(isEditMode){
        const submissionData = new FormData();
        submissionData.append('title', formData.title);
        submissionData.append('description', formData.description);
        if (formData.icon instanceof File) {
          submissionData.append('icon', formData.icon);
        } else if (typeof formData.icon === 'string') {
          submissionData.append('icon', formData.icon); 
        }
       result = await updateData({
            url:`/features/edit/${initialData._id}`,
            data:submissionData,
            
        }).unwrap()
        setMessage("Data updated successfully!")
       }
       else{
        const submissionData = new FormData();
        submissionData.append('title', formData.title);
        submissionData.append('description', formData.description);
        if (formData.icon instanceof File) {
          submissionData.append('icon', formData.icon);
        } else if (typeof formData.icon === 'string' && formData.icon.trim() !== '') {
          submissionData.append('icon', formData.icon);
        }
       result = await addData({
            url:'/features/create',
            data: submissionData 
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
    <div className="p-4 bg-transparent w-full max-w-md overflow-y-auto">
      <h1 className="text-xl font-semibold text-left text-indigo-600 mb-4">
        {isEditMode ? "Edit Features" : "Create New Features"}
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
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
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

        <div>
                      <label className="block text-gray-700 font-medium text-left">
            Icon
          </label>

<button
            type="button"
            onClick={() => setIsMediaCenterOpen(true)}
            className="mb-2 px-4 py-2 border border-indigo-500 bg-transparent text-indigo-500 rounded-md hover:bg-indigo-200 text-sm"
          >
            Select from Media Center
          </button>

                  <PreviewImage previewImage={iconPreview} imageFile={formData.icon} />

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
              ? "Update Features"
              : "Create Features"}
          </button>
        </div>
      </form>
      <MediaCenterModal
        isOpen={isMediaCenterOpen}
        onClose={() => setIsMediaCenterOpen(false)}
        onMediaSelect={handleIconSelectFromMediaCenter}
      />
    </div>
  );
}

export default FeatureForm  
