import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetBannerQuery, useDeleteBannerMutation } from '../../app/services/BannerApi';
import { FaEdit, FaPlus, FaTrash, FaEye } from 'react-icons/fa'; 
import DeleteConfirmationModal from '../../reusables/ConfirmationModal';
import toast from 'react-hot-toast';

const BannerTable = () => {
  const { data: banners, error, isLoading, isFetching } = useGetBannerQuery(undefined, {
    refetchOnMountOrArgChange: true, 
  });
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const openDeleteModal = (banner) => {
    setBannerToDelete(banner);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setBannerToDelete(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!bannerToDelete) return;
    try {
      await deleteBanner(bannerToDelete._id).unwrap();
      toast.success(`"${bannerToDelete.heading}" deleted successfully!`);
    } catch (err) {
      toast.error(`Failed to delete banner: ${err.data?.message || err.error}`);
      console.error('Failed to delete banner:', err);
    }
    closeDeleteModal();
  };
  if (isLoading || isFetching) return <p className="text-center p-4">Loading banners...</p>;
  if (error) return <p className="text-center text-red-500 p-4">Error loading banners: {error.data?.message || error.status}</p>;
  if (!banners || banners.length === 0) return (
    <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Banners</h2>
            <Link
            to="/admin/banner"
            className="bg-indigo-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 inline-flex items-center"
            >
            <FaPlus className="mr-2" /> Add New Banner
            </Link>
        </div>
        <p className="text-center p-4">No banners found. <Link to="/admin/banner/add" className="text-indigo-600 hover:underline">Add one now!</Link></p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Banners</h2>
        <Link
          to="/admin/banner/add" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Banner
        </Link>
      </div>

      <div className="bg-white  rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Button Text</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {banners.map((banner) => (
              <tr key={banner._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{banner.heading}</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 max-w-md truncate hover:max-w-none hover:whitespace-normal">{banner.paragraph}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{banner.button?.text}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3"> {/* Flex container for icons */}
                    <button 
                      onClick={() => alert(`Edit functionality for ${banner._id} to be implemented.`)} 
                      className="text-black bg-transparent hover:text-indigo-600"
                      title="Edit Banner"
                    >
                      <FaEdit size={18}/>
                    </button>
                    <Link 
                      to={`/admin/banner/preview/${banner._id}`} 
                      target="_blank"
                      className="text-black bg-transparent hover:text-gray-600"
                      title="Preview Banner"
                    ><FaEye size={18}/></Link>
                    <button 
                      onClick={() => openDeleteModal(banner)} 
                      disabled={isDeleting} 
                      className="text-black bg-transparent hover:text-red-600 disabled:opacity-50"
                      title="Delete Banner"
                    >
                      <FaTrash size={18}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={bannerToDelete?.heading} // Pass the banner heading as itemName
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default BannerTable;