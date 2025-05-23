import React, { useEffect, useState } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io"
import { FaEdit, FaTrash } from 'react-icons/fa'
import PermissionForm from './PermissionForm'
import { useGetItemQuery, useDeleteItemMutation } from '../../app/services/QuerySettings'
import ConfirmationModal from '../../reusables/ConfirmationModal' 


const PermissionList = () => {
  const [showCreatePermission, setShowCreatePermission] = useState(false)
  const [showEditPermission, setShowEditPermission] = useState(false)
  const [permissionToEdit, setPermissionToEdit] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [permissionToDelete, setPermissionToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')


  const { data: apiResponse, isLoading, isError, error: queryError} = useGetItemQuery(
    { url: "/permissions/all" },
    { refetchOnMountOrArgChange: true } 
  );
  const [deletePermissionMutation, { isLoading: isDeleting }] = useDeleteItemMutation();

  const permissions = apiResponse || [];

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'name' },
    { label: 'Display Name', key: 'display_name' },
    { label: 'Description', key: 'description' },
    { label: 'Actions', key: 'actions' },
  ]

  const handlePermissionSaved = (savedPermission) => {
    console.log("Permission saved:", savedPermission);
    setShowCreatePermission(false)
    setShowEditPermission(false)
    setPermissionToEdit(null)
  }

  const handleDeleteConfirmation = async () => {
    if (permissionToDelete) {
      try {
        await deletePermissionMutation({ url: `/permissions/delete/${permissionToDelete._id}` }).unwrap();
        console.log('Permission deleted successfully');
      } catch (error) {
        console.error('Error deleting permission:', error)
      }
      setShowDeleteConfirmation(false)
    }
  }

  const openDeleteModal = (perm) => {
    setPermissionToDelete(perm)
    setShowDeleteConfirmation(true)
  }

  const handleEdit = (permission) => {
    setPermissionToEdit(permission);
    setShowEditPermission(true);
    setShowCreatePermission(false); 
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }


  const filteredPermissions = permissions.filter((perm) =>
    Object.values(perm).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  return (
    <div className='bg-white min-h-screen w-full p-4'>
      <div className='w-full p-6 bg-white'>
          <h2 className="text-xl font-semibold text-left text-black-600 mb-6">
            Permission Management
          </h2>

          <div className="flex justify-between items-center mb-2">

                      <input
            type="text"
            placeholder="Search permissions..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md mb-4 w-full md:w-1/3"
          />

            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 mb-4"
              onClick={() => {
                setShowCreatePermission(true);
                setShowEditPermission(false);
                setPermissionToEdit(null);
              }}
            >
              + Create Permission
            </button>
          
          </div>

          <div className="overflow-x-auto">
            {isLoading && <p className="text-center py-4">Loading permissions...</p>}
            {isError && <p className="text-center py-4 text-red-500">Error fetching permissions: {queryError?.data?.message || queryError?.error}</p>}
            {!isLoading && !isError && permissions.length === 0 && <p className="text-center py-4">No permissions found.</p>}
            {!isLoading && !isError && permissions.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map(col => (
                      <th key={col.key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPermissions.map((perm, index) => (
                    <tr key={perm._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{perm.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{perm.display_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate" title={perm.description}>{perm.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => handleEdit(perm)} className="text-black bg-transparent hover:text-indigo-600 mr-3"><FaEdit /></button>
                        <button onClick={() => openDeleteModal(perm)} className="text-black bg-transparent hover:text-red-600"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

{(showCreatePermission || showEditPermission) && (
  <div className="fixed inset-0 flex justify-center items-center z-50"
   style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} >
    <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
      <button
        className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
        onClick={() => {
          setShowCreatePermission(false)
          setShowEditPermission(false)
          setPermissionToEdit(null)
        }}
      >
        <IoMdCloseCircleOutline className='text-2xl'/>
      </button>
      <PermissionForm
        onClose={() => {
          setShowCreatePermission(false)
          setShowEditPermission(false)
          setPermissionToEdit(null)
        }}
        onSave={handlePermissionSaved}
        initialData={permissionToEdit}
      />
    </div>
  </div>
)}


<ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Delete Permission"
        message="Are you sure you want to delete this permission?"
        onConfirm={handleDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
      />


    </div>
  )
}

export default PermissionList
