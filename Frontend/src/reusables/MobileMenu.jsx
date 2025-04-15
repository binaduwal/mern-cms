import React, { useContext } from 'react'
import { UserContext } from '../layout/UserLayout';
import { navItems } from '../utils/Elements';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';

const MobileMenu = () => {
    const {sideMenu, setSideMenu,setActiveDropdown,activeDropdown}=useContext(UserContext);
  return (
    <>
    {sideMenu === true && (
          <section className="z-[3] py-10 h-screen absolute inset-0 text-center top-0 w-full bg-white backdrop-blur-md space-y-6">
          <RxCross2 className=' absolute text-[2.7rem] top-2 right-2' onClick={()=>setSideMenu(false)}/>
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.dropdown ? (
                  <h6
                    className=" cursor-pointer flex justify-center items-center gap-2"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.id ? null : item.id
                      )
                    } // Toggle dropdown on click
                  >
                    {item.title}{" "}
                    <span
                      className={`text-[1.5rem] duration-300 ${
                        activeDropdown === item.id ? " -rotate-90" : ""
                      }`}
                    >
                      {item.icon2}
                    </span>
                  </h6>
                ) : (
                  <Link to={item.path} onClick={()=>setSideMenu(!sideMenu)}>
                    <h6 className=" cursor-pointer flex justify-center items-center gap-2">
                      {item.title}{" "}
                    </h6>
                  </Link>
                )}

                {/* Check if the item has dropdown items and if the dropdown is active */}
                {item.dropdown?.length > 0 && activeDropdown === item.id && (
                  <div className="space-y-4 px-4 py-2 w-full">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.id}
                        to={dropdownItem.path}
                        className="flex flex-col mx-auto my-2"
                        onClick={() => setSideMenu(false)}
                      >
                        <p>{dropdownItem.title}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      
    </>
  )
}

export default MobileMenu
