import React from 'react';

const PreviewImage = ({ previewImage, imageFile }) => {
  if (!previewImage) return null;

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-1">Current/New Image Preview:</p>
      <img
        src={previewImage}
        alt="Banner Preview"
        className="max-h-40 rounded border border-gray-300"
      />
    </div>
  );
};

export default PreviewImage;
