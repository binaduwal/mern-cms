import React, { useEffect, useState } from "react";
import { useGetItemQuery, useAddItemMutation } from "../../app/services/QuerySettings";
import { FaPlus, FaTrash } from "react-icons/fa";
import GalleryForm from "./GalleryForm";
import { useDeleteImageMutation } from "../../app/services/QuerySettings";
const GalleryPage = () => {
  const {
    data: responseData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetItemQuery({ url: "/gallery/all" });

  const [addGallery] = useAddItemMutation();
 const [deleteImage] = useDeleteImageMutation(); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <p className="text-center text-gray-500 py-8">Loading galleries...</p>;
  if (error) return <p className="text-center text-red-500 py-8">Error loading galleries: {error.data?.message || error.status}</p>;

  const galleries = Array.isArray(responseData)
    ? responseData
    : Array.isArray(responseData?.data)
    ? responseData.data
    : [];

  const BACKEND_URL = "http://localhost:3000";
  // Flatten, filter, dedupe, include galleryId for deletion
  const allImages = galleries.flatMap((g) =>
    (g.images || [])
      .filter((img) => img.url)
      .map((img, idx) => ({ ...img, key: `${g._id}-${idx}`, galleryId: g._id }))
  );
  const uniqueImages = allImages.filter(
    (img, idx, arr) => arr.findIndex((i) => i.url === img.url) === idx
  );

  // Handlers
  const openNewGalleryForm = () => {
    setInitialData(null);
    setIsFormOpen(true);
  };
  const handleSave = async () => {
    setIsFormOpen(false);
    await refetch();
  };

  const handleDelete = async (img) => {
    try {
      // await deleteImage({ url: `/gallery/${img.galleryId}/deleteImage`, data: { url: img.url } }).unwrap();
      await deleteImage({
       galleryId: img.galleryId,
       imageUrl: img.url,
     }).unwrap();
      await refetch();
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">All Images</h1>
        <button
          onClick={openNewGalleryForm}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition duration-150 ease-in-out"
        >
          <FaPlus className="mr-2" /> New Gallery
        </button>
      </div>

      {isFetching && !isLoading && <p className="text-center text-gray-500 py-4">Refreshing galleries...</p>}
      {uniqueImages.length === 0 && !isFetching && <p className="text-center text-gray-500 py-8">No images found. Upload some!</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueImages.map((img) => (
          <div
            key={img.key}
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={img.url.startsWith("http") ? img.url : `${BACKEND_URL}${img.url}`}
              alt={img.altText || "Gallery Image"}
              className="w-full h-48 object-cover rounded-md"
            />
            <button
              onClick={() => handleDelete(img)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-white p-1 rounded-full transition-opacity duration-200"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Inline Gallery Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsFormOpen(false)}
            >
              ✕
            </button>
            <GalleryForm initialData={initialData} isEdit={false} onSave={handleSave} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
