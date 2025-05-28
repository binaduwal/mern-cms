import React, { useState, useEffect } from "react";
import {
  useAddItemMutation,
  useUpdateItemMutation,
} from "../../app/services/QuerySettings";
import { useNavigate } from "react-router-dom";
import MediaCenterModal from "../components/MediaCenterModal";

const GalleryForm = ({ initialData = {}, isEdit = false, onSave }) => {
  const generateId = () => `temp-id-${Math.random().toString(36).substr(2, 9)}`;

  const [formData, setFormData] = useState({
    description: initialData?.description || "",
    image: initialData?.image?.map(img => ({ ...img, id: img._id || generateId() })) || [],
  });

  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [currentImageAltText, setCurrentImageAltText] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isMediaCenterOpen, setIsMediaCenterOpen] = useState(false);
  const [mediaModalTarget, setMediaModalTarget] = useState(null);
  const [addData] = useAddItemMutation();
  const [updateData] = useUpdateItemMutation();

  const [galleryPreviews, setGalleryPreviews] = useState(
    initialData?.image?.map((url) => url) || []
  );

  useEffect(() => {
    if (isEdit && initialData?._id) {
      setFormData({
        description: initialData.description || "",
        image: initialData?.image?.map(img => ({ ...img, id: img._id || generateId() })) || [],
      });
    } else { 
      setFormData({
        description: "",
        image: [],
      });
    }
  }, [initialData?._id, isEdit, initialData?.description, initialData?.image]);

  useEffect(() => {
    const newPreviews = [];
    const objectUrlsToRevoke = [];
    
    if (Array.isArray(formData.image)) {
      formData.image.forEach((item) => {
        if (item.file instanceof File) { 
          const previewUrl = URL.createObjectURL(item.file);
          newPreviews.push({ ...item, previewUrl });
          objectUrlsToRevoke.push(previewUrl);
        } else if (item.url) { 
          newPreviews.push({ ...item, previewUrl: item.url });
        }
      });
    }
    setGalleryPreviews(formData.image.map(img => img.previewUrl || img.url));

    return () => {
      objectUrlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "galleryFiles" && files) { 
      const newImageObjects = Array.from(files).map(file => ({
        id: generateId(),
        file: file, 
        previewUrl: URL.createObjectURL(file),
        altText: "", 
      }));
      setFormData((prev) => ({
        ...prev,
        image: [...prev.image, ...newImageObjects],
      }));
      e.target.value = null; 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleAddImageManually = () => {
  if (!currentImageUrl.trim()) {
    setMessage("Image URL cannot be empty.");
    return;
  }
  const newImageEntry = {
    id: generateId(),
    url: currentImageUrl,
    altText: currentImageAltText,
  };
  setFormData(prev => ({
    ...prev,
    image: [...prev.image, newImageEntry]
  }));
  // Reset input fields
  setCurrentImageUrl("");
  setCurrentImageAltText("");
};

const handleGallerySelectFromMediaCenter = (selectedMedia) => {
  if (selectedMedia && selectedMedia.length > 0) {
    const newImageObjects = selectedMedia.map(media => ({
      id: media._id || generateId(), 
      url: media.url,
      altText: media.altText || "", 
    }));
    setFormData(prev => ({
      ...prev,
      image: [...prev.image, ...newImageObjects]
    }));
  }
  setIsMediaCenterOpen(false);
  setMediaModalTarget(null);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  const submissionData = new FormData();
  submissionData.append("description", formData.description);
  
  if (Array.isArray(formData.image)) {
    formData.image.forEach((item) => {
      if (item.file) { 
        submissionData.append("images", item.file); 
        submissionData.append("altTexts[]", item.altText || "");
      } else if (item.url) { 
        submissionData.append("imageUrls[]", item.url);
        submissionData.append("imageAltTexts[]", item.altText || "");
      }
    });
  }

  try {
    let result;
    if (isEdit) { 
      result = await updateData({
        url: `/gallery/edit/${initialData._id}`,
        data: submissionData,
      }).unwrap();
      setMessage("Data updated successfully!");
    } else {
      result = await addData({
        url: "/gallery/create",
        data: submissionData,
      }).unwrap();
      navigate("/admin/gallery/page")
      setMessage("Data created successfully!");
    }

    if (onSave) {
      onSave(result);
    }
  } catch (error) {
    console.error("Submission error:", error);
    setMessage(
      error?.data?.message ||
      error?.data?.error ||
      error?.error ||
      `Failed to ${isEdit ? "update" : "create"} data.`
    );
  }
};
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-6 bg-white rounded-lg overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">
          {isEdit ? "Edit Wings" : "Create New Wings"}
        </h2>

        {message && (
          <p
            className={`mb-4 text-sm ${
              message.startsWith("Failed") ||
              message.toLowerCase().includes("error")
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {message}
          </p>
        )}





        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">
            Gallery Images
          </label>
          <button
            type="button"
            onClick={() => {
              setMediaModalTarget("image");
              setIsMediaCenterOpen(true);
            }}
            className="mb-2 px-4 py-2 border border-indigo-500 bg-transparent text-indigo-500 rounded-md hover:bg-indigo-200 text-sm"
          >
            Select from Media Center
          </button>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.image.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.previewUrl || img.url} 
                  alt={img.altText || 'Gallery image'}
                  className="w-full h-32 object-cover rounded-md shadow-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate group-hover:visible invisible">
                  {img.altText || (img.file ? img.file.name : 'No alt text')}
                </div>
              </div>
            ))}
          </div>
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
      <MediaCenterModal
        isOpen={isMediaCenterOpen}
        onClose={() => {
          setIsMediaCenterOpen(false);
          setMediaModalTarget(null);
        }}
        onMediaSelect={
          mediaModalTarget === "image"
            ? handleGallerySelectFromMediaCenter
            : () => {}
        }
      />
    </div>
  );
};

export default GalleryForm;
