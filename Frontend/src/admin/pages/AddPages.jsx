// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import ConfirmationModal from '../../reusables/ConfirmationModal';
// import JoditEditor from 'jodit-react';
// import Modal from 'react-modal'
// import { MediaCenter } from './MediaCenter';
// import { IoCloseCircleOutline } from "react-icons/io5";


// const AddPages = () => {
//   const editorRef = useRef(null);
//   const navigate = useNavigate();

//   const [titleInput, setTitleInput] = useState('');
//   const [editorContent, setEditorContent] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isMediaCenterOpen, setIsMediaCenterOpen] = useState(false)
//   const [parentOptions, setParentOptions] = useState([]);
//   const [selectedParentId, setSelectedParentId] = useState(null);
//   const [isParentDropdownOpen, setIsParentDropdownOpen] = useState(false);

//   useEffect(() => {
//     const fetchParents = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:3000/pages/all');
//         setParentOptions([{ _id: null, title: 'None' }, ...data]);
//       } catch (err) {
//         console.error('Failed to load parent pages:', err);
//       }
//     };
//     fetchParents();
//   }, []);

//   const selectedParentTitle =
//     parentOptions.find(p => p._id === selectedParentId)?.title || 'None';

//   const slug = titleInput.trim().toLowerCase().replace(/\s+/g, '-') || '';

//   const handleSubmit = async status => {
//     if (!editorContent || editorContent === '<p><br></p>') {
//       alert('Please enter some content');
//       return;
//     }
    
//     const clean = editorContent.replace(/<button[\s\S]*?<\/button>/g, '');
    
//     let imageUrl = null;
//     try {
//       const imgMatch = clean.match(/<img[^>]+src="([^"]+)"/);
//       imageUrl = imgMatch ? imgMatch[1] : null;
      
//       if (imageUrl && imageUrl.startsWith('data:image')) {
//         imageUrl = null;
//       }
//     } catch (err) {
//       console.error('Error extracting image:', err);
//       imageUrl = null;
//     }
  
//     try {
//       const response = await axios.post('http://localhost:3000/pages/create', {
//         title: titleInput.trim(),
//         content: clean,
//         slug,
//         status,
//         parent: selectedParentId,
//         image: imageUrl
//       });
      
//       console.log('Server response:', response.data);
      
//       alert(
//         status === 'Draft'
//           ? 'Page drafted successfully!'
//           : 'Page published successfully!'
//       );
//       navigate('/admin/pages');
//     } catch (err) {
//       console.error('Submission error:', err.response?.data || err.message);
//       alert(`Failed: ${err.response?.data?.message || err.message}`);
//     }
//   };
  
//   return (
//     <div className="h-screen w-full p-4 flex">
//       {/* Editor Section */}
//       <div className="w-3/4 flex flex-col">
//         <div className="mb-4 text-sm text-gray-600">
//           <span
//             className="cursor-pointer text-gray-400"
//             onClick={() => navigate('/admin/pages')}
//           >
//             Pages
//           </span>
//           <span className="mx-1">/</span>
//           <span className="font-semibold text-indigo-600">Add</span>
//         </div>

//         <form className="h-full w-full flex flex-col shadow-lg">
//           <input
//             type="text"
//             placeholder="Enter title"
//             className="mb-6 text-2xl focus:outline-none"
//             value={titleInput}
//             onChange={e => setTitleInput(e.target.value)}
//             required
//           />

//           <div className="flex-1 overflow-visible text-black">
            // <JoditEditor
            //   ref={editorRef}
            //   defaultValue={editorContent}
            //   onBlur={newContent => setEditorContent(newContent)}
            //   config={{
            //     readonly: false,
            //     height: 600,
            //     uploader: { insertImageAsBase64URI: true },
            //     buttons: [
            //       'bold',
            //       'italic',
            //       'underline',
            //       'strikethrough',
            //       '|',
            //       'align',
            //       'font',
            //       'fontsize',
            //       'paragraph',
            //       '|',
            //       'image',
            //       'video',
            //       'table',
            //       '|',
            //       'ul',
            //       'ol',
            //       'outdent',
            //       'indent',
            //       '|',
            //       'undo',
            //       'redo',
            //       'hr',
            //       'eraser',
            //       'copyformat',
            //       '|',
            //       'fullsize',
            //       'selectall',
            //       'source'
            //     ],
            //     image: {
            //       resize: true,
            //       editMargins: true,
            //       openOnDblClick: true,
            //       editSrc: true,
            //       align: true
            //     }
            //   }}
            // />
//           </div>
//         </form>
//       </div>

//       {/* Sidebar Panel */}
//       <div className="w-1/4 ml-4 h-full">
//       <button
//           onClick={() => setIsMediaCenterOpen(true)}
//           className="absolute rounded bg-indigo-500 px-6 py-2 text-white"
//         >
//           Media Library
//         </button>


//         <Modal
//       isOpen={isMediaCenterOpen}
//       onRequestClose={() => setIsMediaCenterOpen(false)}
//       overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
//       className="bg-white rounded-xl shadow-2xl w-[90%] h-[90vh] max-w-6xl outline-none"
    
