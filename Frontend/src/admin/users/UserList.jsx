import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import ConfirmationModal from '../../reusables/ConfirmationModal';
import { useGetItemQuery, useDeleteItemMutation } from '../../app/services/QuerySettings';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UserForm from './UserForm';

const UserList = () => {
  const [showUserFormModal, setShowUserFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUserData, setDeleteUserData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { data: usersData, isLoading, isError ,refetch} = useGetItemQuery(
    { url: "/users/all" },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteUser] = useDeleteItemMutation();

  const users = usersData?.data?.filter(user => user.role !== 'superadmin') || [];

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'refRole' },
    { label: 'Actions', key: 'actions' }
  ];

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setShowUserFormModal(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setShowUserFormModal(true);
  };


  const openDeleteModal = (user) => {
    setDeleteUserData(user);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (deleteUserData) {
      try {
        await deleteUser({ url: `/users/delete/${deleteUserData._id}` }).unwrap();
        refetch();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
      setShowDeleteConfirmation(false);
    }
  };

  const handleUserFormSave = (savedUserData) => {
    console.log(editingUser ? "User updated:" : "User created:", savedUserData);
    setShowUserFormModal(false);
    setEditingUser(null);
    refetch(); 
  };

  if (isLoading) return <div className="p-4 text-center">Loading users...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error fetching users</div>;

  return (
    <div className='bg-white min-h-screen w-full relative'>
      <div className='w-full p-4 bg-white rounded-lg'>
        <h2 className="text-xl font-semibold mb-4">User Management</h2>

        <div className="flex justify-end mb-4">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
            onClick={handleOpenCreateModal}
          >
            + {editingUser ? 'Edit User' : 'Create User'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
<td className="px-6 py-4 text-sm text-gray-500">
                    {user.refRole ? (user.refRole.display_name || user.refRole.name) : 'N/A'}
                  </td>                  <td className="px-6 py-4 text-sm font-medium">
                    {/* <button 
                      onClick={() => handleOpenEditModal(user)} 
                      className="text-black bg-transparent hover:text-indigo-600 mr-3"
                      aria-label="Edit user"
                    >
                      <FaEdit />
                    </button> */}
                    <button 
                      onClick={() => openDeleteModal(user)} 
                      className="text-black bg-transparent hover:text-red-600"
                      aria-label="Delete user"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showUserFormModal && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-40">
            <div className="relative bg-white p-8 rounded-xl shadow-xl w-[500px]">
              <button
                className="absolute top-4 right-3 text-black bg-transparent hover:text-gray-800"
                onClick={() => { setShowUserFormModal(false); setEditingUser(null); }}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <UserForm
                initialData={editingUser}
                onSave={handleUserFormSave}
                onClose={() => { setShowUserFormModal(false); setEditingUser(null); }}
              />
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message={`Are you sure you want to delete the user "${deleteUserData?.name}"? This action cannot be undone.`}
        />
      </div>
    </div>
  );
};

export default UserList;
