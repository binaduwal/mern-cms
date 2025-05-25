import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ConfirmationModal from "../../reusables/ConfirmationModal";
import {
  useGetItemQuery,
  useDeleteItemMutation,
} from "../../app/services/QuerySettings";
import PartnerForm from "./PartnerForm";
import CustomTable from "../components/CustomTable";
import SearchBar from "../../admin/components/SearchBar";

const PartnerList = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: apiResponse,
    isLoading: isLoadingData,
    isError: isDataError,
    refetch,
  } = useGetItemQuery(
    { url: "/partners/all" },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteDataMutation] = useDeleteItemMutation();

  const partners = apiResponse?.data || [];
  console.log(partners);

  const columns = [
    { label: "SN", key: "serialNumber" },
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
  ];

  const handleEdit = (partner) => {
    setEditData(partner);
    setIsFormModalOpen(true);
  };

  const handleFormSave = () => {
    setEditData(null);
    setIsFormModalOpen(false);
    refetch();
  };

  const openDeleteModal = (partner) => {
    setDeleteData(partner);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (deleteData) {
      try {
        await deleteDataMutation({
          url: `/partners/delete/${deleteData._id}`,
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
    ? partners.filter(
        (partner) =>
          partner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          partner.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : partners;

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
          Partner Management
        </h2>

        <div className="flex justify-between items-center mb-2">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

          <button
            className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition duration-300 mb-6"
            onClick={() => {
              setEditData(null);
              setIsFormModalOpen(true);
            }}
          >
            + Create Partner
          </button>
        </div>

        <CustomTable
          columns={columns}
          data={filteredData}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />

        {isFormModalOpen && (
          <div
            className="fixed inset-0 flex justify-center items-center z-50  "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <div
              className={`relative bg-white p-8 rounded-xl shadow-2xl w-[${
                editData ? "700px" : "500px"
              }] border border-gray-200 max-h-[90vh] overflow-y-auto`}
            >
              <button
                className="absolute top-4 right-3 text-gray-600 bg-transparent hover:text-gray-800"
                onClick={() => {
                  setIsFormModalOpen(false);
                  setEditData(null);
                }}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>

              <PartnerForm
                initialData={editData}
                onSave={handleFormSave}
                onClose={() => {
                  setIsFormModalOpen(false);
                  setEditData(null);
                }}
              />
            </div>
          </div>
        )}

        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default PartnerList;