//       >

//         <div className="flex justify-end items-center mb-4">
//           <button
//             onClick={() => setIsMediaCenterOpen(false)}
//             className="text-gray-500 hover:text-gray-800 bg-transparent"
//           >
//     <IoCloseCircleOutline size={23}/>
// </button>
//         </div>

//         <MediaCenter onClose={() => setIsMediaCenterOpen(false)} />
//       </Modal>


//         <div className="mt-20 space-y-1">
//     <button
//       onClick={() => handleSubmit('Draft')}
//       className="rounded bg-indigo-500 px-6 py-2 mr-10 text-white"
//     >
//       Draft
//     </button>

//     <button
//       onClick={() => setIsModalOpen(true)}
//       className="rounded bg-indigo-500 px-6 py-2 text-white"
//     >
//       Publish
//     </button>
//   </div>

//         <div className="relative mt-4 h-full rounded bg-white p-4 shadow-md">
//           <p className="mb-4 text-indigo-600">Link</p>
//           <p className="text-sm text-gray-500">Slug: /{slug}</p>
//           <p className="text-sm text-gray-500">URL: http://localhost:5173/{slug}</p>

//           <div className="mt-4">
//             {/* Status display */}
//             <label className="ml-2 mb-2 block text-sm text-gray-700">
//               Status <span className="text-indigo-500">Draft</span>
//             </label>

//             {/* Custom Parent dropdown */}
//             <div className="relative">
//               <div
//                 className="cursor-pointer rounded px-2 py-1 flex justify-between items-center"
//                 onClick={() => setIsParentDropdownOpen(open => !open)}
//               >
//                 <span className="text-sm  text-gray-700">
//                 Parent <span className="text-indigo-500">{selectedParentTitle}</span>
//                 </span>
//                 <svg
//                   className="h-4 w-4 text-gray-500"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>

//               {isParentDropdownOpen && (
//                 <div className="absolute z-10 mt-1 w-full rounded border bg-white shadow-lg">
//                   {parentOptions.map(opt => (
//                     <div
//                       key={opt._id ?? 'none'}
//                       className="px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
//                       onClick={() => {
//                         setSelectedParentId(opt._id);
//                         setIsParentDropdownOpen(false);
//                       }}
//                     >
//                       {opt.title}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onConfirm={() => {
//           setIsModalOpen(false);
//           handleSubmit('Published');
//         }}
//         onCancel={() => setIsModalOpen(false)}
//         message="Are you sure you want to publish this page?"
//       />
//     </div>
//   );
// };

// export default AddPages;


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../reusables/ConfirmationModal';
import JoditEditor from 'jodit-react';
import Modal from 'react-modal';
import MediaCenter from './MediaCenter';
import { IoCloseCircleOutline } from "react-icons/io5";

