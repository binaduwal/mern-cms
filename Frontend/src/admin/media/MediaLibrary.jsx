import React, { useEffect, useState, useRef } from 'react';
import SearchBar from '../../reusables/SearchBar';
import ImagePreview from './ImagePreview';

const MediaLibrary = () => {
  const [media, setMedia] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

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

const fetchMedia = async () => {
  try {
    const response = await fetch('http://localhost:3000/media/all');
    const data = await response.json();
    
    const mediaWithSizes = await Promise.all(data.map(async (item) => {
      try {
        const size = await getImageSize(item.url);
        return {
          ...item,
          width: size.width,
          height: size.height,
        };
      } catch (error) {
        console.error(`Failed to get size for ${item.url}:`, error);
        return {
          ...item,
          width: null,
          height: null,
        };
      }
    }));

    setMedia(mediaWithSizes);
  } catch (error) {
    console.error('Error fetching media:', error);
  }
};

  const handleAddNewClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3000/media/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data); 

      if (response.ok) {
        setMedia((prevMedia) => [...prevMedia, {
          filename: file.name,
          url: data.imageUrl,
          size: file.size,
          altText: file.name,
        }]);
      } else {
        console.error('File upload failed:', data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

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
    try {
      for (const url of selectedItems) {
        const filename = url.split('/').pop();
        await fetch(`http://localhost:3000/media/delete/${filename}`, {
          method: 'DELETE',
        });
      }

      setMedia((prevMedia) =>
        prevMedia.filter((item) => !selectedItems.includes(item.url))
      );

      setSelectedItems([]);
      setBulkSelectMode(false);
    } catch (error) {
      console.error('Error deleting files:', error);
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
    setMedia((prevMedia) =>
      prevMedia.map((item) =>
        item.url === url ? { ...item, altText: newAltText,title: newTitle, description: newDescription   } : item
      )
    );
  };

  const removeImage = (filename) => {
    setMedia((prevImages) => prevImages.filter((image) => image.filename !== filename));
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Media Library</h3>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md"
          onClick={handleAddNewClick}
        >
          + Add New
        </button>
      </div>

        <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
        {bulkSelectMode ? (
          <>
            <button
              onClick={deleteSelectedItems}
              className="bg-transparent border border-indigo-500 text-indigo-500 px-2 py-2 rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-md"
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {media.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-all bg-white cursor-pointer"
            onClick={() => {
              console.log('Clicked image URL:', item.url);
              openPreview(item);
            }}  
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
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"></div>
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
