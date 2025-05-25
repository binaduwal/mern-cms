import React, { useEffect, useState, useRef } from 'react';
import SearchBar from '../../reusables/SearchBar';
import ImagePreview from './ImagePreview';
import { FaEye } from 'react-icons/fa';
import { 
  useAddItemMutation,
  useDeleteItemMutation,
  useGetItemQuery, 
} from '../../app/services/QuerySettings';
import { toast } from 'react-hot-toast';
const MediaLibrary = () => {
  const [processedMedia, setProcessedMedia] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

 const { 
    data: apiResponse, 
    isLoading: isLoadingMedia, 
    isError: isMediaError, 
    error: mediaError, 
    refetch: refetchMedia 
  } = useGetItemQuery({ url: '/media/all' }, { refetchOnMountOrArgChange: true });

  const [uploadFileMutation, { isLoading: isUploading }] = useAddItemMutation();
  const [deleteFileMutation, { isLoading: isDeleting }] = useDeleteItemMutation();


const getImageSize = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (error) => {
      console.error(`Error loading image at ${url}:`, error);
      reject(error);
    };
  });
};  

const isValidImageUrl = (url) => {
  if (typeof url !== 'string') return false;
  return /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(url);
};


useEffect(() => {
  const processFetchedMedia = async () => {
if (apiResponse && Array.isArray(apiResponse)) {
  const imageFiles = apiResponse.filter(item => isValidImageUrl(item.url));
  const mediaWithSizes = await Promise.all(
    imageFiles.map(async (item) => {
      try {
        const size = await getImageSize(item.url);
        return { ...item, width: size.width, height: size.height };
      } catch (error) {
        return { ...item, width: null, height: null };
      }
    })
  );
  setProcessedMedia(mediaWithSizes);
}
    
    else if (apiResponse) {
      console.warn("API response for media is not an array:", apiResponse);
      setProcessedMedia([]);
    } else {
      setProcessedMedia([]);
    }
  };

  processFetchedMedia();
}, [apiResponse]);

  const handleAddNewClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
     await uploadFileMutation({ 
        url: '/media/upload', 
        data: formData,
      }).unwrap();
      toast.success('File uploaded successfully!');
      refetchMedia(); 
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(error?.data?.message || error?.message || 'File upload failed.');

    }
  };

  const filteredMedia = processedMedia.filter(item => 
    (item.filename && item.filename.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.altText && item.altText.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSelectItem = (item) => {
    if (selectedItems.includes(item.url)) {
      setSelectedItems((prev) => prev.filter((url) => url !== item.url));
    } else {
      setSelectedItems((prev) => [...prev, item.url]);
    }
  };

  const handleBulkSelection = () => {
    setBulkSelectMode((prev) => !prev);
    setSelectedItems([]);
  };

  const deleteSelectedItems = async () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected for deletion.");
      return;
    }
    const toastId = toast.loading("Deleting selected items...");
    
    try {
      for (const url of selectedItems) {
        const filename = url.split('/').pop();
        await deleteFileMutation({ url: `/media/delete/${filename}` }).unwrap();
      }

    toast.success('Selected items deleted successfully!', { id: toastId });
      refetchMedia();
      setSelectedItems([]);
      setBulkSelectMode(false);
    } catch (error) {
      console.error('Error deleting files:', error);
      toast.error(error?.data?.message || 'Failed to delete some items.', { id: toastId });

    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openPreview = (item) => {
    setPreviewImage(item);
    setIsPreviewOpen(true);
  };
  
  const closePreview = () => {
    setPreviewImage(null);
    setIsPreviewOpen(false);
  };
  
  const onUpdatedData = (url, newAltText,newTitle,newDescription) => {
    setProcessedMedia((prevMedia) =>
      prevMedia.map((item) =>
        item.url === url ? { ...item, altText: newAltText,title: newTitle, description: newDescription   } : item
      )
    );
    refetchMedia();
  };

const removeImage = (filename) => {
    // setMedia((prevImages) => prevImages.filter((image) => image.filename !== filename));
    refetchMedia();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Media Library</h3>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md"
          onClick={handleAddNewClick}
        >
          {isUploading ? 'Uploading...' : '+ Add New'}
        </button>
      </div>

        <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
        {bulkSelectMode ? (
          <>
            <button
              onClick={deleteSelectedItems}
              className="bg-transparent border border-indigo-500 text-indigo-500 px-2 py-2 rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-md"
              disabled={isDeleting || selectedItems.length === 0}

            >
              Delete Permanently
            </button>
            <button
              onClick={handleBulkSelection}
              className="bg-transparent border border-indigo-500 text-indigo-500 px-2 py-2 rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-md"
            >
              Cancel Selection
            </button>
          </>
        ) : (
          <button
            onClick={handleBulkSelection}
            className="bg-transparent border border-indigo-500 text-indigo-500 px-2 py-1 rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-md"
          >
            Bulk Select
          </button>
        )}

<SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {selectedItems.length > 0 && (
        <div className="mb-4 text-sm text-indigo-600">
          Selected {selectedItems.length} item(s)
        </div>
      )}

            {isLoadingMedia && <p className="text-center py-4">Loading media...</p>}
      {isMediaError && <p className="text-center py-4 text-red-500">Error fetching media: {mediaError?.data?.message || mediaError?.error}</p>}
      {!isLoadingMedia && !isMediaError && filteredMedia.length === 0 && searchTerm && <p className="text-center py-4">No media found matching "{searchTerm}".</p>}
      {!isLoadingMedia && !isMediaError && processedMedia.length === 0 && !searchTerm && <p className="text-center py-4">No media items in the library. Upload some!</p>}




      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {!isLoadingMedia && !isMediaError && filteredMedia.map((item, index) => (
          <div
        key={item._id || item.url || index}
            className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-all bg-white"
          >
            {bulkSelectMode && (
              <input
                type="checkbox"
                checked={selectedItems.includes(item.url)}
                onChange={() => toggleSelectItem(item)}
                className="absolute top-2 left-2 z-10 w-4 h-4"
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <img
              src={item.url}
              alt={item.filename}
              className="w-full h-36 object-cover rounded-t-lg"
          />
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openPreview(item);
                }}
                className="p-1.5 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 focus:outline-none transition-colors"
                aria-label="Preview image"
                title="Preview image"
              >
                <FaEye size={18}/>
              </button>
            </div> 
                     </div>
        ))}
      </div>

      {isPreviewOpen && 
      <ImagePreview 
      image={previewImage}
       onClose={closePreview}
      onRemoveImage={removeImage}
      ononUpdatedData={onUpdatedData}
       />}


    </div>
  );
};

export default MediaLibrary;
