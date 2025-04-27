import React, { useEffect, useState,useRef  } from 'react';

const MediaLibrary = () => {
  const [media, setMedia] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('http://localhost:3000/media/all');
        const data = await response.json();
        setMedia(data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, []);
  const handleAddNewClick = () => {
    fileInputRef.current.click(); 
  };


  const handleFileChange=async(e)=>{
    const file=e.target.files[0]
    if(!file)
        return

    const formData=new FormData();
    formData.append('image',file);

    try {
        const response=await fetch('http://localhost:3000/media/upload',{
            method:'POST',
            body:formData,
        })
        const data = await response.json();
        if (response.ok) {
            setMedia((prevMedia) => [...prevMedia, { filename: file.name, url: data.imageUrl }]);
          } else {
            console.error('File upload failed:', data.message);
          }
    } catch (error) {
        console.error('Error uploading file:', error);

    }
  }
  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold mb-4">Media Library</h3>
      <button className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
    onClick={handleAddNewClick}
>
        
        
        Add New
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {media.map((item, index) => (
          <div key={index} className="media-item relative">
            <img
              src={item.url}
              alt={item.filename}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0  text-white text-xs p-2 rounded-b-lg">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
