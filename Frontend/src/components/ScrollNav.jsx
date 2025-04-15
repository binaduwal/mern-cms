import { useContext, useEffect, useState } from "react";
import { navItems } from "../utils/Elements";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../layout/UserLayout";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import MobileMenu from "../reusables/MobileMenu";

const ScrollNav = () => {
  const location=useLocation();
  const navigate=useNavigate();
  const {sideMenu, setSideMenu}=useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const handleMouseEnter = (id) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  useEffect(() => {
    const handleScroll = () => {
      let scrollYThreshold;
      if (window.innerWidth <= 640) {
        scrollYThreshold = 140; // Adjust threshold for small screens
      } else {
        scrollYThreshold = 100; // Default threshold for medium & above screens
      }
      // Add logic for handling scroll based on the threshold
      if (window.scrollY > scrollYThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <header className={` fixed top-0 left-0 right-0 bg-white transition-transform duration-300 ease-in-out z-50 ${
      isVisible ? "transform translate-y-0" : "transform -translate-y-full"
    }`}>
          <div className="hidden lg:flex items-center mx-auto justify-between max-w-[1270px] py-5 font-montserrat ">
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
                        className={`${
                          isActive ? "text-indigo-500" : " text-neutral-500 "
                        } block px-4 py-2 hover:bg-gray-200 small-text `}
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
            className=" bg-indigo-400 text-sm px-4 rounded py-2 text-white "
            onClick={() => navigate("/signup")}
          >
            SIGN IN
          </p>
        </div>
      </div>

        {/*navbar for mobile*/}
        <section 
          onClick={() => setSideMenu(!sideMenu)}
          className={` ${sideMenu==true?"hidden":"block"} lg:hidden justify-between flex items-center w-full py-4 px-3 `}
        >
         <Link to="/">
          <h6>LOGO</h6>
        </Link>
        <div className=" flex items-center gap-x-4">
          <p  onClick={() => navigate("/signup")}>SIGN IN</p>
          {sideMenu === false ? (
            <IoMenu className="text-[2.3rem] block lg:hidden" />
          ) : (
            <RxCross1 className="text-[2.2rem] z-[4] block lg:hidden" />
          )}
          </div>
        </section>
     <MobileMenu/>   
  </header>
  )
}

export default ScrollNav