const AddPages = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [titleInput, setTitleInput] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaCenterOpen, setIsMediaCenterOpen] = useState(false);
  const [parentOptions, setParentOptions] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [isParentDropdownOpen, setIsParentDropdownOpen] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Add a callback to handle editor initialization
  const handleEditorInit = () => {
    console.log('Editor initialized');
    setIsEditorReady(true);
  };

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/pages/all');
        setParentOptions([{ _id: null, title: 'None' }, ...data]);
      } catch (err) {
        console.error('Failed to load parent pages:', err);
      }
    };
    fetchParents();
  }, []);

  useEffect(() => {
    if (editorRef.current && editorRef.current.editor && !isEditorReady) {
      console.log('Setting editor ready state');
      setIsEditorReady(true);
    }
  }, [editorRef.current, isEditorReady]);

  const selectedParentTitle =
    parentOptions.find(p => p._id === selectedParentId)?.title || 'None';

  const slug = titleInput.trim().toLowerCase().replace(/\s+/g, '-') || '';

  const handleInsertMedia = async (images) => {
    console.log('handleInsertMedia called with images:', images);
    
    if (!images.length) {
      console.log('No images to insert');
      return;
    }
  
    if (!isEditorReady) {
      console.log('Editor not ready yet');
      return;
    }
  
    try {
      if (!editorRef.current || !editorRef.current.editor) {
        console.log('Waiting for editor to be ready...');
        return;
      }
  
      const editor = editorRef.current.editor;
      console.log('Editor instance:', editor);
      
      images.forEach((img) => {
        console.log('Inserting image:', img);
        const imgHtml = `
          <img 
            src="${img.url}" 
            alt="${img.alt || ''}" 
            style="max-width: 100%; display: block; margin: 0.5rem auto;"
          />
        `;
        
        // Use Jodit's insertHTML method
        editor.s.insertHTML(imgHtml);
      });
  
      // Wait a moment for the editor to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Update the content state
      const currentValue = editorRef.current?.value || '';
      setEditorContent(currentValue);
      console.log('Editor content updated:', currentValue);
    } catch (err) {
      console.error('Error inserting images:', err);
      alert('Failed to insert images: ' + err.message);
    }
  };  
  
  const handleSubmit = async status => {
    if (!editorContent || editorContent === '<p><br></p>') {
      alert('Please enter some content');
      return;
    }
    
    const clean = editorContent.replace(/<button[\s\S]*?<\/button>/g, '');
    
    let imageUrl = null;
    try {
      const imgMatch = clean.match(/<img[^>]+src="([^"]+)"/);
      imageUrl = imgMatch ? imgMatch[1] : null;
      
      if (imageUrl && imageUrl.startsWith('data:image')) {
        imageUrl = null;
      }
    } catch (err) {
      console.error('Error extracting image:', err);
      imageUrl = null;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/pages/create', {
        title: titleInput.trim(),
        content: clean,
        slug,
        status,
        parent: selectedParentId,
        image: imageUrl
      });
      
      console.log('Server response:', response.data);
      
      alert(
        status === 'Draft'
          ? 'Page drafted successfully!'
          : 'Page published successfully!'
      );
      navigate('/admin/pages');
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      alert(`Failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="h-screen w-full p-4 flex">
      {/* Editor Section */}
      <div className="w-3/4 flex flex-col">
        <div className="mb-4 text-sm text-gray-600">
          <span
            className="cursor-pointer text-gray-400"
            onClick={() => navigate('/admin/pages')}
          >
            Pages
          </span>
          <span className="mx-1">/</span>
          <span className="font-semibold text-indigo-600">Add</span>
        </div>

        <form className="h-full w-full flex flex-col shadow-lg">
          <input
            type="text"
            placeholder="Enter title"
            className="mb-6 text-2xl focus:outline-none"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
            required
          />

          <div className="flex-1 overflow-visible text-black">
          <JoditEditor
              ref={editorRef}
              defaultValue={editorContent}
              onBlur={newContent => setEditorContent(newContent)}
              config={{
                readonly: false,
                height: 600,
                uploader: { insertImageAsBase64URI: true },
                buttons: [
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  '|',
                  'align',
                  'font',
                  'fontsize',
                  'paragraph',
                  '|',
                  'image',
                  'video',
                  'table',
                  '|',
                  'ul',
                  'ol',
                  'outdent',
                  'indent',
                  '|',
                  'undo',
                  'redo',
                  'hr',
                  'eraser',
                  'copyformat',
                  '|',
                  'fullsize',
                  'selectall',
                  'source'
                ],
                image: {
                  resize: true,
                  editMargins: true,
                  openOnDblClick: true,
                  editSrc: true,
                  align: true
                }
              }}
            />     </div>
        </form>
      </div>

      {/* Sidebar Panel */}
      <div className="w-1/4 ml-4 h-full">
        <button
          onClick={() => setIsMediaCenterOpen(true)}
          className="absolute rounded bg-indigo-500 px-6 py-2 text-white"
        >
          Media Library
        </button>

        <Modal
          isOpen={isMediaCenterOpen}
          onRequestClose={() => setIsMediaCenterOpen(false)}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          className="bg-white rounded-xl shadow-2xl w-[90%] h-[90vh] max-w-6xl outline-none"
        >
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={() => setIsMediaCenterOpen(false)}
              className="text-gray-500 hover:text-gray-800 bg-transparent"
            >
              <IoCloseCircleOutline size={23}/>
            </button>
          </div>

          <MediaCenter
            onClose={() => setIsMediaCenterOpen(false)}
            onAdd={(images) => {
              console.log('MediaCenter onAdd called with images:', images);
              handleInsertMedia(images);
            }}
          />
        </Modal>

        <div className="mt-20 space-y-1">
          <button
            onClick={() => handleSubmit('Draft')}
            className="rounded bg-indigo-500 px-6 py-2 mr-10 text-white"
          >
            Draft
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded bg-indigo-500 px-6 py-2 text-white"
          >
            Publish
          </button>
        </div>

        <div className="relative mt-4 h-full rounded bg-white p-4 shadow-md">
          <p className="mb-4 text-indigo-600">Link</p>
          <p className="text-sm text-gray-500">Slug: /{slug}</p>
          <p className="text-sm text-gray-500">URL: http://localhost:5173/{slug}</p>

          <div className="mt-4">
            {/* Status display */}
            <label className="ml-2 mb-2 block text-sm text-gray-700">
              Status <span className="text-indigo-500">Draft</span>
            </label>

            {/* Custom Parent dropdown */}
            <div className="relative">
              <div
                className="cursor-pointer rounded px-2 py-1 flex justify-between items-center"
                onClick={() => setIsParentDropdownOpen(open => !open)}
              >
                <span className="text-sm  text-gray-700">
                  Parent <span className="text-indigo-500">{selectedParentTitle}</span>
                </span>
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {isParentDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded border bg-white shadow-lg">
                  {parentOptions.map(opt => (
                    <div
                      key={opt._id ?? 'none'}
                      className="px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedParentId(opt._id);
                        setIsParentDropdownOpen(false);
                      }}
                    >
                      {opt.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={() => {
          setIsModalOpen(false);
          handleSubmit('Published');
        }}
        onCancel={() => setIsModalOpen(false)}
        message="Are you sure you want to publish this page?"
      />
    </div>
  );
};

export default AddPages;