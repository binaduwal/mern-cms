import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import ConfirmationModal from '../../reusables/ConfirmationModal'
import { useGetItemQuery, useDeleteItemMutation } from '../../app/services/QuerySettings'
import { FaEdit, FaTrash } from 'react-icons/fa'
import RoleForm from './RoleForm';


const RolesList = () => {
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [DeleteRoleData, setDeleteRoleData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editRoleData, setEditRoleData] = useState(null);
const [searchTerm, setSearchTerm] = useState('');

  const { data: rolesData, isLoading:isLoadingRoles, isError:isRolesError} = useGetItemQuery(
    { url: "/roles/all" },
    { refetchOnMountOrArgChange: true } 
  );

  const [deleteRoleMutation] = useDeleteItemMutation();

  const roles = rolesData || [];


  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'name' },
    { label: 'Display Name', key: 'display_name' },
    { label: 'Description', key: 'description' },
  ]


  const handleEdit = (role) => {
    setEditRoleData(role);
    setShowEditRole(true);
  };

  const handleRoleUpdated =() => {
    setShowEditRole(false);
  };

  const handleRoleCreated = () => {
    setShowCreateRole(false);
  };

    const openDeleteModal = (role) => {
    setDeleteRoleData(role)
    setShowDeleteConfirmation(true)
  }



  const handleDelete = async () => {
    if (DeleteRoleData) {
      try {
        await deleteRoleMutation({ url: `/roles/delete/${DeleteRoleData._id}` }).unwrap();

      } catch (error) {
        console.error('Error deleting Role:', error);
      }
      setShowDeleteConfirmation(false);
    }
  };

    if (isLoadingRoles) {
    return <div className="p-4 text-center">Loading roles...</div>;
  }

  if (isRolesError) {
    return <div className="p-4 text-center text-red-500">Error fetching roles: {rolesError?.data?.message || rolesError?.error || 'Unknown error'}</div>;
  }

  const normalizeString = (str) => {
    return str ? str.toLowerCase().replace(/[-\s]/g, '') : '';
  }

  return (
<div className='bg-white min-h-screen w-full relative'>
<div className='w-full p-2 bg-white rounded-lg'>

        <h2 className="text-xl font-semibold text-left text-black-600 mb-4">
          Role Management
        </h2>

        <div className="flex justify-between items-center mb-2">

          <button
            className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
            onClick={() => setShowCreateRole(true)}
          >
            + Create Role
          </button>
        </div>

        <div className="overflow-x-auto">
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
                              {roles.map((role, index) => (
                                <tr key={role._id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.display_name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate" title={role.description}>{role.description}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => handleEdit(role)} className="text-black bg-transparent hover:text-indigo-600 mr-3"><FaEdit /></button>
                                    <button onClick={() => openDeleteModal(role)} className="text-black bg-transparent hover:text-red-600"><FaTrash /></button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
            
        </div>

        
        {showCreateRole && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowCreateRole(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <RoleForm 
            initialData={null}
              onSave={handleRoleCreated}
              onClose={() => setShowCreateRole(false)}
 />
            </div>
          </div>
        )}

<ConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
      />


        {showEditRole && (
          <div className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} >

           <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowEditRole(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <RoleForm
               initialData={editRoleData} onSave={handleRoleUpdated}
              onClose={() => setShowEditRole(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesList;
