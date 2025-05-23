import React, { useState, useEffect } from "react";
import { useAddItemMutation, useUpdateItemMutation } from "../../app/services/QuerySettings";

const PartnerForm = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    status: "active",
  });

  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [addData, { isLoading: isAdding }] = useAddItemMutation();
  const [updateData, { isLoading: isUpdating }] = useUpdateItemMutation();

  const isLoading = isAdding || isUpdating;

  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        status: initialData.status || "active",
      });
      setIsEditMode(true);
    } else {
      setFormData({
        name: "",
        description: "",
        status: "active",
      });
      setIsEditMode(false);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setLogoFile(file);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        let result;
       if(isEditMode){
       result = await updateData({
            url:`/partners/edit/${initialData._id}`,
            data:formData,
        }).unwrap()
        setMessage("Data updated successfully!")
       }
       else{
       result = await addData({
            url:'/partners/create',
            data:formData,
        }).unwrap()
        console.log(result);
        alert("Success");
        setMessage("Data created successfully!")
       }

       if (onSave) {
        onSave(result); 
       }
    } catch(error) {
      console.error(`Error while ${isEditMode ? "updating" : "creating"} partner`, error);
      setMessage(
        error?.data?.error ||
          error?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} partner.`
      );
    }
  };

  return (
    <div className="p-4 bg-transparent w-full max-w-md">
      <h1 className="text-xl font-semibold text-left text-indigo-600 mb-4">
        {isEditMode ? "Edit Partner" : "Create New Partner"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block text-gray-700 font-medium text-left">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">Description</label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">Logo</label>
          <input
            type="file"
            name="logo"
            // onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-200"
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
              ? "Update Partner"
              : "Create Partner"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerForm;
