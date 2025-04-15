import React, { createContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineExitToApp } from "react-icons/md";
import { adminHeads, AdminSidebar } from "../utils/Elements";
import { IoMenu } from "react-icons/io5";
import SidebarLayout from "./SidebarLayout";
import { RxCross2 } from "react-icons/rx";

export const AdminContext = createContext();

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const getCurrentDate = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const today = new Date();
    const dayName = days[today.getDay()];
    const monthName = months[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();

    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${dayName}, ${monthName} ${day}${getDaySuffix(day)} ${year}`;
  };

  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTitle = () => {
    for (const item of AdminSidebar) {
      if (item.path === location.pathname) return item.title.toUpperCase();
      if (item.submenu) {
        const subItem = item.submenu.find(
          (sub) => sub.path === location.pathname
        );
        if (subItem) return subItem.specificPath.toUpperCase();
      }
    }
    return "DASHBOARD";
  };

  const activeTitle = getActiveTitle();
  const [dashMenu, setDashMenu] = useState(false);

  const [generatedIds, setGeneratedIds] = useState(new Set()); // Set to track unique IDs
  const generateUniqueId = () => {
    let randomId;
    do {
      randomId = Math.floor(Math.random() * 10000); // Generate random number from 0 to 1000
    } while (generatedIds.has(randomId)); // Check if ID already exists

    setGeneratedIds((prevIds) => new Set(prevIds).add(randomId)); // Add the new ID to the Set
    return randomId;
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setDashMenu(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <AdminContext.Provider
      value={{
        generateUniqueId,
        getCurrentDate,
        menuOpen,
        toggleMenu,
        setMenuOpen,
        modalIsOpen,
        openModal,
        closeModal,
        dashMenu,
      }}
    >
      <div className="flex w-full px-2.5 py-1.5 h-screen bg-white mx-auto max-w-[2000px] ">
        <div
          className={`font-poppins p-[8px] text-lg h-full duration-500 z-40  ${
            dashMenu === true
              ? "w-[60%] lg:w-[24%] "
              : "w-[15%] md:w-[10%] lg:w-[6%] "
          } text-indigo-500 space-y-1 rounded-sm`}
          ref={sidebarRef}
        >
          <h4
            className={`my-4  ${
              dashMenu === true ? " text-left" : " text-center "
            }`}
          >
            LOGO
          </h4>
          <div className="bg-white drop-shadow py-2 font-poppins flex  flex-col rounded h-[82%] text-black relative">
            <section
              onClick={() => setDashMenu(!dashMenu)}
              className={` duration-300 ${
                dashMenu === true ? " ml-auto  mr-2" : " mx-auto "
              }`}
            >
              {dashMenu === true ? (
                <RxCross2 className="text-[2rem] mb-4 text-black" />
              ) : (
                <IoMenu className={` text-[2rem] text-black `} />
              )}
            </section>
            <SidebarLayout dashMenu={dashMenu} />
          </div>

          <div
            className={`bg-white px-4 drop-shadow ${
              dashMenu === true ? "justify-between" : "justify-center"
            } w-full flex items-center hover:transition hover:translate-x-3  hover:duration-500 py-[8px] rounded-md duration-700 `}
            onClick={() => navigate("/")}
          >
            <h6
              className={`${
                dashMenu === true ? "block" : "hidden"
              } font-jamjure `}
            >
              Logout
            </h6>
            <MdOutlineExitToApp className="text-[#de163a] text-[1.6rem]" />
          </div>
        </div>

        <div className={` h-full flex flex-col w-full`}>
          <div className=" flex items-center justify-between gap-x-2 px-2 lg:px-8 pt-2 bg-opacity-50 backdrop-blur mt-3 bg-[#f7f8fb]">
            <div className="flex gap-2 ">
              <section>
                <h3 className=" mb-1 lg:mb-2 text-indigo-400 font-jamjure ">
                  {activeTitle}
                </h3>
                <p className="font-[400] text-gray-700 text-[11px] lg:text-[13px] font-poppins">
                  {getCurrentDate()}
                </p>
              </section>
            </div>
            <div className="flex gap-x-2 items-center md:gap-x-4">
              {adminHeads.map((item, idx) => (
                <h4
                  className="flex items-center gap-x-0.5 md:gap-x-3"
                  key={idx}
                >
                  {item.icon}
                </h4>
              ))}
            </div>
          </div>

          <div className=" px-2 lg:px-8 py-2 mt-4 overflow-y-scroll ">
            <Outlet />
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default AdminLayout;
