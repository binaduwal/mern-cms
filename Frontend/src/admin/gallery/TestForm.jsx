import React, { useState, useEffect } from "react";
import {
  useAddItemMutation,
  useUpdateItemMutation,
} from "../../app/services/QuerySettings"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import MediaCenterModal from "../components/MediaCenterModal"; // Adjust path as needed
import PreviewImage from "../components/PreviewImage";

const TestForm = ({ initialData = {}, isEdit = false, onSave, onClose }) => {
  const generateId = () => `temp-id-${Math.random().toString(36).substr(2, 9)}`;

  const [formData, setFormData] = useState({
    // testModel.image is [String], so initialData.image would be an array of URLs
    // We transform them into objects for consistent handling in the form's state
    image: initialData?.image?.map(url => ({ id: generateId(), url: url, previewUrl: url })) || [],
  });

    const [logoPreview, setLogoPreview] = useState("");
  
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isMediaCenterOpen, setIsMediaCenterOpen] = useState(false);

  const [addData] = useAddItemMutation();
  const [updateData] = useUpdateItemMutation();

  useEffect(() => {
    if (isEdit && initialData?._id) {
      setFormData({
        image: initialData?.image?.map(url => ({ id: generateId(), url: url, previewUrl: url })) || [],
      });
    } else {
      // Reset for create mode or if initialData is not sufficient
      setFormData({
        image: [],
      });
    }
  }, [initialData, isEdit]);

  // Effect to manage object URLs for previews of new files
  // and ensure they are cleaned up.
  useEffect(() => {
    let stateChanged = false;
    const newImageStates = formData.image.map(item => {
      if (item.file instanceof File && (!item.previewUrl || !item.previewUrl.startsWith('blob:'))) {
        // If a file exists but doesn't have a valid blob previewUrl, create one.
        // This acts as a fallback or correction mechanism.
        stateChanged = true;
        // Create a new object URL for the file's preview
        return { ...item, previewUrl: URL.createObjectURL(item.file) };
      }
      return item;
    });

    if (stateChanged) {
      // If any previewUrls were generated, update the state to trigger a re-render.
      setFormData(prev => ({ ...prev, image: newImageStates }));
    }

    const imagesToClean = stateChanged ? newImageStates : formData.image;

    return () => {
      imagesToClean.forEach(item => {
        if (item.file && item.previewUrl && item.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
  }, [formData.image]);
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImageObjects = Array.from(files).map(file => ({
        id: generateId(),
        file: file,
        previewUrl: URL.createObjectURL(file),
      }));
      setFormData(prev => ({
        ...prev,
        image: [...prev.image, ...newImageObjects],
      }));
      e.target.value = null; // Reset file input
    }
  };

  const handleSelectFromMediaCenter = (selectedMedia) => {
    if (selectedMedia && selectedMedia.length > 0) {
      const newImageObjects = selectedMedia.map(media => ({
        id: media._id || generateId(),
        url: media.url,
        previewUrl: media.url, // For existing URLs, previewUrl is the url itself
      }));
      setFormData(prev => ({
        ...prev,
        image: [...prev.image, ...newImageObjects]
      }));
    }
    setIsMediaCenterOpen(false);
  };

  const handleRemoveImage = (idToRemove) => {
    const imageToRemove = formData.image.find(img => img.id === idToRemove);
    if (imageToRemove && imageToRemove.file && imageToRemove.previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    setFormData(prev => ({
      ...prev,
      image: prev.image.filter(img => img.id !== idToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const submissionData = new FormData();

    if (Array.isArray(formData.image)) {
      formData.image.forEach((item) => {
        if (item.file) { // If it's a new file upload
          submissionData.append("images", item.file); // For multer fieldname 'images'
        } else if (item.url) { // If it's an existing image URL
          submissionData.append("imageUrls[]", item.url);
        }
      });
    }

    try {
      let result;
      if (isEdit) {
        result = await updateData({
          url: `/test/edit/${initialData._id}`, // Adjust API endpoint as needed
          data: submissionData,
        }).unwrap();
        setMessage("Test item updated successfully!");
      } else {
        result = await addData({
          url: "/test/create", // Adjust API endpoint as needed
          data: submissionData,
        }).unwrap();
        setMessage("Test item created successfully!");
        // navigate("/admin/test/list"); // Or wherever you list test items
      }

      if (onSave) {
        onSave(result);
      }
      if (onClose && !isEdit) { // Close after successful creation
        setTimeout(() => onClose(), 1500);
      } else if (onClose && isEdit && message.includes("success")) {
        setTimeout(() => onClose(), 1500);
      }

    } catch (error) {
      console.error("Submission error:", error);
      setMessage(
        error?.data?.message ||
        error?.data?.error ||
        error?.error ||
        `Failed to ${isEdit ? "update" : "create"} test item.`
      );
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        {isEdit ? "Edit Test Item" : "Create New Test Item"}
      </h2>

      {message && (
        <p className={`mb-4 text-sm ${message.toLowerCase().includes("fail") || message.toLowerCase().includes("error") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Images
          </label>
          <div className="mb-2">
            <input type="file" multiple onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
          </div>
          <button
            type="button"
            onClick={() => setIsMediaCenterOpen(true)}
            className="mb-4 px-4 py-2 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-100 text-sm"
          >
            Select from Media Center
          </button>

          {/* <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {formData.image.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.previewUrl || img.url}
                  alt="Test item"
                  className="w-full h-32 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-75 group-hover:opacity-100"
                  title="Remove image"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div> */}

          <PreviewImage previewImage={logoPreview} imageFile={formData.images} />

        </div>

        <div className="flex justify-end space-x-3">
          {onClose && <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>}
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {isEdit ? "Update Item" : "Create Item"}
          </button>
        </div>
      </form>

      <MediaCenterModal
        isOpen={isMediaCenterOpen}
        onClose={() => setIsMediaCenterOpen(false)}
        onMediaSelect={handleSelectFromMediaCenter}
        multiSelect={true} // Allow selecting multiple images
      />
    </div>
  );
};

export default TestForm;