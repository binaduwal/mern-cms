import React, { useState, useRef } from 'react';
import axios from 'axios';
import ImagePreview from '../media/ImagePreview';

export const MediaCenter = () => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      // Handle upload logic here
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/media/all');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleUpdateImageData = (url, altText, title, description) => {
    setImages(prev => prev.map(img => 
      img.url === url ? { ...img, altText, title, description } : img
    ));
  };

  const handleRemoveImage = (filename) => {
    setImages(prev => prev.filter(img => img.filename !== filename));
  };

  return (
    <div className="bg-white ml-2 flex flex-col space-y-4">
      <h2 className="text-xl ml-2 font-semibold">Insert Media</h2>
      <div>
        <button
          onClick={handleUploadClick}
          className="px-4 py-2 bg-transparent border text-black hover:text-indigo-700 transition"
        >
          Upload from File
        </button>

        <button
          className="px-4 py-2 bg-transparent border text-black hover:text-indigo-700 transition"
          onClick={fetchImages}
        >
          Media Library
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="grid grid-cols-6 gap-4 mt-4">
        {images.map(image => (
          <div
            key={image.filename}
            className="relative cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-32 object-cover rounded"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImagePreview
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          ononUpdatedData={handleUpdateImageData}
          onRemoveImage={handleRemoveImage}
        />
      )}
    </div>
  );
};

export default MediaCenter;

