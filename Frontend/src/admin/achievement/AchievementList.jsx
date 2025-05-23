import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import ConfirmationModal from '../../reusables/ConfirmationModal';
import { useGetItemQuery, useDeleteItemMutation } from '../../app/services/QuerySettings';
import AchievementForm from './AchievementForm';
import CustomTable from '../components/CustomTable';
import SearchBar from '../../admin/components/SearchBar';




const AchievementList = () => {
  const [showCreateAchievement, setShowCreateAchievement] = useState(false);
  const [showEditAchievement, setShowEditAchievement] = useState(false);
  const [deleteAchievementData, setDeleteAchievementData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editAchievementData, setEditAchievementData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const {
    data: achievementsData,
    isLoading: isLoadingAchievements,
    isError: isAchievementsError,
    refetch
  } = useGetItemQuery(
    { url: "/achievements/all" },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteAchievementMutation] = useDeleteItemMutation();

  const achievements = achievementsData || [];

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Number', key: 'number' },
    { label: 'Description', key: 'description' },
  ];

  const handleEditAchievement = (achievement) => {
    setEditAchievementData(achievement);
    setShowEditAchievement(true);
  };

  const handleAchievementUpdated = () => {
    setShowEditAchievement(false);
    refetch();
  };

  const handleAchievementCreated = () => {
    setShowCreateAchievement(false);
    refetch();
  };

  const openDeleteModalAchievement = (achievement) => {
    setDeleteAchievementData(achievement);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteAchievement = async () => {
    if (deleteAchievementData) {
      try {
        await deleteAchievementMutation({
          url: `/achievements/delete/${deleteAchievementData._id}`,
        }).unwrap();
        refetch();
      } catch (error) {
        console.error('Error deleting Achievement:', error);
      }
      setShowDeleteConfirmation(false);
      setDeleteAchievementData(null);
    }
  };

  const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};

const filteredAchievements = achievements.filter((achievement) =>
  achievement.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  achievement.description?.toLowerCase().includes(searchTerm.toLowerCase())
);



  if (isLoadingAchievements) {
    return <div className="p-4 text-center">Loading achievements...</div>;
  }

  if (isAchievementsError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching achievements:{" "}
        {isAchievementsError?.data?.message || isAchievementsError?.error || "Unknown error"}
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen w-full relative'>
      <div className='w-full p-2 bg-white rounded-lg'>
        <h2 className="text-xl font-semibold text-left text-black-600 mb-4">
          Achievement Management
        </h2>

        <div className="flex justify-between items-center mb-2">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

          <button
            className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition duration-300 mb-6"
            onClick={() => setShowCreateAchievement(true)}
          >
            + Create Achievement
          </button>

        </div>

        <CustomTable
          columns={columns}
          data={filteredAchievements}
          onEdit={handleEditAchievement}
          onDelete={openDeleteModalAchievement}
        />

        {showCreateAchievement && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 bg-transparent hover:text-gray-800"
                onClick={() => setShowCreateAchievement(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <AchievementForm
                initialData={null}
                onSave={handleAchievementCreated}
                onClose={() => setShowCreateAchievement(false)}
              />
            </div>
          </div>
        )}

        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDeleteAchievement}
        />

        {showEditAchievement && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} >
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowEditAchievement(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <AchievementForm
                initialData={editAchievementData}
                onSave={handleAchievementUpdated}
                onClose={() => setShowEditAchievement(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementList;
