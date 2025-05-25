import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import ConfirmationModal from '../../reusables/ConfirmationModal';
import { useGetItemQuery, useDeleteItemMutation } from '../../app/services/QuerySettings';
import JoinClubForm from './JoinClubForm';
import CustomTable from '../components/CustomTable';
import SearchBar from '../../admin/components/SearchBar';




const JoinClubList = () => {
  const [showCreateData, setShowCreateData] = useState(false);
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
    { url: "/join/all" },
    { refetchOnMountOrArgChange: true }
  );

  console.log(achievementsData);

  const [deleteAchievementMutation] = useDeleteItemMutation();

  const achievements = achievementsData || [];

const columns = [
  { label: 'SN', key: 'serialNumber' },
  { label: 'Club Name', key: 'title' },
{
    label: 'Service',
    key: 'services',
    // render: (row) => row.services?.map((s) => s.title).join(', ') || 'N/A'
    render: (row) =>
  row.services?.length ? (
    <>
      {row.services.map((s, idx) => (
        <div key={idx}>-{s.title}</div>
      ))}
    </>
  ) : (
    'N/A'
  )

  },];

  const handleEditAchievement = (achievement) => {
    setEditAchievementData(achievement);
    setShowEditAchievement(true);
  };

  const handleAchievementUpdated = () => {
    setShowEditAchievement(false);
    refetch();
  };

  const handleAchievementCreated = () => {
    setShowCreateData(false);
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
          url: `/join/delete/${deleteAchievementData._id}`,
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
  achievement.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  achievement.services.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="bg-white min-h-screen w-full relative">
      <div className="w-full p-2 bg-white rounded-lg">
        <h2 className="text-xl font-semibold text-left text-black-600 mb-4">
          Join The Club
        </h2>

        <div className="flex justify-between items-center mb-2">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

          <button
            className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition duration-300 mb-6"
            onClick={() => setShowCreateData(true)}
          >
            +Join Club
          </button>
        </div>

        <CustomTable
          columns={columns}
          data={filteredAchievements}
          onEdit={handleEditAchievement}
          onDelete={openDeleteModalAchievement}
        />

        {showCreateData && (
          <div
            className="fixed inset-0 flex justify-center items-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 bg-transparent hover:text-gray-800"
                onClick={() => setShowCreateData(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <JoinClubForm
                initialData={null}
                onSave={handleAchievementCreated}
                onClose={() => setShowCreateData(false)}
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
          <div
            className="fixed inset-0 flex justify-center items-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 bg-transparent hover:text-gray-800"
                onClick={() => setShowEditAchievement(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <JoinClubForm
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

export default JoinClubList;
