import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import TopHeader from '../components/TopHeader';
import ScrollNav from '../components/ScrollNav';
import ScrollToTop from '../reusables/ScrollToTop';

export const UserContext=createContext();
const UserLayout = () => {
  
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

  //drop down menu logic
  const [sideMenu, setSideMenu] = useState(false);
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
  

  return (
    <UserContext.Provider value={{sideMenu,handleMouseEnter, setSideMenu, handleMouseLeave,activeDropdown,menuOpen,toggleMenu,setMenuOpen,modalIsOpen,openModal,closeModal,setActiveDropdown}}>
    <section className=' font-poppins bg-white'>
      <TopHeader/>
      <ScrollNav/>
      <NavBar/>
      <Outlet/>
      <ScrollToTop/>
      <Footer/>
    </section>
    </UserContext.Provider>
  )
}

export default UserLayout
