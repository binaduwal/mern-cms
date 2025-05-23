import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useAddItemMutation, useUpdateItemMutation } from "../../app/services/QuerySettings";

const JoinClubForm = ({onSave,initialData}) =>
{
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    services: [
      { title: "", description: "", image: "" },
    ],
  });

      const [message, setMessage] = useState("")
  
    const [isEditMode, setIsEditMode] = useState(false)
  

    const [addClub] = useAddItemMutation()
      const [updateClub] = useUpdateItemMutation()


          useEffect(() => {
          if (initialData && initialData._id) {
            setFormData({
    title: initialData.title || "",
description: initialData.description || "",
    services: [
      { title:initialData.services[0].title || "", description: initialData.services[0].description || "", image: initialData.services[0].image || "" },
    ],
            })
            setIsEditMode(true); 
          }
          else{
          setFormData({     title: "",
    description: "",
    services: [
      { title: "", description: "", image: "" },
    ],
 })
          setIsEditMode(false)
        }
        }, [initialData])
      

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index, e) => {
    const newServices = [...formData.services];
    newServices[index][e.target.name] = e.target.value;
    setFormData({ ...formData, services: newServices });
  };

  const handleFileChange = (index, e) => {
  const file = e.target.files[0];
  if (!file) return;
  const newServices = [...formData.services];
  newServices[index].image = file;
  setFormData({ ...formData, services: newServices });
};


  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { title: "", description: "", image: "" }],
    });
  };

  const removeService = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        let result;
       if(isEditMode){
       result = await updateClub({
            url:`/join/edit/${initialData._id}`,
            data:formData,
        }).unwrap()
        alert("Data updated successfully!")
       }
       else{
       result = await addClub({
            url:'/join/create',
            data:formData,
        }).unwrap()
        console.log(result)
        alert("Data created successfully!")
       }

       if (onSave) {
        onSave(result); 
       }
        if (!isEditMode) {
            setFormData({
    title: "",
    description: "",
    services: [
      { title: "", description: "", image: "" },
    ],
  });
        }
    } catch(error) {
        console.error(`Error while ${isEditMode ? "updating" : "creating"} Data`, error);
      setMessage(error?.data?.error || error?.data?.message || `Failed to ${isEditMode ? "update" : "create"} Data.`)
    }
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded max-h-[calc(100vh-4rem)] overflow-y-auto"> 
      <h2 className="text-2xl font-semibold mb-6">Join The Club Form</h2>
      <form onSubmit={handleSubmit}>
              {message && (
  <p className={`${message.startsWith("Failed") || message.includes("Error") ? "text-red-500" : "text-green-500"} mb-2`}>{message}</p>
)}

        {/* Main Title */}
        <label className="block mb-2 font-medium">Main Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter main title"
        />

        {/* Main Description */}
        <label className="block mb-2 font-medium">Main Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter main description"
        ></textarea>

        {/* Services */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Services</h3>
          {formData.services.map((service, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded relative bg-gray-50"
            >
              <button
                type="button"
                onClick={() => removeService(index)}
                className="absolute top-2 right-2 bg-transparent  text-black hover:text-red-700 font-bold"
                aria-label="Remove service"
              >
               <IoMdCloseCircleOutline/>
              </button>

              <label className="block mb-1 font-medium">Service Title</label>
              <input
                type="text"
                name="title"
                value={service.title}
                onChange={(e) => handleServiceChange(index, e)}
                required
                className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter service title"
              />

              <label className="block mb-1 font-medium">Service Description</label>
              <textarea
                name="description"
                value={service.description}
                onChange={(e) => handleServiceChange(index, e)}
                required
                rows="2"
                className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter service description"
              ></textarea>

              <label className="block mb-1 font-medium">Service Image URL</label>
<input
  type="file"
  name="image"
  onChange={(e) => handleFileChange(index, e)}
  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
            </div>
          ))}

          <button
            type="button"
            onClick={addService}
            className="px-4 py-2 bg-transparent text-black rounded border border-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            + Add Service
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex justify-start py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default JoinClubForm