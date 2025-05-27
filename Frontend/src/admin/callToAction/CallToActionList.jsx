import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import ConfirmationModal from '../../reusables/ConfirmationModal';
import { useGetItemQuery, useDeleteItemMutation } from '../../app/services/QuerySettings';
import CustomTable from '../components/CustomTable';
import SearchBar from '../../admin/components/SearchBar';
import CallToActionForm from './CallToActionForm';




const CallToActionList = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const {
    data: ctaData,
    isLoading: isLoadingData,
    isError: isError,
    refetch
  } = useGetItemQuery(
    { url: "/cta/all" },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteMutation] = useDeleteItemMutation();

  const datas = ctaData?.data || [];

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Caption', key: 'caption' },
    { label: 'Title', key: 'title' },
    { label: 'Description', key: 'description' },
  ];

  const handleEdit = (achievement) => {
    setEditData(achievement);
    setShowEditForm(true);
  };

  const handleAchievementUpdated = () => {
    setShowEditForm(false);
    refetch();
  };

  const handleAchievementCreated = () => {
    setShowCreateForm(false);
    refetch();
  };

  const openDeleteModal = (achievement) => {
    setDeleteData(achievement);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (deleteData) {
      try {
        await deleteMutation({
          url: `/cta/delete/${deleteData._id}`,
        }).unwrap();
        refetch();
      } catch (error) {
        console.error('Error deleting Data:', error);
      }
      setShowDeleteConfirmation(false);
      setDeleteData(null);
    }
  };

  const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};

const filteredData = datas.filter((data) =>
  data.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  data.description?.toLowerCase().includes(searchTerm.toLowerCase())
);



  if (isLoadingData) {
    return <div className="p-4 text-center">Loading data...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching data:{" "}
        {isError?.data?.message || isError?.error || "Unknown error"}
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen w-full relative'>
      <div className='w-full p-2 bg-white rounded-lg'>
        <h2 className="text-xl font-semibold text-left text-black-600 mb-4">
          Call to Action Management
        </h2>

        <div className="flex justify-between items-center mb-2">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />


          {
            datas.length===0 && (
          <button
            className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition duration-300 mb-6"
            onClick={() => setShowCreateForm(true)}
          >
            + Create  Call to Action
          </button>
            )
          }

        </div>

        <CustomTable
          columns={columns}
          data={filteredData}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />

        {showCreateForm && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 bg-transparent hover:text-gray-800"
                onClick={() => setShowCreateForm(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>

              <CallToActionForm
                initialData={null}
                onSave={handleAchievementCreated}
                onClose={() => setShowCreateForm(false)}
              />
            </div>
          </div>
        )}

        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDelete}
        />

        {showEditForm && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} >
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 bg-transparent hover:text-gray-800"
                onClick={() => setShowEditForm(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <CallToActionForm
                initialData={editData}
                onSave={handleAchievementUpdated}
                onClose={() => setShowEditForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallToActionList;
