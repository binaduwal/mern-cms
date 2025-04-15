import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../utils/Elements";

const SidebarLayout = ({ dashMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null); // State to handle open submenu

  const toggleSubmenu = (idx) => {
    setOpenSubmenu(openSubmenu === idx ? null : idx);
  };

  return (
    <div className=" flex flex-col gap-0 overflow-y-scroll">
      {AdminSidebar.map((item, idx) => {
        const isActive = location.pathname === item.path;
        const isSubmenuOpen = openSubmenu === idx;

        return (
          <div key={idx} className="rounded-md py-1.5 px-3  font-jamjure ">
            <div
              className={`flex items-center  rounded-md ${
                dashMenu === true
                  ? " justify-start px-2 py-1"
                  : "justify-center py-2"
              }
                  ${
                    isActive
                      ? "lg:bg-indigo-400 transition duration-500 text-white drop-shadow-lg"
                      : "lg:hover:bg-zinc-400 hover:transition hover:duration-500 duration-700 hover:scale-105 hover:text-black"
                  }`}
              onClick={() => {
                `${
                  item.submenu
                    ? toggleSubmenu(idx) && navigate(item.path)
                    : navigate(item.path)
                }`;
              }}
            >
              <p
                className={` mx-auto lg:mx-0 text-[1.2rem] ${
                  isActive ? "text-indigo-400 lg:text-white" : ""
                }`}
              >
                {item.icon}
              </p>
              <section
                className={`px-2 py-1.5  flex justify-between w-full items-center ${
                  dashMenu === true ? "block" : "hidden"
                }`}
              >
                <p
                  className={`text-[15px] font-[500] font-jamjure ${
                    isActive ? "lg:text-white text-indigo-400" : " "
                  } `}
                >
                  {item.title}
                </p>
                <h6
                  className={` duration-300 ${isActive && "text-white"} ${
                    openSubmenu === idx && " rotate-90"
                  } `}
                >
                  {item.icon2}
                </h6>
              </section>
            </div>

            {isSubmenuOpen && item.submenu && (
              <div className=" pl-1 pt-1.5 ">
                {item.submenu.map((submenuItem, idx) => (
                  <section
                    key={idx}
                    className={`flex items-center gap-3 ${
                      dashMenu === true
                        ? " justify-start py-2"
                        : " justify-center py-2.5"
                    } px-2 my-1 rounded-md
                        ${
                          location.pathname === submenuItem.path
                            ? "lg:bg-indigo-400 "
                            : "lg:hover:bg-zinc-400 hover:transition hover:duration-500 duration-700 hover:scale-105 hover:text-black"
                        }`}
                    onClick={() => navigate(submenuItem.path)}
                  >
                    <p
                      className={` text-[0.8rem]  ${
                        location.pathname === submenuItem.path
                          ? "text-indigo-400 lg:text-white"
                          : ""
                      }`}
                    >
                      {submenuItem.icon}
                    </p>
                    <p
                      className={`  font-jamjure font-[500]  ${
                        location.pathname === submenuItem.path
                          ? "text-indigo-400 lg:text-white"
                          : ""
                      } ${dashMenu === true ? "block" : "hidden"}`}
                    >
                      {submenuItem.name}
                    </p>
                  </section>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarLayout;
