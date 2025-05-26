import React, { useState, useEffect } from "react";
import {
  useAddItemMutation,
  useUpdateItemMutation,
} from "../../app/services/QuerySettings";

const CallToActionForm = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    caption: "",
    title: "",
    description: "",
    buttonText: "",
    buttonUrl: "",
  });
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [addData, { isLoading: isAdding }] = useAddItemMutation();
  const [updateData, { isLoading: isUpdating }] = useUpdateItemMutation();

  const isLoading = isAdding || isUpdating;

  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        caption: initialData.caption || "",
        title: initialData.title || "",
        description: initialData.description || "",
        buttonText: initialData.buttonText || "",
        buttonUrl: initialData.buttonUrl || "",
      });
      setIsEditMode(true);
    } else {
      setFormData({
        caption: "",
        title: "",
        description: "",
        buttonText: "",
        buttonUrl: "",
      });
      setIsEditMode(false);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      let result;
      if (isEditMode) {
        result = await updateData({
          url: `/cta/edit/${initialData._id}`,
          data: formData,
        }).unwrap();
        setMessage("Data updated successfully!");
      } else {
        result = await addData({
          url: "/cta/create",
          data: formData,
        }).unwrap();
        setMessage("Data created successfully!");
      }

      if (onSave) {
        onSave(result);
      }
    } catch (error) {
      console.error(
        `Error while ${isEditMode ? "updating" : "creating"} data`,
        error
      );
      setMessage(
        error?.data?.error ||
          error?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} data.`
      );
    }
  };

  return (
    <div className="p-4 bg-transparent w-full max-w-md ">
      <h1 className="text-xl font-semibold text-left text-indigo-600 mb-4">
        {isEditMode ? "Edit Call to Action" : "Create New Call to Action"}
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
            Caption
          </label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">
            Title
          </label>
          <input
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          ></input>
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
            Button Text
          </label>
          <input
            name="buttonText"
            placeholder="Enter buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          ></input>
        </div>
        <div>


          <label className="block text-gray-700 font-medium text-left">
            Button Url
          </label>
          <input
            name="buttonUrl" 
            placeholder="Enter button Url"
            value={formData.buttonUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          ></input>
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
              ? "Update Call to Action"
              : "Create Call to Action"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CallToActionForm;
