// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import ImagePreview from '../media/ImagePreview';

// export const MediaCenter = ({ onClose, onAdd }) => {
//   const fileInputRef = useRef(null);
//   const [images, setImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [hoveredImage, setHoveredImage] = useState(null);
//   const [checkedImages, setCheckedImages] = useState([]);
//   const [bulkMode, setBulkMode] = useState(false);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = e => {
//     const file = e.target.files[0];
//     if (file) {
//       console.log('Selected file:', file);
//       // your upload logic here...
//     }
//   };

//   const fetchImages = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:3000/media/all');
//       setImages(data);
//     } catch (err) {
//       console.error('Error fetching images:', err);
//     }
//   };

//   const handleUpdateImageData = (url, altText, title, description) => {
//     setImages(prev =>
//       prev.map(img =>
//         img.url === url ? { ...img, altText, title, description } : img
//       )
//     );
//   };

//   const handleRemoveImage = filename => {
//     setImages(prev => prev.filter(img => img.filename !== filename));
//   };

//   const toggleBulkMode = () => {
//     setBulkMode(m => !m);
//     setCheckedImages([]);
//     setSelectedImage(null);
//   };

//   const toggleCheckbox = filename => {
//     setCheckedImages(prev =>
//       prev.includes(filename)
//         ? prev.filter(name => name !== filename)
//         : [...prev, filename]
//     );
//   };

//   const handleAdd = () => {
//     const picked = bulkMode
//       ? images.filter(img => checkedImages.includes(img.filename))
//       : selectedImage
//       ? [selectedImage]
//       : [];
//     onAdd(picked);
//     onClose();
//   };

//   return (
//     <div className="bg-white p-4 flex flex-col space-y-4 h-full">
//       <h2 className="text-xl font-semibold">Insert Media</h2>

//       <div className="flex space-x-2">
//         <button
//           onClick={handleUploadClick}
//           className="px-4 py-2 bg-transparent border text-black hover:text-indigo-700 transition"        >
//           Upload from File
//         </button>
//         <button
//           onClick={fetchImages}
//           className="px-4 py-2 bg-transparent border text-indigo-500 hover:text-indigo-700 transition"        >
//           Media Library
//         </button>
//       </div>

//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="hidden"
//       />

//       <div className="flex justify-between">
//         <button
//           onClick={toggleBulkMode}
//           className="px-4 py-2 rounded-xl bg-indigo-500 border text-white hover:bg-indigo-700 transition"        >
//           {bulkMode ? 'Cancel Bulk' : 'Bulk select'}
//         </button>
//         <button
//           onClick={handleAdd}
//           disabled={
//             bulkMode
//               ? checkedImages.length === 0
//               : selectedImage === null
//           }
//           className="px-4 py-2 rounded-xl bg-indigo-500 border text-white hover:bg-indigo-700 transition"        >
//           Add
//         </button>
//       </div>

//       <div className="grid grid-cols-6 gap-4 overflow-auto">
//         {images.map(image => (
//           <div
//             key={image.filename}
//             className="relative"
//             onMouseEnter={() => setHoveredImage(image.filename)}
//             onMouseLeave={() => setHoveredImage(null)}
//             onClick={() => {
//               if (!bulkMode) setSelectedImage(image);
//             }}
//           >
//             {hoveredImage === image.filename && (
//               <div
//                 className="absolute top-2 left-2 z-10"
//                 onClick={e => e.stopPropagation()}
//               >
//                 {bulkMode && (
//                   <input
//                     type="checkbox"
//                     checked={checkedImages.includes(image.filename)}
//                     onChange={() => toggleCheckbox(image.filename)}
//                     className="w-5 h-5"
//                   />
//                 )}
//               </div>
//             )}

//             <img
//               src={image.url}
//               alt={image.title}
//               className={`w-full h-32 object-cover rounded ${
//                 selectedImage?.filename === image.filename && !bulkMode
//                   ? 'ring-2 ring-indigo-500'
//                   : ''
//               }`}
//             />
//           </div>
//         ))}
//       </div>

