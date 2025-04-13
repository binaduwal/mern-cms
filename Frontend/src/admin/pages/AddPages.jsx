import React, { useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ConfirmationModal from '../../reusables/ConfirmationModal';

const AddPages = () => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  const [titleInput,setTitleInput]=useState("")
  const [isModalOpen,setIsModalOpen]=useState(false)


  const [parent,setParent]=useState('None')
  const [isParentDropdownOpen,setIsParentDropdownOpen]=useState(false)

  const parentOptions = [
    { id: 0, name: 'None' }, 
    { id: 1, name: 'Home' },
    { id: 2, name: 'About us' }
  ];
  const navigate = useNavigate();

  const parseContent = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const titleElement = doc.querySelector('h1') || doc.querySelector('p');
    const title = titleElement?.textContent?.trim() || 'Untitled Page';
  
    const content = html;
    
    return { title, content };
  };
  const { title } = useMemo(() => parseContent(editorContent), [editorContent]);

  const slug = titleInput.trim().toLowerCase().replace(/\s+/g, '-') || '';
  
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handleSubmit = async (status) => {
    if (!editorContent || editorContent === '<p><br></p>') {
      alert('Please enter some content');
      return;
    }

    try {
      const titleVal=titleInput.trim()
      const content=editorContent
      const response = await axios.post('http://localhost:3000/pages/create', {
        title:titleVal,
        content,
        slug,
        status
      });
      
      if (status === 'Draft') {
        alert('Page drafted successfully!');
      } else if (status === 'Published') {
        alert('Page published successfully!');
      }
      
      navigate('/admin/pages');
    } catch (error) {
      console.error('Full error:', error.response?.data || error.message);
      alert(`Submission failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEditorChange = (content) => {
    if (content === '<h1></h1><p>Type here...</p>') {
      setEditorContent('<h1></h1>');
    } else {
      setEditorContent(content);
    }
  };

  const handlePublishclick=()=>{
    setIsModalOpen(true);
  }

  const handleConfirmPublish=()=>{
    setIsModalOpen(false);
    handleSubmit('Published');

  };

  const handleCancelModal=()=>{
    setIsModalOpen(false);
  };

  const toggleParentDropdown=()=>{
 if (parent === 'None') {
      setIsParentDropdownOpen(!isParentDropdownOpen);
    }  };

  const selectParentOption=(option)=>{
    setParent(option);
    setIsParentDropdownOpen(false);
  };
  

  return (
    <div className="h-screen w-full p-4 flex">
      <form onSubmit={handleSubmit} className="h-full w-3/4 flex flex-col shadow-lg">
      <input
    type='text'
    placeholder='Enter title'
    className='focus:outline-none mb-6 text-2xl'
    value={titleInput}
    onChange={(e)=>setTitleInput(e.target.value)}
    required

      />
        <div className="flex-1 overflow-hidden text-black">
          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={handleEditorChange}
            modules={modules}
            ref={editorRef}
            placeholder="Type here..."
            className="w-full h-full border-none focus:outline-none"
            style={{
              minHeight: 'calc(100vh - 100px)', 
            }}
          />
        </div>

      </form>

      <div className="w-1/4 ml-4 h-full">
      <button
          type="submit"
          className="bg-indigo-500 text-white px-6 py-2 rounded mt-5 ml-5"
          onClick={()=>handleSubmit('Draft')}
        >
          Draft
        </button>

        <button
          type="text"
          className="bg-indigo-500 text-white px-6 py-2 rounded mt-5 ml-8"
        onClick={handlePublishclick}
        >
          Publish
        </button>


        <div className="bg-white p-4 shadow-md rounded h-full">
          <p 
            className=" bg-transparent text-indigo-600 mb-4"
          >
            Link
          </p>

            <div>
              <p className="text-sm text-gray-500">Slug: /{slug}</p>
              <p className="text-sm text-gray-500">URL: http://localhost:5173/{slug}</p>
            </div>

            <div className="relative mt-4">

              <div>
              <label className="text-sm text-gray-700">
  Status <span className="ml-8">Draft</span>
</label>
    
              </div>
  <div 
    className="cursor-pointer"
    onClick={() => setIsParentDropdownOpen(!isParentDropdownOpen)}
  >
<label className="text-sm text-gray-700">
  Parent <span className="ml-8">{parent}</span>
</label>
  </div>
  
  {isParentDropdownOpen && (
    <div className='absolute left-0 mt-1 bg-white z-10 border shadow-lg w-full'>
      {parentOptions.map((item) => (
        <p
          key={item.id}
          className='text-sm px-2 py-1 cursor-pointer hover:bg-gray-100'
          onClick={() => selectParentOption(item.name)}
        >
          {item.name}
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
      message="Are you sure you want to publish this page"
      />
    </div>

  );
};

export default AddPages;
