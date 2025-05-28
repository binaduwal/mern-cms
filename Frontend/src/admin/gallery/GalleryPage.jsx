import React from 'react';
import { Link } from 'react-router-dom';
import { useGetItemQuery, useDeleteItemMutation } from '../../app/services/QuerySettings'; 
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; 

const GalleryPage = () => {
  const { data: responseData, error, isLoading, isFetching, refetch } = useGetItemQuery({ url: '/gallery/all' });
  const [deleteItem] = useDeleteItemMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery?')) {
      try {
        await deleteItem({ url: `/gallery/delete/${id}` }).unwrap();
        refetch(); 
      } catch (err) {
        console.error('Failed to delete the gallery (raw error object):', err);
        let displayMessage = 'An unexpected error occurred.';
        if (err.data && err.data.message) {
          displayMessage = err.data.message;
        } else if (err.data && typeof err.data === 'string') {
          displayMessage = err.data;
        } else if (err.status) {
          displayMessage = `Error ${err.status}: ${err.error || 'Failed to delete'}`;
        } else if (err.message) {
          displayMessage = err.message;
        }
        alert(`Failed to delete gallery: ${displayMessage}`);
      }
    }
  };

  if (isLoading) return <p className="text-center text-gray-500 py-8">Loading initial galleries...</p>;
  if (error) return <p className="text-center text-red-500 py-8">Error loading galleries: {error.data?.message || error.status}</p>;

  let galleries = [];
  if (responseData) {
    if (Array.isArray(responseData)) {
      galleries = responseData;
    } else if (responseData.data && Array.isArray(responseData.data)) {
    }
  }
  console.log(responseData)

    const BACKEND_URL = 'http://localhost:3000';


  

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Galleries</h1>
        <Link
          to="/admin/gallery"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition duration-150 ease-in-out"
        >
          <FaPlus className="mr-2" /> Create New Gallery
        </Link>
      </div>

      {/* Show a message if refetching after initial load */}
      {isFetching && !isLoading && <p className="text-center text-gray-500 py-4">Refreshing galleries...</p>}

      {galleries.length === 0 && !isFetching && ( 
        <p className="text-center text-gray-500 py-8">No galleries found. Start by creating one!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gallery) => (
          <div key={gallery._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-5">
                          {console.log('Rendering gallery:', gallery)}

{gallery.images && gallery.images.length > 0 && (
  gallery.images.map((img, idx) => (
    <img
      // key={img._id || img.url || idx} 
      // src={img.url}
       key={img.url || idx} 
      src={img.url && (img.url.startsWith('http') || img.url.startsWith('blob:')) ? img.url : `${BACKEND_URL}${img.url}`}
      
      alt={img.altText || `Gallery image ${idx + 1}`}
      className="w-full h-48 object-cover rounded-md mb-4"
    />
  ))
)}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleDelete(gallery._id)}
                  className="text-indigo-500 hover:text-red-700  bg-transparent transition-colors duration-150"
                  title="Delete Gallery"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
