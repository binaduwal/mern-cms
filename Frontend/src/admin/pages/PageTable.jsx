import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../reusables/SearchBar';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmationModal from '../../reusables/ConfirmationModal';
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
    navigate(`/admin/pages/edit/${slug}`);
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
          {pages.filter(page => page.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
           <tr>
           <td colSpan="4" className="text-center text-gray-500 py-6">
             No matching results found.
           </td>
         </tr>
       ) : (   
            pages
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
                              .body.textContent.slice(0, 40) + '...'
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
  <span className="text-xs font-semibold">Created at:</span>
  <br/>
    {new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(page.createdAt))}
    
    {page.updatedAt && 
      new Date(page.updatedAt).getTime() !== new Date(page.createdAt).getTime() && (
        <>
          <br />
          <span className="text-xs font-semibold">Last Modified:</span>
          <br />
          {new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }).format(new Date(page.updatedAt))}
        </>
      )
    }
  </div>
</td>



                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(page.slug)}
                      className="bg-transparent text-gray-700 hover:text-indigo-800 font-bold py-1 px-3 rounded text-xl"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteData(page.slug);
                        setShowDeleteConfirmation(true);
                      }}
                      className="bg-transparent text-gray-700 hover:text-red-700 font-bold py-1 px-3 rounded text-xl"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </td>


              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this page"
      />
    </div>
  );
};

export default PageTable;
