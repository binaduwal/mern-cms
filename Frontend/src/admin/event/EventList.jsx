import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ConfirmationModal from "../../reusables/ConfirmationModal";
import {
  useGetItemQuery,
  useDeleteItemMutation,
} from "../../app/services/QuerySettings";
import CustomTable from "../components/CustomTable";
import SearchBar from "../../admin/components/SearchBar";
import EventForm from "./EventForm";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  // const [isFormModalOpen, setIsFormModalOpen] = useState(false); // No longer needed for form modal
  const [deleteData, setDeleteData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  // const [editData, setEditData] = useState(null); // No longer needed for form modal
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const {
    data: apiResponse,
    isLoading: isLoadingData,
    isError: isDataError,
    refetch,
  } = useGetItemQuery(
    { url: "/events/all" },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteDataMutation] = useDeleteItemMutation();

  const datas = apiResponse || [];
  console.log(datas);

  const columns = [
    { label: "SN", key: "serialNumber" },
    { label: "Title", key: "title" },
    {
      label: "Date",
      key: "date",
      render: (item) =>
        item.date ? new Date(item.date).toLocaleDateString() : "N/A",
    },
  ];

  const handleEdit = (event) => {
    navigate(`/admin/events/edit/${event._id}`);
  };


  const openDeleteModal = (event) => {
    setDeleteData(event);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (deleteData) {
      try {
        await deleteDataMutation({
          url: `/events/delete/${deleteData._id}`,
        }).unwrap();
        refetch();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
      setShowDeleteConfirmation(false);
      setDeleteData(null);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = searchTerm
    ? datas.filter(
        (partner) =>
          partner.title?.toLowerCase().includes(searchTerm.toLowerCase()) 
      )
    : datas;

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
    <div className="bg-white min-h-screen w-full relative">
      <div className="w-full p-2 bg-white rounded-lg">
        <h2 className="text-xl font-semibold text-left text-black-600 mb-4">
         Event Management
        </h2>

        <div className="flex justify-between items-center mb-2">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

          <button
            className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition duration-300 mb-6"
            onClick={() => {
                navigate('/admin/events/form');
            }}
          >
            + Create
          </button>
        </div>

        <CustomTable
          columns={columns}
          data={filteredData}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />

        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default EventList;
