import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { TbLayoutNavbar } from 'react-icons/tb';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GoFileMedia } from "react-icons/go";
import { VscLayoutMenubar } from "react-icons/vsc";
import { PiCards } from "react-icons/pi";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
       name: 'Dashboard',
       path: '/admin',
       icon: <IoHomeOutline /> 
      },

      {
       name: 'Pages',
       path: '/admin/pages',
       icon: <TbLayoutNavbar /> 
      },
      {
       name: 'Categories',
       path: '/admin/category',
       icon: <MdOutlineDashboardCustomize /> 
      },

      {
       name: 'Menu',
       path: '/admin/menu',
       icon: <VscLayoutMenubar />

      },
      
      {
       name: 'Media Center',
       path: '/admin/media',
       icon: <GoFileMedia /> 
      },
      {
       name: 'Banner',
       path: '/admin/banner',
       icon: <GoFileMedia /> 
      },
      {
       name: 'Services',
       path: '/admin/services',
       icon: <PiCards />
      },
      {
       name: 'Settings',
       path: '/admin/settings',
       icon: <IoSettingsOutline /> 
      },

    ]

  return (
    <>
      <div className="md:hidden flex justify-between items-center p-4 z-50 relative">
        <button onClick={() => setIsOpen(!isOpen)}
          className='text-black bg-transparent'>
        <GiHamburgerMenu size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-white text-black p-2 shadow-md z-50 transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:h-screen`}
      >


      <div className="mb-6">
        <div className="md:hidden flex justify-between items-center">
          <h2 className="text-xl font-bold ml-2">SysQube</h2>
        </div>

        <div className="hidden md:block">
          <h2 className="text-xl font-bold ml-2">SysQube</h2>
        </div>
      </div>

        <div className="sidebar-menu flex-grow">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded-xl transition-all
                    ${isActive ? 'text-indigo-600 font-semibold' : 'text-black hover:bg-gray-200'}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
