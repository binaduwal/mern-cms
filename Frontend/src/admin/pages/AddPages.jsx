import React, { useState, useRef, useMemo, useEffect,useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ConfirmationModal from '../../reusables/ConfirmationModal';

const AddPages = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [parentOptions, setParentOptions] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [isParentDropdownOpen, setIsParentDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get('http://localhost:3000/pages/all');
        const options = Array.isArray(res.data)
          ? [{ _id: null, title: 'None' },
             ...res.data.map(p => ({ _id: p._id, title: p.title }))]
          : [{ _id: null, title: 'None' }];
        setParentOptions(options);
      } catch (err) {
        console.error('Error fetching pages:', err);
        setParentOptions([{ _id: null, title: 'None' }]);
      }
    };
    fetchPages();
  }, []);

  const selectedParent = parentOptions.find(p => p._id === selectedParentId)?.title || 'None';
  const slug = titleInput.trim().toLowerCase().replace(/\s+/g, '-') || '';



  // const imageHandler = useCallback(() => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  
  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     if (!file) return;
  
  //     try {
  //       const formData = new FormData();
  //       formData.append('image', file);
  
  //       const res = await axios.post('http://localhost:3000/pages/upload', formData, {
  //         headers: { 'Content-Type': 'multipart/form-data' }
  //       });
  
  //       const editor = editorRef.current.getEditor();
  //       const range = editor.getSelection();
  //       editor.insertEmbed(range.index, 'image', res.data.imageUrl);
  //       editor.setSelection(range.index + 1);
  //     } catch (err) {
  //       console.error('Upload failed:', err);
  //       alert(`Image upload failed: ${err.response?.data?.message || err.message}`);
  //     }
  //   };
  // }, []);

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
  
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const res = await axios.post('http://localhost:3000/pages/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
  
        const editor = editorRef.current.getEditor();
        let range = editor.getSelection();
        
        // Fallback to end of document if no selection
        if (!range) {
          const length = editor.getLength();
          range = { index: length, length: 0 };
        }
  
        // Insert image and update selection
        editor.insertEmbed(range.index, 'image', res.data.imageUrl);
        editor.setSelection(range.index + 1, 0, 'silent');
        editor.focus(); // Ensure editor regains focus
      } catch (err) {
        console.error('Upload failed:', err);
        alert(`Image upload failed: ${err.response?.data?.message || err.message}`);
      }
    };
  }, []);
  

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);  

  
  const parseContent = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const titleElement = doc.querySelector('h1') || doc.querySelector('p');
    return {
      title: titleElement?.textContent?.trim() || 'Untitled Page',
      content: html
    };
  };

  const { title } = useMemo(() => parseContent(editorContent), [editorContent]);

  const handleEditorChange = (content) => {
    setEditorContent(content === '<h1></h1><p>Type here...</p>' ? '<h1></h1>' : content);
  };

  const selectParent = (parentId) => {
    setSelectedParentId(parentId);
    setIsParentDropdownOpen(false);
  };

  const handleSubmit = async (status) => {
    if (!editorContent || editorContent === '<p><br></p>') {
      alert('Please enter some content');
      return;
    }

    try {
      await axios.post('http://localhost:3000/pages/create', {
        title: titleInput.trim(),
        content: editorContent,
        slug,
        status,
        parent: selectedParentId,
        image:null || ""
      });

      alert(status === 'Draft' ? 'Page drafted successfully!' : 'Page published successfully!');
      navigate('/admin/pages');
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      alert(`Failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const handlePublishClick = () => setIsModalOpen(true);
  const handleConfirmPublish = () => {
    setIsModalOpen(false);
    handleSubmit('Published');
  };
  const handleCancelModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen w-full p-4 flex">
      {/* Editor Section */}
      <div className="w-3/4 flex flex-col">
        <div className="mb-4 text-sm text-gray-600">
          <span className="text-gray-400 cursor-pointer" onClick={() => navigate('/admin/pages')}>Pages</span>
          <span className="mx-1">/</span>
          <span className="font-semibold text-indigo-600">Add</span>
        </div>

        <form className="h-full w-full flex flex-col shadow-lg">
          <input
            type="text"
            placeholder="Enter title"
            className="focus:outline-none mb-6 text-2xl"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            required
          />
          <div className="flex-1 overflow-visible text-black">
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={handleEditorChange}
              modules={modules}
              formats={[
                'header', 'bold', 'italic', 'underline', 'strike',
                'blockquote', 'list', 'bullet', 'link', 'image'
              ]}
              ref={editorRef}
              placeholder="Type here..."
              className="w-full h-full border-none focus:outline-none"
              style={{ minHeight: 'calc(100vh - 100px)',
                 display: 'flex',
    flexDirection: 'column'
               }}
              
            />
          </div>
        </form>
      </div>

      {/* Sidebar Panel */}
      <div className="w-1/4 ml-4 h-full">
        <button
          type="button"
          className="bg-indigo-500 text-white px-6 py-2 rounded mt-5 ml-5"
          onClick={() => handleSubmit('Draft')}
        >
          Draft
        </button>
        <button
          type="button"
          className="bg-indigo-500 text-white px-6 py-2 rounded mt-5 ml-8"
          onClick={handlePublishClick}
        >
          Publish
        </button>

        <div className="bg-white p-4 shadow-md rounded h-full mt-4 relative">
          <p className="text-indigo-600 mb-4">Link</p>
          <p className="text-sm text-gray-500">Slug: /{slug}</p>
          <p className="text-sm text-gray-500">URL: http://localhost:5173/{slug}</p>

          <div className="mt-4">
            <label className="text-sm text-gray-700 block mb-2">
              Status <span className="ml-8 text-indigo-500">Draft</span>
            </label>

            <label
              className="text-sm text-gray-700 block cursor-pointer"
              onClick={() => setIsParentDropdownOpen(!isParentDropdownOpen)}
            >
              Parent <span className="ml-8 text-indigo-500">{selectedParent}</span>
            </label>

            {isParentDropdownOpen && (
              <div className="absolute bg-white border shadow-md mt-1 z-20 w-[90%]">
                {parentOptions.map((item) => (
                  <p
                    key={item._id || 'none'}
                    className="text-sm px-3 py-1 cursor-pointer hover:bg-gray-100"
                    onClick={() => selectParent(item._id)}
                  >
                    {item.title}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmPublish}
        onCancel={handleCancelModal}
        message="Are you sure you want to publish this page?"
      />
    </div>
  );
};

export default AddPages;
