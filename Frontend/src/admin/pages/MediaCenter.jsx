import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import ImagePreview from '../media/ImagePreview';

export const MediaCenter = () => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [checkedImages, setCheckedImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
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


  const toggleCheckbox = (filename) => {
    setCheckedImages(prev =>
      prev.includes(filename)
        ? prev.filter(name => name !== filename)
        : [...prev, filename]
    );
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
          className="px-4 py-2 bg-transparent border text-indigo-500 hover:text-indigo-700 transition"
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

      <div className='flex justify-between'>
      <button className="px-4 py-2 rounded-xl bg-indigo-500 border text-white hover:bg-indigo-700 transition">
      Bulk select
        </button>

      <button className="px-4 py-2 mr-3 rounded-xl bg-indigo-500 border text-white hover:bg-indigo-700 transition">
        Add
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-4">
        {images.map(image => (
          <div
            key={image.filename}
            className="relative cursor-pointer"
            onMouseEnter={() => setHoveredImage(image.filename)}
            onMouseLeave={() => setHoveredImage(null)}
            onClick={() => {
              if (!checkedImages.includes(image.filename)) {
                setSelectedImage(image);
              }
            }}          >
            {hoveredImage === image.filename && (
              
              <div
        className="absolute top-2 left-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={checkedImages.includes(image.filename)}
          onChange={() => toggleCheckbox(image.filename)}
          className="w-4 h-4"
        />
      </div>
            )}

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
