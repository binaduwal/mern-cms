import React, { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../utils/Elements";
import { UserContext } from "../layout/UserLayout";
import MobileMenu from "../reusables/MobileMenu";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {sideMenu,handleMouseEnter, setSideMenu, handleMouseLeave,activeDropdown}=useContext(UserContext);

  return (
    <div className=" bg-white ">
      <div className="flex items-center mx-auto justify-between max-w-[1270px] py-4 px-3 lg:px-0 lg:py-5 font-montserrat ">
        <Link to="/">
          <h6>LOGO</h6>
        </Link>
        <div className="lg:flex items-center gap-x-5 hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={item.path}>
                  <section
                    className={`cursor-pointer flex items-end group gap-1 `}
                  >
                    <p className={`caption font-noto_sans ${isActive ? "text-indigo-600" : ""}`}>
                      {item.title}
                    </p>
                    {item.icon2 && (
                      <h3 className="text-[1.3rem] group-hover:-rotate-90 duration-300">
                        {item.icon2}
                      </h3>
                    )}
                  </section>
                </Link>

                {item.dropdown?.length > 0 && activeDropdown === item.id && (
                  <div
                    className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md min-w-[10rem] z-10"
                    style={{ zIndex: 1000 }}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.id}
                        to={dropdownItem.path}
                        className={`small-text ${
                          isActive ? "text-indigo-500" : "text-neutral-500"
                        } block px-4 py-2 hover:bg-gray-200  `}
                      >
                        {dropdownItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <p
            className=" bg-indigo-400 px-4 text-sm rounded py-2 text-white "
            onClick={() => navigate("/signup")}
          >
            SIGN IN
          </p>
        </div>


        {/*navbar for mobile*/}
        <div
          onClick={() => setSideMenu(!sideMenu)}
          className={` lg:hidden flex items-center gap-x-4 ${sideMenu===true?"hidden":"block"} `} 
        >
          <p  onClick={() => navigate("/signup")}>SIGN IN</p>
          {sideMenu === false ? (
            <IoMenu className="text-[2.3rem] block lg:hidden" />
          ) : (
            <RxCross1 className="text-[2.2rem] z-[10] absolute right-2 top-2" />
          )}
        </div>
       <MobileMenu/>
      </div>
    </div>
  );
};

export default NavBar;
