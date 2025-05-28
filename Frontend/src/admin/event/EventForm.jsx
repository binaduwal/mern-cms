import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useAddItemMutation,
  useGetItemQuery,
  useUpdateItemMutation,
} from "../../app/services/QuerySettings";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MediaCenterModal from "../components/MediaCenterModal";
import PreviewImage from "../components/PreviewImage";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    attendees: "",
    image:""
  });

  const [message, setMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isMediaCenterOpen, setIsMediaCenterOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");

  const [addData, { isLoading: isAdding }] = useAddItemMutation();
  const [updateData, { isLoading: isUpdating }] = useUpdateItemMutation();

  const {
    data: eventDataForEdit,
    isLoading: isLoadingEventForEdit,
    isError: isErrorEventForEdit,
    error: errorEventForEdit,
  } = useGetItemQuery(
    { url: `/events/${id}` },
    { skip: !isEditMode, refetchOnMountOrArgChange: true }
  );

  const isLoading =
    isAdding || isUpdating || (isEditMode && isLoadingEventForEdit);

  useEffect(() => {
    if (isEditMode && eventDataForEdit) {
      setFormData({
        title: eventDataForEdit.title || "",
        description: eventDataForEdit.description || "",
        date: eventDataForEdit.date
          ? new Date(eventDataForEdit.date).toISOString().split("T")[0]
          : "",
        startTime: eventDataForEdit.startTime || "",
        endTime: eventDataForEdit.endTime || "",
        location: eventDataForEdit.location || "",
        attendees: eventDataForEdit.attendees || "",
                image: eventDataForEdit.image || "", 

      });
    } else if (!isEditMode) {
      setFormData({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        attendees: "",
        image:""
      });
    }
  }, [isEditMode, eventDataForEdit]);


    useEffect(() => {
      let objectUrlToRevoke = null;
  
      if (formData.image instanceof File) {
        objectUrlToRevoke = URL.createObjectURL(formData.image);
        setLogoPreview(objectUrlToRevoke);
      } else if (typeof formData.image === "string" && formData.image) {
        setLogoPreview(formData.image);
      } else {
        setLogoPreview("");
      }
      return () => {
        if (objectUrlToRevoke) {
          URL.revokeObjectURL(objectUrlToRevoke);
        }
      };
    }, [formData.image]);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleLogoSelectFromMediaCenter = (selectedMedia) => {
    if (selectedMedia && selectedMedia.length > 0) {
      const logoUrl = selectedMedia[0].url;
      setFormData((prev) => ({ ...prev, image: logoUrl }));
    }
    setIsMediaCenterOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      attendees: formData.attendees,
      image: formData.image,
    };

    if (payload.date) {
      const selectedEventDate = new Date(payload.date);
      selectedEventDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let blockPastDate = true;
      if (isEditMode && eventDataForEdit && eventDataForEdit.date) {
        const originalDate = new Date(eventDataForEdit.date);
        originalDate.setHours(0, 0, 0, 0);
        if (selectedEventDate.getTime() === originalDate.getTime()) {
          blockPastDate = false;
        }
      }
      if (blockPastDate && selectedEventDate < today) {
        toast.error("Event Date cannot be in the past.");
        return;
      }
    }

    try {
      let result;
      if (isEditMode) {
        result = await updateData({
          url: `/events/edit/${id}`,
          data: payload,
        }).unwrap();
        toast.success("Event updated successfully!");
      } else {
        result = await addData({
          url: "/events/create",
          data: payload,
        }).unwrap();
        toast.success("Event created successfully!");
      }
      setTimeout(() => {
        navigate("/admin/components/events");
      }, 1200);
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

  const handleCancel = () => {
    navigate("/admin/components/events");
  };

  if (isEditMode && isLoadingEventForEdit) {
    return <div className="p-4 text-center">Loading event data...</div>;
  }

  if (isEditMode && isErrorEventForEdit) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading event data:{" "}
        {errorEventForEdit?.data?.message ||
          errorEventForEdit?.error ||
          "Unknown error"}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white w-full max-w-3xl mx-auto my-8 rounded-lg shadow-xl overflow-y-auto">
      <h1 className="text-xl font-semibold text-left text-indigo-600 mb-4">
        {isEditMode ? "Edit Event" : "Create New Event"}
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
          <label className="block text-gray-700 font-medium text-left">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">
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

        <div>
          <label
            htmlFor="matchDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        <div>
          <label className="block text-[16px] font-medium text-left">
            Match Time
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 font-medium text-left">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">
            Attendees
          </label>
          <input
            type="number"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

                <div>
          <label className="block text-gray-700 font-medium text-left">
            Event Image
          </label>
          <button
            type="button"
            onClick={() => setIsMediaCenterOpen(true)}
            className="mb-2 px-4 py-2 border border-indigo-500 bg-transparent text-indigo-500 rounded-md hover:bg-indigo-200 text-sm"
          >
            Select from Media Center
          </button>
          <PreviewImage previewImage={logoPreview} imageFile={formData.image} />
        </div>


        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {isLoading ? "Submitting..." : isEditMode ? "Update " : "Create "}
          </button>
        </div>

      </form>
      <MediaCenterModal
        isOpen={isMediaCenterOpen}
        onClose={() => setIsMediaCenterOpen(false)}
        onMediaSelect={handleLogoSelectFromMediaCenter}
      />
    </div>
  );
};

export default EventForm;
