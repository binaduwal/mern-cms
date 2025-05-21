import React, { useContext, useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../layout/UserLayout";
import MobileMenu from "../reusables/MobileMenu";
import { useGetItemQuery } from "../app/services/QuerySettings";
import { MdKeyboardArrowDown } from "react-icons/md";

const NavBar = () => {
  const { data: rawNavItems, isLoading } = useGetItemQuery(
    { url: "/menu/all" },
    { refetchOnMountOrArgChange: true }
  );
  

  // console.log("navmenu:", rawNavItems);
  const [processedNavItems, setProcessedNavItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { sideMenu, handleMouseEnter, setSideMenu, handleMouseLeave, activeDropdown } = useContext(UserContext);


  useEffect(() => {
    if (rawNavItems && rawNavItems.length > 0) {
      const items = JSON.parse(JSON.stringify(rawNavItems));

      const itemMap = {};
      items.forEach(item => {
        itemMap[item._id] = { ...item, dropdown: [] };
      });

      const topLevelItems = [];
      items.forEach(originalItem => {
        const item = itemMap[originalItem._id];
        const parentId = originalItem.parent
          ? (typeof originalItem.parent === 'string' ? originalItem.parent : originalItem.parent._id)
          : null;

        if (parentId && itemMap[parentId]) {
          itemMap[parentId].dropdown.push(item);
        } else {
          topLevelItems.push(item);
        }
      });

      const sortByOrder = (a, b) => (a.order || 0) - (b.order || 0);

      topLevelItems.sort(sortByOrder);
      Object.values(itemMap).forEach(item => {
        if (item.dropdown.length > 0) {
          item.dropdown.sort(sortByOrder);
        }
      });
      setProcessedNavItems(topLevelItems);
    } else {
      setProcessedNavItems([]);
    }
  }, [rawNavItems]);


  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <div className=" bg-white ">
      <div className="flex items-center mx-auto justify-between max-w-[1270px] py-4 px-3 lg:px-0 lg:py-5 font-montserrat ">
        <Link to="/">
          <h6>LOGO</h6>
        </Link>
        <div className="lg:flex items-center gap-x-5 hidden">
          {processedNavItems?.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item._id}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item._id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={item.path}>
                  <section
                    className={`cursor-pointer flex items-end group gap-1 `}
                  >
 <p className={`caption font-noto_sans ${isActive ? "text-indigo-600" : "text-neutral-700"}`}>
                      {item.title}
                    </p>
                    {item.dropdown && item.dropdown.length > 0 && (
                      <MdKeyboardArrowDown className="text-[1.3rem] group-hover:-rotate-90 duration-300" />
                    )}
                  </section>
                </Link>

                {item.dropdown && item.dropdown.length > 0 && activeDropdown === item._id && ( 
                  <div
                    className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md min-w-[10rem] z-10"
                    style={{ zIndex: 1000 }}
                    onMouseEnter={() => handleMouseEnter(item._id)} 
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.dropdown.map((dropdownItem) => (                                                                                                                                                                  
                      <Link
                        key={dropdownItem._id}
                        to={dropdownItem.path}
                        className={`small-text ${isActive ? "text-indigo-500" : "text-neutral-500"
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
          className={` lg:hidden flex items-center gap-x-4 ${sideMenu === true ? "hidden" : "block"} `}
        >
          <p onClick={() => navigate("/signup")}>SIGN IN</p>
          {sideMenu === false ? (
            <IoMenu className="text-[2.3rem] block lg:hidden" />
          ) : (
            <RxCross1 className="text-[2.2rem] z-[10] absolute right-2 top-2" />
          )}
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};

export default NavBar;
