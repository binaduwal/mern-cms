import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import ConfirmationModal from '../../reusables/ConfirmationModal';
import { useGetItemQuery, useDeleteItemMutation } from '../../app/services/QuerySettings';
import WingsForm from './WingsForm';
import CustomTable from '../components/CustomTable';
import SearchBar from '../../admin/components/SearchBar';

const WingsList = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: apiResponse,
    isLoading: isLoadingData,
    isError: isDataError,
    refetch
  } = useGetItemQuery(
    { url: "/wings/all" },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteDataMutation] = useDeleteItemMutation();

  const features = apiResponse || [];

  const columns = [
    { label: "SN", key: "serialNumber" },
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
  ];

  const handleEdit = (feature) => {
    setEditData(feature);
    setShowEdit(true);
  };

  const handleUpdated = () => {
    setShowEdit(false);
    refetch();
  };

  const handleCreated = () => {
    setShowCreate(false);
    refetch();
  };

  const openDeleteModal = (feature) => {
    setDeleteData(feature);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (deleteData) {
      try {
        await deleteDataMutation({
          url: `/wings/delete/${deleteData._id}`,
        }).unwrap();
        refetch();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
      setShowDeleteConfirmation(false);
      setDeleteData(null);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = features.filter((feature) =>
    feature.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoadingData) {
    return <div className="p-4 text-center">Loading data...</div>;
  }

  if (isDataError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching data:{" "}
        {isDataError?.data?.message || isDataError?.error || "Unknown error"}
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen w-full relative'>
      <div className='w-full p-2 bg-white rounded-lg'>
        <h2 className="text-xl font-semibold text-left text-black-600 mb-4">
          Wings Management
        </h2>

        <div className="flex justify-between items-center mb-2">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

          <button
            className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition duration-300 mb-6"
            onClick={() => setShowCreate(true)}
          >
            + Create Wings
          </button>
        </div>

        <CustomTable
          columns={columns}
          data={filteredData}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />

        {showCreate && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[800px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 bg-transparent hover:text-gray-800"
                onClick={() => setShowCreate(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <WingsForm
                initialData={null}
                onSave={handleCreated}
                onClose={() => setShowCreate(false)}
              />
            </div>
          </div>
        )}

        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDelete}
        />

        {showEdit && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl  w-[800px] border border-gray-200">
              <button
                className="absolute top-4 right-3 bg-transparent text-gray-600 hover:text-gray-800"
                onClick={() => setShowEdit(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <WingsForm
                initialData={editData}
                onSave={handleUpdated}
                isEdit={true}
                onClose={() => setShowEdit(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WingsList;
