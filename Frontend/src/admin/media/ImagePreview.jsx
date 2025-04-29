import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";

const ImagePreview = ({ image, onClose, onUpdateAltText,onRemoveImage  }) => {
  if (!image) return null;

  const { url, filename, size, altText, title,description } = image; 
  const sizeInMB = (size / (1024 * 1024)).toFixed(2);
  const [altTextInput, setAltTextInput] = useState(altText || '');  
  const [urlInput, setUrlInput] = useState(url);
  const [descriptionInput, setDescriptionInput] = useState(description || ''); 
  const [titleInput, setTitleInput] = useState(title || filename.replace(/\s+/g, '-')); 

  const handleAltTextChange = (e) => setAltTextInput(e.target.value);

  const handleTitleChange = (e) => {
    const normalized = e.target.value.replace(/\s+/g, '-');
    setTitleInput(normalized);
  };  
  const handleSaveAltText = async () => {
    const res = await fetch('http://localhost:3000/media/alttext', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: image.url,
        altText: altTextInput,
        title:titleInput,
        description: descriptionInput,
            }),
      
    });

    if (res.ok) {
      onUpdateAltText(image.url, altTextInput,titleInput); 
      onClose(); 
    } else {
      console.error('Failed to update alt text');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none bg-transparent"
        >
          <IoIosCloseCircleOutline size={25} />
        </button>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-4">
            <img
              src={url}
              alt={altTextInput}
              className="w-full h-auto rounded-lg object-contain shadow-inner"
            />
          </div>

          <div className="lg:w-1/2 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Image Details</h2>

              <div>
                <p className="text-gray-700 text-sm"><span>File name:</span> {filename}</p>
                <p className="text-gray-700 text-sm"><span>File size:</span> {sizeInMB} MB</p>
              </div>

              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-1 text-sm">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={titleInput}
                  onChange={handleTitleChange} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter a title for the image..."
                />
              </div>


              <div>
                <label htmlFor="altText" className="block text-gray-700 font-medium mb-1 text-sm">
                  Alternative Text
                </label>
                <input
                  id="altText"
                  type="text"
                  value={altTextInput}
                  onChange={handleAltTextChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter..."
                />
              </div>

              <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1 text-sm">
                Description
              </label>
              <textarea
                id="description"
                value={descriptionInput}
                onChange={(e)=>setDescriptionInput(e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-xl px-4 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Add a description..."
              />
            </div>

            <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-1 text-sm">
                  File URL
                </label>
                <input
                  id="url"
                  type="text"
                  value={urlInput}
                  onChange={(e)=>setUrlInput(e.target.value)} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-1  text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  readOnly
                />
              </div>

<div className="flex items-center space-x-4">
  <span
    className="text-black text-sm cursor-pointer hover:underline"
    onClick={() => { }}
  >Download file</span>

  <span className="text-black text-sm">|</span>

  <span
  className="text-red-700 text-sm cursor-pointer hover:text-red-600 hover:underline"
  onClick={async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image permanently?');
    if (confirmDelete) {
      try {
        const res = await fetch(`http://localhost:3000/media/delete/${filename}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          onRemoveImage(filename);
          alert('File deleted successfully');
          onClose(); 
        } else {
          alert('Failed to delete file');
        }
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('Error deleting file');
      }
    }
  }}
>
  Delete Permanently
</span>


</div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveAltText}
              className="mt-6 bg-indigo-600 text-white font-semibold rounded-xl px-6 py-3 hover:bg-indigo-700 transition-all shadow-lg self-start"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
