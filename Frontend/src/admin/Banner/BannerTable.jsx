import React from 'react';
import { Link } from 'react-router-dom';
import { useGetBannersQuery } from '../../app/services/BannerApi';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'; 

const BannerTable = () => {
  const { data: banners, error, isLoading, isFetching } = useGetBannersQuery(undefined, {
    refetchOnMountOrArgChange: true, 
  });

  if (isLoading || isFetching) return <p className="text-center p-4">Loading banners...</p>;
  if (error) return <p className="text-center text-red-500 p-4">Error loading banners: {error.data?.message || error.status}</p>;
  if (!banners || banners.length === 0) return (
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
        <p className="text-center p-4">No banners found. <Link to="/admin/banners/add" className="text-indigo-600 hover:underline">Add one now!</Link></p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Banners</h2>
        <Link
          to="/admin/banner/add" // Link to your Add Banner form
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Banner
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
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
                  <button onClick={() => alert(`Edit ${banner._id}`)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <FaEdit size={18}/>
                  </button>
                  <button onClick={() => alert(`Delete ${banner._id}`)} className="text-red-600 hover:text-red-900">
                    <FaTrash size={18}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerTable;