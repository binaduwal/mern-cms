import React, { useState, useRef, useEffect } from 'react';
import ImagePreview from '../media/ImagePreview';
import { FaEye } from 'react-icons/fa';
import {
  useGetItemQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} from '../../app/services/QuerySettings'; 
import { toast } from 'react-hot-toast';
const MediaCenter = ({ onClose, onAdd }) => {
  const fileInputRef = useRef(null);
 const [previewTargetImage, setPreviewTargetImage] = useState(null); 
  const [activeSelection, setActiveSelection] = useState(null);  const [hoveredImage, setHoveredImage] = useState(null);
  const [checkedImages, setCheckedImages] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);

 const {
    data: apiResponse,
    isLoading: isLoadingMedia,
    isError: isMediaError,
    error: mediaError,
    refetch: refetchMedia,
  } = useGetItemQuery({ url: '/media/all' }, { refetchOnMountOrArgChange: true });

  const [uploadFileMutation,] = useAddItemMutation();
  const [deleteFileMutation, { isLoading: isDeleting }] = useDeleteItemMutation();

const images = (apiResponse || []).filter(img =>
  img?.url?.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
);

  const handleFileChange = async (e) => {
const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      await uploadFileMutation({ url: '/media/upload', data: formData }).unwrap();
      toast.success('File uploaded successfully!');
      refetchMedia();
    } catch (err) {
      console.error('Upload error:', err);
      toast.error(err?.data?.message || err?.message || 'File upload failed.');
          
    }
  };

  const handleUpdateImageData = (url, altText, title, description) => {
    refetchMedia();
  };

  const handleRemoveImage = async (filename) => {
    try {
await deleteFileMutation({ url: `/media/delete/${filename}` }).unwrap(); 
      toast.success('Image removed successfully!');
      refetchMedia();
       if (previewTargetImage?.filename === filename) {
        setPreviewTargetImage(null);
      }
      if (activeSelection?.filename === filename) {
        setActiveSelection(null);
      }
    } catch (err) {
      console.error('Error removing image:', err);
      toast.error(err?.data?.message || 'Failed to remove image.');
    }
  };

  const toggleBulkMode = () => {
    if (bulkMode) {
      setCheckedImages([]);
setActiveSelection(null);
      setPreviewTargetImage(null);
    } else { 
      setActiveSelection(null);
      setPreviewTargetImage(null);
    }    
    setBulkMode(prev => !prev);
  };
  
  const toggleCheckbox = filename => {
    setCheckedImages(prev =>
      prev.includes(filename)
        ? prev.filter(name => name !== filename)
        : [...prev, filename]
    );
  };

  const handleAdd = () => {
    const picked = bulkMode
      ? images.filter(img => checkedImages.includes(img.filename))
      : activeSelection 
      ? [activeSelection ]
      : [];
    
    console.log('Selected images:', picked);
    
    if (typeof onAdd === 'function') {
      const processed = picked.map(img => ({
        url: img.url,
        title: img.title || '',
        alt: img.altText || ''
      }));
      console.log('Processed images:', processed);
      onAdd(processed);
    } else {
      console.log('onAdd function not available');
    }
    setActiveSelection(null);
    setPreviewTargetImage(null);
    onClose();
  };


  return (
    <div className="bg-white p-4 flex flex-col space-y-4 h-full">
      <h2 className="text-xl font-semibold">Insert Media</h2>

      <div className="flex space-x-2">
        {/* <button
          onClick={handleUploadClick}
  className="px-4 py-2 bg-transparent border border-gray-300 text-black hover:border-indigo-500 hover:text-indigo-700 transition rounded-md"
          disabled={isUploading}        >
          {isUploading ? 'Uploading...' : 'Upload from File'}
        </button> */}
        {/* <button
 onClick={refetchMedia} 
          className="px-4 py-2 bg-transparent border border-indigo-500 text-indigo-500 hover:bg-indigo-50 transition rounded-md"
          disabled={isLoadingMedia}        >
          Media Library
        </button> */}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex justify-between">
        <button
          onClick={toggleBulkMode}
className="px-4 py-2 rounded-md bg-indigo-500 border border-indigo-500 text-white hover:bg-indigo-600 transition"
          disabled={isDeleting}        >
      {bulkMode ? 'Cancel' : 'Select'}
  </button>
        <button
          onClick={handleAdd}
className="px-4 py-2 rounded-md bg-indigo-600 border border-indigo-600 text-white hover:bg-indigo-700 transition"
          disabled={(!bulkMode && !activeSelection) || (bulkMode && checkedImages.length === 0) || isDeleting}
               >
          Add
        </button>
      </div>

          {isLoadingMedia && <p className="text-center py-4">Loading media...</p>}
      {isMediaError && <p className="text-center py-4 text-red-500">Error fetching media: {mediaError?.data?.message || mediaError?.error}</p>}
      {!isLoadingMedia && !isMediaError && images.length === 0 && <p className="text-center py-4">No media items in the library. Upload some!</p>}




      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto flex-grow">
        {!isLoadingMedia && !isMediaError && images.map(image => (          <div
 key={image.filename || image._id || image.url}            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredImage(image.filename)}
            onMouseLeave={() => setHoveredImage(null)}
            onClick={() => {
               if (!bulkMode) {
                setActiveSelection(image);
              }
            }}
          >
            {!bulkMode && hoveredImage === image.filename && (
              <div className="absolute top-1 right-1 opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTargetImage(image);
                    setActiveSelection(image); 
                  }}
                  className="p-1.5 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 focus:outline-none transition-colors"
                  aria-label="Preview image"
                  title="Preview image"
                >
                  <FaEye size={18} />
                </button>
              </div>
            )} 
            

             {bulkMode && (
              <input
                type="checkbox"
                checked={checkedImages.includes(image.filename)}
                onChange={() => toggleCheckbox(image.filename)}
                className="absolute top-2 left-2 z-10 w-5 h-5"
              />
            )}

                       <img
              src={image.url}
              alt={image.title}
              className={`w-full h-32 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow ${
                activeSelection?.filename === image.filename && !bulkMode
                  ? 'ring-2 ring-indigo-500'
                  : ''
              }`}
            />
          </div>
        ))}
      </div>

      {previewTargetImage && !bulkMode && (
        <ImagePreview
          image={previewTargetImage}
          onClose={() => setPreviewTargetImage(null)}
          onUpdatedData={handleUpdateImageData} 
          onRemoveImage={handleRemoveImage}
        />
      )}
    </div>
  );
};

export default MediaCenter;