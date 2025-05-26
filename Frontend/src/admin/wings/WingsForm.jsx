import React, { useState, useEffect } from "react";
import {
  useAddItemMutation,
  useUpdateItemMutation,
} from "../../app/services/QuerySettings";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PreviewImage from "../components/PreviewImage";
import { useNavigate } from "react-router-dom";
import MediaCenterModal from "../components/MediaCenterModal";

const WingsForm = ({ initialData = {}, isEdit = false, onSave }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    logo: initialData?.logo || "",
    gallery: initialData?.gallery || [],
    coverImage: initialData?.coverImage || "",
  });
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [isMediaCenterOpen, setIsMediaCenterOpen] = useState(false);
  const [mediaModalTarget, setMediaModalTarget] = useState(null);
  const [addData] = useAddItemMutation();
  const [updateData] = useUpdateItemMutation();
  const [logoPreview, setLogoPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState(
    initialData?.gallery?.map((url) => url) || []
  );

  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        logo: initialData.logo || "",
        gallery: initialData.gallery || [],
        coverImage: initialData.coverImage || "",
      });
      setIsEditMode(true);
    } else {
      setFormData({
        title: "",
        description: "",
        logo: "",
        gallery: [],
        coverImage: "",
      });
      setIsEditMode(false);
    }
  }, [initialData]);

  useEffect(() => {
    let objectUrlToRevoke = null;

    if (formData.logo instanceof File) {
      objectUrlToRevoke = URL.createObjectURL(formData.logo);
      setLogoPreview(objectUrlToRevoke);
    } else if (typeof formData.logo === "string" && formData.logo) {
      setLogoPreview(formData.logo);
    } else {
      setLogoPreview("");
    }
    return () => {
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [formData.logo]);

  // Cover Image
  useEffect(() => {
    let objectUrlToRevoke = null;

    if (formData.coverImage instanceof File) {
      objectUrlToRevoke = URL.createObjectURL(formData.coverImage);
      setCoverPreview(objectUrlToRevoke);
    } else if (typeof formData.coverImage === "string" && formData.coverImage) {
      setCoverPreview(formData.coverImage);
    } else {
      setCoverPreview("");
    }
    return () => {
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [formData.coverImage]);

  useEffect(() => {
    const newPreviews = [];
    const objectUrlsToRevoke = [];

    if (Array.isArray(formData.gallery)) {
      formData.gallery.forEach((item) => {
        if (item instanceof File) {
          const url = URL.createObjectURL(item);
          newPreviews.push(url);
          objectUrlsToRevoke.push(url);
        } else if (typeof item === "string" && item) {
          newPreviews.push(item);
        }
      });
    }
    setGalleryPreviews(newPreviews);
    return () => {
      objectUrlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.gallery]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === "gallery") {
        setFormData((prev) => ({ ...prev, gallery: Array.from(files) }));
      } else if (name === "logo" || name === "coverImage") {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoSelectFromMediaCenter = (selectedMedia) => {
    if (selectedMedia && selectedMedia.length > 0) {
      const logoUrl = selectedMedia[0].url;
      setFormData((prev) => ({ ...prev, logo: logoUrl }));
    }
    setIsMediaCenterOpen(false);
    setMediaModalTarget(null);
  };

  const handleCoverSelectFromMediaCenter = (selectedMedia) => {
    if (selectedMedia?.length) {
      const url = selectedMedia[0].url;
      setFormData((prev) => ({ ...prev, coverImage: url }));
    }
    setIsMediaCenterOpen(false);
    setMediaModalTarget(null);
  };

  const handleGallerySelectFromMediaCenter = (selectedMedia) => {
    if (selectedMedia && selectedMedia.length > 0) {
      const newImageUrls = selectedMedia.map(media => media.url);
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, ...newImageUrls]
      }));
    }
    setIsMediaCenterOpen(false);
    setMediaModalTarget(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("description", formData.description);

    // Handle logo
    if (formData.logo instanceof File) {
      submissionData.append("logo", formData.logo);
    } else if (typeof formData.logo === "string" && formData.logo) {
      submissionData.append("logo", formData.logo); // Send URL if it's a string
    }

    // Handle coverImage
    if (formData.coverImage instanceof File) {
      submissionData.append("coverImage", formData.coverImage);
    } else if (typeof formData.coverImage === "string" && formData.coverImage) {
      submissionData.append("coverImage", formData.coverImage); // Send URL
    }

    if (Array.isArray(formData.gallery)) {
      formData.gallery.forEach((item, index) => {
        if (item instanceof File) {
          submissionData.append("gallery", item);
        } else if (typeof item === "string" && item) {
          submissionData.append("gallery_urls[]", item);
        }
      });
    }
    try {
      let result;
      if (isEditMode) {
        result = await updateData({
          url: `/wings/edit/${initialData._id}`,
          data: submissionData,
        }).unwrap();
        setMessage("Data updated successfully!");
      } else {
        result = await addData({
          url: "/wings/create",
          data: submissionData,
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
        error?.data?.message ||
          error?.data?.error ||
          error?.error ||
          `Failed to ${isEditMode ? "update" : "create"} data.`
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

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">
            Description
          </label>
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

          <button
            type="button"
            onClick={() => {
              setMediaModalTarget("logo");
              setIsMediaCenterOpen(true);
            }}
            className="mb-2 px-4 py-2 border border-indigo-500 bg-transparent text-indigo-500 rounded-md hover:bg-indigo-200 text-sm"
          >
            Select from Media Center
          </button>
          <PreviewImage previewImage={logoPreview} imageFile={formData.logo} />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">
            Cover Image
          </label>
          <button
            type="button"
            onClick={() => {
              setMediaModalTarget("coverImage");
              setIsMediaCenterOpen(true);
            }}
            className="mb-2 px-4 py-2 border border-indigo-500 bg-transparent text-indigo-500 rounded-md hover:bg-indigo-200 text-sm"
          >
            Select from Media Center
          </button>
          <PreviewImage
            previewImage={coverPreview}
            imageFile={formData.coverImage}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">
            Gallery Images
          </label>
          <button
            type="button"
            onClick={() => {
              setMediaModalTarget("gallery");
              setIsMediaCenterOpen(true);
            }}
            className="mb-2 px-4 py-2 border border-indigo-500 bg-transparent text-indigo-500 rounded-md hover:bg-indigo-200 text-sm"
          >
            Select from Media Center
          </button>
          <div className="grid grid-cols-3 gap-2">
            {galleryPreviews.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`gallery-${idx}`}
                className="w-full h-24 object-cover rounded"
              />
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
          mediaModalTarget === "logo"
            ? handleLogoSelectFromMediaCenter
            : mediaModalTarget === "coverImage"
? handleCoverSelectFromMediaCenter
            : mediaModalTarget === "gallery"
            ? handleGallerySelectFromMediaCenter
            : () => {}         }
      />
    </div>
  );
};

export default WingsForm;
