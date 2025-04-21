import React, { useState, useRef, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../reusables/ConfirmationModal';
import JoditEditor from 'jodit-react';

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

  const selectedParentTitle =
    parentOptions.find(p => p._id === selectedParentId)?.title || 'None';

  const slug = titleInput.trim().toLowerCase().replace(/\s+/g, '-') || '';

  const handleSubmit = async status => {
    if (!editorContent || editorContent === '<p><br></p>') {
      alert('Please enter some content');
      return;
    }
    const clean = editorContent.replace(/<button[\s\S]*?<\/button>/g, '');
    const imgMatch = clean.match(/<img[^>]+src="([^"]+)"/);
    const imageUrl = imgMatch ? imgMatch[1] : null;

    try {
      await axios.post('http://localhost:3000/pages/create', {
        title: titleInput.trim(),
        content: clean,
        slug,
        status,
        parent: selectedParentId,
        image: imageUrl
      });
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
            />
          </div>
        </form>
      </div>

      {/* Sidebar Panel */}
      <div className="w-1/4 ml-4 h-full">
        <button
          onClick={() => handleSubmit('Draft')}
          className="mt-5 ml-5 rounded bg-indigo-500 px-6 py-2 text-white"
        >
          Draft
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-5 ml-8 rounded bg-indigo-500 px-6 py-2 text-white"
        >
          Publish
        </button>

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
