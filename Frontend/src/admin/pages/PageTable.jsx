import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../reusables/SearchBar';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmationModal from '../../reusables/DeleteConfirmationModal';

const PageTable = () => {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [DeleteData, setDeleteData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/pages/all')
      .then((response) => { 
        console.log('Fetched pages:', response.data);
        setPages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pages:', error);
      });
  }, []);

  const handleEdit = (slug) => {
    console.log('Edit page with slug:', slug);
  };

  const handleAddPage = () => {
    navigate('/admin/add-pages');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  };

  const handleDelete = () => {
    if (!DeleteData) return;
  
    axios.delete(`http://localhost:3000/pages/delete/${DeleteData}`)
      .then(() => {
        setPages(pages.filter(page => page.slug !== DeleteData));
        setShowDeleteConfirmation(false);
        setDeleteData(null);
      })
      .catch((error) => {
        console.error('Error deleting page:', error);
      });
  };


  const draftCount = pages.filter(page => page.status === 'Draft').length;
  const publishCount = pages.filter(page => page.status === 'Published').length;
  const totalCount=pages.length

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-xl mb-4">Pages</h2>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <button
            onClick={handleAddPage}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Add Page
          </button>

        </div>
      </div>

      <div>
      <div className='flex gap-4 mb-2'>
            <span className='text-sm font-medium text-gray-700'>All ({totalCount})</span>
            <span className='text-sm font-medium text-gray-700'>Draft ({draftCount})</span>
            <span className='text-sm font-medium text-gray-700'>Publish ({publishCount})</span>
          </div>

      </div>


      <div>
        <table className="w-full table-auto bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Pages</th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pages
            .filter(page=>page.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((page, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 break-words">/{page.slug}</p>
                    <p className="text-sm text-black break-words">{page.title}</p>
                    <div className="text-gray-600">
                      <div className="text-sm text-gray-600 truncate">
                        {page.content
                          ? new DOMParser()
                              .parseFromString(page.content, 'text/html')
                              .body.textContent.slice(0, 100) + '...'
                          : 'No content available'}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span className="text-sm text-gray-700">{page.status}</span>
                </td>

                <td className="px-4 py-3">

              <div className="text-sm text-gray-600">
                Created at:
                <br/>
                 {new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,}).format(new Date(page.createdAt))}
                {/* <br />
                Updated: {new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(page.updatedAt))} */}
              </div>
      </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(page.slug)}
                      className="bg-transparent text-black hover:text-indigo-800 font-bold py-1 px-3 rounded text-xl"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteData(page.slug);
                        setShowDeleteConfirmation(true);
                      }}
                      className="bg-transparent text-black hover:text-red-700 font-bold py-1 px-3 rounded text-xl"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default PageTable;