//       {selectedImage && !bulkMode && (
//         <ImagePreview
//           image={selectedImage}
//           onClose={() => setSelectedImage(null)}
//           ononUpdatedData={handleUpdateImageData}
//           onRemoveImage={handleRemoveImage}
//         />
//       )}
//     </div>
//   );
// };

// export default MediaCenter;


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ImagePreview from '../media/ImagePreview';

const MediaCenter = ({ onClose, onAdd }) => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [checkedImages, setCheckedImages] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const { data } = await axios.post('http://localhost:3000/media/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Upload response:', data);
        fetchImages(); // Refresh the images list after upload
      } catch (err) {
        console.error('Upload error:', err);
        alert('Failed to upload image: ' + err.message);
      }
    }
  };
  const fetchImages = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/media/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Fetched images:', data);
      setImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
      alert('Failed to fetch images');
    }
  };

  const handleUpdateImageData = (url, altText, title, description) => {
    setImages(prev =>
      prev.map(img =>
        img.url === url ? { ...img, altText, title, description } : img
      )
    );
  };

  const handleRemoveImage = async (filename) => {
    try {
      await axios.delete(`http://localhost:3000/media/${filename}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setImages(prev => prev.filter(img => img.filename !== filename));
    } catch (err) {
      console.error('Error removing image:', err);
      alert('Failed to remove image');
    }
  };

  const toggleBulkMode = () => {
    if (bulkMode) {
      setCheckedImages([]);
      setSelectedImage(null);
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
      : selectedImage
      ? [selectedImage]
      : [];
    
    console.log('Selected images:', picked);
    
    if (typeof onAdd === 'function') {
      const processed = picked.map(img => ({
        url: img.url.startsWith('http') ? img.url : `http://localhost:3000${img.url}`,
        title: img.title || '',
        alt: img.altText || ''
      }));
      console.log('Processed images:', processed);
      onAdd(processed);
    } else {
      console.log('onAdd function not available');
    }
    
    onClose();
  };


  return (
    <div className="bg-white p-4 flex flex-col space-y-4 h-full">
      <h2 className="text-xl font-semibold">Insert Media</h2>

      <div className="flex space-x-2">
        <button
          onClick={handleUploadClick}
          className="px-4 py-2 bg-transparent border text-black hover:text-indigo-700 transition"
        >
          Upload from File
        </button>
        <button
          onClick={fetchImages}
          className="px-4 py-2 bg-transparent border text-indigo-500 hover:text-indigo-700 transition"
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

      <div className="flex justify-between">
        <button
          onClick={toggleBulkMode}
          className="px-4 py-2 rounded-xl bg-indigo-500 border text-white hover:bg-indigo-700 transition"
        >
      {bulkMode ? 'Cancel' : 'Select Multiple'}
  </button>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-xl bg-indigo-500 border text-white hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      {selectedImage && !bulkMode && (
        <ImagePreview
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onUpdatedData={handleUpdateImageData} 
          onRemoveImage={handleRemoveImage}
        />
      )}

      <div className="grid grid-cols-6 gap-4 overflow-auto">
        {images.map(image => (
          <div
            key={image.filename}
            className="relative"
            onMouseEnter={() => setHoveredImage(image.filename)}
            onMouseLeave={() => setHoveredImage(null)}
            onClick={() => {
              if (!bulkMode) setSelectedImage(image);
            }}
          >
            {bulkMode && (
              <input
                type="checkbox"
                checked={checkedImages.includes(image.filename)}
                onChange={() => toggleCheckbox(image.filename)}
                className="w-5 h-5"
              />
            )}

            <img
              src={image.url}
              alt={image.title}
              className={`w-full h-32 object-cover rounded ${
                selectedImage?.filename === image.filename && !bulkMode
                  ? 'ring-2 ring-indigo-500'
                  : ''
              }`}
            />
          </div>
        ))}
      </div>

      {selectedImage && !bulkMode && (
        <ImagePreview
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onUpdatedData={handleUpdateImageData} 
          onRemoveImage={handleRemoveImage}
        />
      )}
    </div>
  );
};

export default MediaCenter;