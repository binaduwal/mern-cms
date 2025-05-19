import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Th, Td } from '../../utils/Elements'; 
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../../reusables/ConfirmationModal';
import { useDeleteItemMutation, useGetItemQuery } from '../../app/services/QuerySettings';
const ServiceTable = () => {

const { data: apiResponse, isLoading,error } = useGetItemQuery(
    { url: "/services/all" },
    { refetchOnMountOrArgChange: true }
  );

  console.log("services",apiResponse);
  const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);


  const navigate = useNavigate();

  const handleEdit = (service) => {
    console.log(`Edit service with ID: ${service._id}`);
    navigate(`/admin/services/add`, { state: { editService: service } });
  };

const openDeleteModal = (service) => {
    setServiceToDelete(service);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setServiceToDelete(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await deleteItem({ url: `/services/delete/${serviceToDelete._id}` }).unwrap();
      alert('Service deleted successfully!');
      closeDeleteModal();
    } catch (err) {
      console.error('Failed to delete the service: ', err);
      alert(`Error deleting service: ${err.data?.message || err.err || 'Unknown error'}`);
    }

  };
if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Loading services...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error loading services: {error.toString()}</div>;
  }


   const services = apiResponse?.data || [];

  if (services.length === 0) {
    return <div className="p-4 text-center text-gray-500">No services found.</div>;
  }
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Services</h1>
        <button
          onClick={() => navigate('/admin/services/add')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
        >
          Add New Service
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th width="5%">S.N.</Th>
              <Th width="20%">Title</Th>
              <Th width="30%">Summary</Th>
              <Th width="30%">Description</Th>
              <Th width="15%">Actions</Th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service, index) => (
              <tr key={service._id} className="hover:bg-gray-50 transition-colors duration-150">
                <Td>{index + 1}</Td>
                <Td>{service.title}</Td>
                <Td>
                  <p className="line-clamp-1 text-sm">{service.summary}</p>
                </Td>
                <Td>
                  <p className="line-clamp-1 text-sm">{service.desc || '-'}</p>
                </Td>
                <Td>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-black hover:text-indigo-900 bg-transparent transition duration-150 ease-in-out"
                      aria-label="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(service)}
                      className="text-black hover:text-red-900 transition duration-150 bg-transparent ease-in-out"
                      aria-label="Delete"
                      disabled={isDeleting}
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={serviceToDelete?.title || 'service'}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ServiceTable;