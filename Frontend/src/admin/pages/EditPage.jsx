import React, { useState, useEffect, useRef,useCallback ,useMemo} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ConfirmationModal from '../../reusables/ConfirmationModal';
import '../../components/CustomImageBlot'

const EditPage = () => {
  const { slug } = useParams();
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  const [titleInput, setTitleInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parent, setParent] = useState('None');
  const [isParentDropdownOpen, setIsParentDropdownOpen] = useState(false);
  const [parentOptions, setParentOptions] = useState([]);
  const [status, setStatus] = useState('Draft');
  const [originalSlug, setOriginalSlug] = useState('');


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
        
        if (!range) {
          const length = editor.getLength();
          range = { index: length, length: 0 };
        }
  
        editor.insertEmbed(range.index, 'image', res.data.imageUrl);
        editor.setSelection(range.index + 1, 0, 'silent');
        editor.focus();
      } catch (err) {
        console.error('Upload failed:', err);
        alert(`Image upload failed: ${err.response?.data?.message || err.message}`);
      }
    };
  }, []);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/pages/${slug}`);
        const page = response.data;

        const parentsResponse = await axios.get('http://localhost:3000/pages/all');
        
        // Fetch all pages for parent options
        setParentOptions([
          { _id: null, title: 'None' },
          ...parentsResponse.data.map(p => ({ _id: p._id, title: p.title }))
        ]);

        setTitleInput(page.title);
        setEditorContent(page.content);
        setParent(page.parent || 'None');
        setStatus(page.status);
        setOriginalSlug(page.slug);
      } catch (error) {
        console.error('Error fetching page:', error);
        navigate('/admin/pages');
      }
    };
    fetchPage();
  }, [slug, navigate]);

  const handleSubmit = async (newStatus) => {
    if (!editorContent || editorContent === '<p><br></p>') {
      return;
    }

    try {
      const titleVal = titleInput.trim();
      const content = editorContent;
      const newSlug = titleVal.toLowerCase().replace(/\s+/g, '-');


      await axios.put(
          `http://localhost:3000/pages/edit/${originalSlug}`,   
          {
            title: titleVal,
            content: editorContent,   
            status: newStatus,
            parent,
            slug: newSlug
          }
        );
      
      setTimeout(() => navigate('/admin/pages'), 2000);
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

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

// get selected parent title
  const selectedParent = parentOptions.find(p => p._id === parent)?.title || 'None';

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handlePublishClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPublish = () => {
    setIsModalOpen(false);
    handleSubmit('Published');
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const toggleParentDropdown = () => {
    setIsParentDropdownOpen(!isParentDropdownOpen);
  };


  const currentSlug = titleInput.trim().toLowerCase().replace(/\s+/g, '-') || originalSlug;

  return (
    <div className="h-screen w-full p-4 flex">
    <div className="w-3/4 flex flex-col">
    <div className="mb-4 text-sm text-gray-600">
        <span className="text-gray-400 cursor-pointer" 
            onClick={() => navigate('/admin/pages')}>Pages</span>
        <span className="mx-1">/</span>
        <span className="font-semibold text-indigo-600">Edit</span>
    </div>
      <form className="h-full flex flex-col shadow-lg">
        <input
          type='text'
          placeholder='Enter title'
          className='focus:outline-none mb-6 text-2xl'
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
            ref={editorRef}
            placeholder="Type here..."
            className="w-full h-full border-none focus:outline-none"
            style={{ minHeight: 'calc(100vh - 100px)' }}
          />
        </div>
      </form>
      </div>

      <div className="ml-4 h-full">
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

        <div className="bg-white p-4 shadow-md rounded h-full mt-4">
          <p className="text-indigo-600 mb-4">Link</p>
          <div>
            <p className="text-sm text-gray-500">Slug: /{currentSlug}</p>
            <p className="text-sm text-gray-500">URL: http://localhost:5173/{currentSlug}</p>
          </div>

          <div className="relative mt-4">
            <div className="mb-4">
              <label className="text-sm text-gray-700" >Status  <span className="ml-8 text-indigo-500">{status}</span>
              </label>
              <p> 
              </p>
            </div>

            <div className="cursor-pointer" onClick={toggleParentDropdown}>
              <label className="text-sm text-gray-700">
                Parent <span className="ml-8 text-indigo-500">{selectedParent}</span>
              </label>
            </div>
            
            {isParentDropdownOpen && (
              <div className='absolute left-0 mt-1 bg-white z-10 border shadow-lg w-full'>
                {parentOptions.map((item) => (
                  <p
                    key={item._id || 'none'}
                    className='text-sm px-2 py-1 cursor-pointer hover:bg-gray-100'
                    onClick={() => {
                      setParent(item._id);
                      setIsParentDropdownOpen(false);
                    }}
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

export default EditPage;