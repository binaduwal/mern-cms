import React, { useState } from 'react';
import { useGetItemQuery } from '../../app/services/QuerySettings'; // Adjust path as needed
import TestForm from '../test/TestForm'; // Adjust path to your TestForm
import { FaPlus } from 'react-icons/fa';

const TestRoute = () => {
  // State for controlling the TestForm modal (for creation)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  // If you plan to add edit functionality, you'd also have state for the item being edited:
  // const [editingTestData, setEditingTestData] = useState(null);

  // RTK Query to fetch all test items.
  // Ensure your backend has a route like '/api/test/all' or similar.
  const { data: responseData, error, isLoading, isFetching, refetch } = useGetItemQuery({ url: '/test/all' });

  const handleOpenCreateModal = () => {
    // setEditingTestData(null); // If using for edit as well
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    // setEditingTestData(null); // If using for edit as well
  };

  const handleFormSave = () => {
    refetch(); // Refetch the list of test items after a new item is saved
    handleCloseFormModal();
  };

  if (isLoading) return <p className="text-center text-gray-500 py-8">Loading test items...</p>;
  if (error) return <p className="text-center text-red-500 py-8">Error loading test items: {error.data?.message || error.status}</p>;

  let testItems = [];
  if (responseData) {
    if (Array.isArray(responseData)) {
      testItems = responseData;
    } else if (responseData.data && Array.isArray(responseData.data)) {
      testItems = responseData.data;
    }
  }
  const BACKEND_URL = 'http://localhost:3000';

  return (      
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Test Items</h1>
        <button
          onClick={handleOpenCreateModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition duration-150 ease-in-out"
        >
          <FaPlus className="mr-2" /> Create New Test Item
        </button>
      </div>

      {isFetching && !isLoading && <p className="text-center text-gray-500 py-4">Refreshing test items...</p>}

      {testItems.length === 0 && !isFetching && (
        <p className="text-center text-gray-500 py-8">No test items found. Start by creating one!</p>
      )}

      {/* Display Test Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {testItems.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4">
              {/* You can display other item._id or other properties if your testModel has them */}
              {/* <h3 className="text-md font-semibold mb-2 truncate" title={item._id}>Item ID: {item._id}</h3> */}
              {item.image && item.image.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {item.image.map((imageUrl, idx) => (
                    <img
                      key={idx}
                      src={imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}${imageUrl}`}
                      alt={`Test Item ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No images.</p>
              )}
              {/* Add Edit/Delete buttons here if needed */}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for TestForm */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
          <div className="relative w-full max-w-2xl">
            <TestForm
              // initialData={editingTestData || {}} // Pass empty object for create, or item data for edit
              // isEdit={!!editingTestData}
              initialData={{}} // Forcing create mode for this example
              isEdit={false}    // Forcing create mode for this example
              onSave={handleFormSave}
              onClose={handleCloseFormModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}