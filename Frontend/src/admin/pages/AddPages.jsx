import React, { useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPages = () => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  const [titleInput,setTitleInput]=useState("")

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
      
      if (!content || content === '<p><br></p>') {
        alert('Please enter some content');
        return;
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
          onClick={()=>handleSubmit('Published')}

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
        </div>
      </div>
    </div>
  );
};

export default AddPages;
