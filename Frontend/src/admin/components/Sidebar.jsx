// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
// import { TbLayoutNavbar } from 'react-icons/tb';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import { MdOutlineDashboardCustomize } from "react-icons/md";
// import { GoFileMedia } from "react-icons/go";
// import { VscLayoutMenubar } from "react-icons/vsc";
// import { PiCards } from "react-icons/pi";
// import { GrUserAdmin } from "react-icons/gr";
// import { RiUserSettingsLine } from "react-icons/ri";
// import Swal from 'sweetalert2';
// import { PiSignOut } from 'react-icons/pi';


// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will be signed out of your account!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, sign out!',
//       cancelButtonText: 'Cancel',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         sessionStorage.removeItem('token');
//         sessionStorage.removeItem('role');
//         sessionStorage.removeItem('Admin Role');

//         Swal.fire('Signed Out!', 'You have been signed out.', 'success').then(() => {
//           navigate('/admin/login');
//         });
//       }
//     });
//   };

//   const navItems = [
//     {
//        name: 'Dashboard',
//        path: '/admin',
//        icon: <IoHomeOutline /> 
//       },

//       {
//        name: 'Pages',
//        path: '/admin/pages',
//        icon: <TbLayoutNavbar /> 
//       },
//       {
//        name: 'Categories',
//        path: '/admin/category',
//        icon: <MdOutlineDashboardCustomize /> 
//       },

//       {
//        name: 'Menu',
//        path: '/admin/menu',
//        icon: <VscLayoutMenubar />

//       },

//       {
//        name: 'Components',
//        path: '/admin/users',
//        icon: <RiUserSettingsLine /> 
//       },
//       {
//        name: 'sections',
//        path: '/admin/users',
//        icon: <RiUserSettingsLine /> 
//       },
      
//       {
//        name: 'Media Center',
//        path: '/admin/media',
//        icon: <GoFileMedia /> 
//       },
//       {
//        name: 'Banner',
//        path: '/admin/banner',
//        icon: <GoFileMedia /> 
//       },
//       {
//        name: 'Services',
//        path: '/admin/services',
//        icon: <PiCards />
//       },
//       {
//        name: 'Permissions',
//        path: '/admin/permissions',
//        icon: <GrUserAdmin />
//       },
//       {
//        name: 'Roles',
//        path: '/admin/roles',
//     icon:<RiUserSettingsLine />
//       },
//       {
//        name: 'Users',
//        path: '/admin/users',
//     icon:<RiUserSettingsLine />
//       },
//       // {
//       //  name: 'Settings',
//       //  path: '/admin/settings',
//       //  icon: <IoSettingsOutline /> 
//       // },

//     ]

//   return (
//     <>
//       <div className="md:hidden flex justify-between items-center p-4 z-50 relative">
//         <button onClick={() => setIsOpen(!isOpen)}
//           className='text-black bg-transparent'>
//         <GiHamburgerMenu size={24} />
//         </button>
//       </div>

//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-60 bg-white text-black p-2 shadow-md z-50 transition-transform duration-300 
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
//         md:translate-x-0 md:static md:h-screen`}
//       >


//       <div className="mb-6">
//         <div className="md:hidden flex justify-between items-center">
//           <h2 className="text-xl font-bold ml-2">SysQube</h2>
//         </div>

//         <div className="hidden md:block">
//           <h2 className="text-xl font-bold ml-2">SysQube</h2>
//         </div>
//       </div>

//         <div className="sidebar-menu flex-grow">
//           <ul>
//             {navItems.map((item, index) => (
//               <li key={index}>
//                 <NavLink
//                   to={item.path}
//                   end={item.path === '/admin'}
//                   className={({ isActive }) =>
//                     `flex items-center gap-2 p-2 rounded-xl transition-all
//                     ${isActive ? 'text-indigo-600 font-semibold' : 'text-black hover:bg-gray-200'}`
//                   }
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.icon}
//                   {item.name}
//                 </NavLink>
                
//               </li>
//             ))}
//             <li>
//               <button
//                 onClick={handleSignOut}
//                 className="flex items-center gap-2 p-2 rounded-xl bg-transparent text-black hover:bg-gray-200 w-full text-left"
//               >
//                 <PiSignOut />
//                 Log Out
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { TbLayoutNavbar } from 'react-icons/tb';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GoFileMedia } from "react-icons/go";
import { VscLayoutMenubar } from "react-icons/vsc";
import { PiCards } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import { RiUserSettingsLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { PiSignOut } from 'react-icons/pi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be signed out of your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('Admin Role');

        Swal.fire('Signed Out!', 'You have been signed out.', 'success').then(() => {
          navigate('/admin/login');
        });
      }
    });
  };

  const toggleSubMenu = (name) => {
    setExpandedMenu(prev => (prev === name ? null : name));
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <IoHomeOutline /> },
    { name: 'Pages', path: '/admin/pages', icon: <TbLayoutNavbar /> },
    { name: 'Categories', path: '/admin/category', icon: <MdOutlineDashboardCustomize /> },
    { name: 'Menu', path: '/admin/menu', icon: <VscLayoutMenubar /> },
    { name: 'Banners', path: '/admin/banner', icon: <RiUserSettingsLine /> },
    {
      name: 'Components',
      icon: <GoFileMedia />,
      children: [
        { name: 'Features', path: '/admin/components/features' },
        { name: 'Achievements', path: '/admin/components/achievements' },
        { name: 'Gameweek', path: '/admin/components/gameweek' },
        { name: 'Join the Club', path: '/admin/components/join' },
        { name: 'Our Wings', path: '/admin/components/wings' },
        { name: 'Our Partner', path: '/admin/components/partners' },
        { name: 'Call-to-action', path: '/admin/components/cta' },
        { name: 'Events', path: '/admin/components/events' },
        { name: 'Gallery', path: '/admin/components/gallery' },
      ]
    },
    { name: 'Section', path: '/admin/sections', icon: <RiUserSettingsLine /> },
    { name: 'Media Center', path: '/admin/media', icon: <GoFileMedia /> },
    { name: 'Services', path: '/admin/services', icon: <PiCards /> },
    { name: 'Permissions', path: '/admin/permissions', icon: <GrUserAdmin /> },
    { name: 'Roles', path: '/admin/roles', icon: <RiUserSettingsLine /> },
    { name: 'Users', path: '/admin/users', icon: <RiUserSettingsLine /> }
  ];

  return (
    <>
      <div className="md:hidden flex justify-between items-center p-4 z-50 relative">
        <button onClick={() => setIsOpen(!isOpen)} className='text-black bg-transparent'>
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

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
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className="flex items-center gap-2 p-2 text-gray-900 bg-transparent rounded-xl w-full text-left hover:bg-gray-200"
                    >
                      {item.icon}
                      {item.name}
                    </button>
                    {expandedMenu === item.name && (
                      <ul className="ml-6">
                        {item.children.map((child, i) => (
                          <li key={i}>
                            <NavLink
                              to={child.path}
                              className={({ isActive }) =>
                                `block p-2 text-sm rounded-xl ${isActive ? 'text-indigo-600 font-semibold' : 'text-black hover:bg-gray-100'}`
                              }
                              onClick={() => setIsOpen(false)}
                            >
                              {child.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
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
                )}
              </li>
            ))}

            <li>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 p-2 rounded-xl bg-transparent text-black hover:bg-gray-200 w-full text-left"
              >
                <PiSignOut />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

