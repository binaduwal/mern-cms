import React, { useState } from "react";
import { IoHome, IoPerson } from "react-icons/io5";
import { FaGlobeAsia } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const DashNav = () => {
  const navPaths = [
    {
      id: 1,
      title: "Dashboard",
      path: "/userdashboard",
      icons: <IoHome />,
    },
    {
      id: 2,
      title: "Profile",
      path: "/userdashboard/userprofile",
      icons: <IoPerson />,
    },
    
  ];

  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className=" h-[75vh] top-[7rem] left-0 text-neutral-800 bg-gray-100 z-20 font-jamjure">
      <div
        className="flex flex-col gap-y-8 w-[3rem] md:w-[4.5rem] hover:w-[12rem] lg:hover:w-[14rem] duration-500 container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {navPaths.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.id}
              className={`group relative flex items-center py-1 gap-x-3  w-full
                ${isActive ? " text-red-600 " : ""}`}
            >
              <Link
                to={item.path}
                className="flex items-center w-full h-full hover:text-black gap-x-3 hover:translate-x-1 duration-500 hover:font-[450] font-[350]"
              >
                <h1 className="text-[1.3rem]">{item.icons}</h1>
                <h3
                  className={` whitespace-nowrap font-jamjure ${
                    isHovered ? "opacity-100 duration-500 " : "opacity-0 "
                  } transition-opacity`}
                >
                  {item.title}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashNav;