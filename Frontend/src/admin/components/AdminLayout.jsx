import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";

const AdminLayout = () => {
  return (
    <div className="flex h-screen relative">
      <div className="w-50 bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        
        <div className="bg-transparent flex items-center justify-end gap-2 shadow-sm px-6 py-2 rounded">
      <button className="relative bg-transparent p-2  rounded-full hover:bg-gray-100 focus:outline-none">
          <IoNotificationsOutline className="h-5 w-5 text-2xl text-gray-800 " />
      </button>
          <div className="relative bg-transparent  p-2 rounded-full hover:bg-gray-100 focus:outline-none">
            <FaRegCircleUser className="h-5 w-5 text-2xl text-gray-800" />
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
