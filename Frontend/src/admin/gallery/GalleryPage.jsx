import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetItemQuery } from "../../app/services/QuerySettings";
import { FaPlus } from "react-icons/fa";

const GalleryPage = () => {
  const {
    data: responseData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetItemQuery({ url: "/gallery/all" });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading)
    return (
      <p className="text-center text-gray-500 py-8">
        Loading galleries...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-8">
        Error loading galleries: {error.data?.message || error.status}
      </p>
    );

  const galleries =
    Array.isArray(responseData)
      ? responseData
      : Array.isArray(responseData?.data)
      ? responseData.data
      : [];

  const BACKEND_URL = "http://localhost:3000";

  // Flatten and filter valid images
  const allImages = galleries.flatMap((gallery) =>
    (gallery.images || [])
      .filter((img) => typeof img.url === "string" && img.url.trim())
      .map((img, idx) => ({
        ...img,
        key: `${gallery._id}-${idx}`,
      }))
  );

  // Remove duplicate URLs
  const uniqueImages = allImages.filter(
    (img, idx, self) =>
      self.findIndex((i) => i.url === img.url) === idx
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">All Images</h1>
        <Link
          to="/admin/gallery"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition duration-150 ease-in-out"
        >
          <FaPlus className="mr-2" /> New Gallery
        </Link>
      </div>

      {isFetching && !isLoading && (
        <p className="text-center text-gray-500 py-4">
          Refreshing galleries...
        </p>
      )}

      {uniqueImages.length === 0 && !isFetching && (
        <p className="text-center text-gray-500 py-8">
          No images found. Upload some in the admin panel!
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueImages.map((img) => (
          <div
            key={img.key}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={
                img.url.startsWith("http") || img.url.startsWith("blob:")
                  ? img.url
                  : `${BACKEND_URL}${img.url}`
              }
              alt={img.altText || "Gallery Image"}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
