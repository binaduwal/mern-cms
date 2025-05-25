import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  useAddItemMutation,
  useUpdateItemMutation,
} from "../../app/services/QuerySettings";
import MediaCenterModal from "../components/MediaCenterModal";
import PreviewImage from "../components/PreviewImage";

const JoinClubForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    services: [{ title: "", description: "", image: null }],
  });

  const [message, setMessage] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [isMediaCenterOpen, setIsMediaCenterOpen] = useState(false);
  const [currentServiceIndexForMedia, setCurrentServiceIndexForMedia] =
    useState(null);
  const [serviceImagePreviews, setServiceImagePreviews] = useState([]);

  const [addClub] = useAddItemMutation();
  const [updateClub] = useUpdateItemMutation();

  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        services: initialData.services?.map((service) => ({
          title: service.title || "",
          description: service.description || "",
          image: service.image || null,
        })) || [{ title: "", description: "", image: null }],
      });
      setIsEditMode(true);
    } else {
      setFormData({
        title: "",
        description: "",
        services: [{ title: "", description: "", image: null }],
      });
      setIsEditMode(false);
    }
  }, [initialData]);

  useEffect(() => {
    const previews = formData.services.map((service) => {
      if (service.image instanceof File) {
        return URL.createObjectURL(service.image);
      } else if (typeof service.image === "string" && service.image) {
        return service.image;
      }
      return "";
    });
    setServiceImagePreviews(previews);

    return () => {
      previews.forEach((previewUrl) => {
        if (previewUrl && previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
      });
    };
  }, [formData.services]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index, e) => {
    const newServices = [...formData.services];
    newServices[index][e.target.name] = e.target.value;
    setFormData({ ...formData, services: newServices });
  };

  const openMediaCenterForService = (index) => {
    setCurrentServiceIndexForMedia(index);
    setIsMediaCenterOpen(true);
  };

  const handleImageSelectFromMediaCenter = (selectedMedia) => {
    if (
      selectedMedia &&
      selectedMedia.length > 0 &&
      currentServiceIndexForMedia !== null
    ) {
      const imageUrl = selectedMedia[0].url;
      const newServices = [...formData.services];
      newServices[currentServiceIndexForMedia].image = imageUrl;
      setFormData((prev) => ({ ...prev, services: newServices }));
    }
    setIsMediaCenterOpen(false);
    setCurrentServiceIndexForMedia(null);
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        { title: "", description: "", image: null },
      ],
    });
  };

  const removeService = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        services: formData.services.map((service) => ({
          title: service.title,
          description: service.description,
          image: service.image || null,
        })),
      };
      let result;
      if (isEditMode) {
        result = await updateClub({
          url: `/join/edit/${initialData._id}`,
          data: dataToSubmit,
        }).unwrap();
        setMessage("Data updated successfully!");
      } else {
        result = await addClub({
          url: "/join/create",
          data: dataToSubmit,
        }).unwrap();
        console.log(result);
        setMessage("Data created successfully!");
      }

      if (onSave) {
        onSave(result);
      }
      if (!isEditMode) {
        setFormData({
          title: "",
          description: "",
          services: [{ title: "", description: "", image: null }],
        });
      }
    } catch (error) {
      console.error(
        `Error while ${isEditMode ? "updating" : "creating"} Data`,
        error
      );
      setMessage(
        error?.data?.error ||
          error?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} Data.`
      );
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded max-h-[calc(100vh-4rem)] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">Join The Club Form</h2>
      <form onSubmit={handleSubmit}>
        {message && (
          <p
            className={`${
              message.startsWith("Failed") || message.includes("Error")
                ? "text-red-500"
                : "text-green-500"
            } mb-2`}
          >
            {message}
          </p>
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
                <IoMdCloseCircleOutline />
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

              <label className="block mb-1 font-medium">
                Service Description
              </label>
              <textarea
                name="description"
                value={service.description}
                onChange={(e) => handleServiceChange(index, e)}
                required
                rows="2"
                className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter service description"
              ></textarea>

              <label className="block mb-1 font-medium">Service Image</label>
              <button
                type="button"
                onClick={() => openMediaCenterForService(index)}
                className="mb-2 px-4 py-2 border border-indigo-500 bg-transparent text-indigo-500 rounded-md hover:bg-indigo-200 text-sm"
              >
                Select from Media Center
              </button>
              <PreviewImage
                previewImage={serviceImagePreviews[index]}
                imageFile={service.image}
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

      <MediaCenterModal
        isOpen={isMediaCenterOpen}
        onClose={() => {
          setIsMediaCenterOpen(false);
          setCurrentServiceIndexForMedia(null);
        }}
        onMediaSelect={handleImageSelectFromMediaCenter}
      />
    </div>
  );
};

export default JoinClubForm;
