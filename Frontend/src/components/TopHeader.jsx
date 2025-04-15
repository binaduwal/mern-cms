import React from 'react'
import {  FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from 'react-icons/io';
import { socialLinks } from '../utils/Elements';

const TopHeader = () => {
    
  return (
    <section className=' bg-indigo-400'>
    <section className='hidden lg:flex items-center justify-between p-1.5 lg:p-0 lg:h-[2rem] max-w-[1270px] mx-auto'>
     <div className=' lg:flex items-center gap-6'>
     <section className=' flex items-center text-white gap-2 mb-2.5 lg:mb-0'>
        <FaPhoneAlt className=' text-[0.7rem] md:text-[0.8rem] lg:text-[1rem]'/>
        <p className=' text-white small-text'>Kathmandu: 015910770 ,015910776</p>
         <p className=' text-white small-text'>Lalitpur: 015911235</p>
     </section>
     <section className=' flex items-center gap-2'>
        <IoMdMail className=" text-white text-[0.8rem] md:text-[1rem] lg:text-[1.4rem]"/>
        <p className=' text-white small-text '>inquiry@nepalec.edu.np</p>
     </section>
     </div>
     <div className=' flex gap-4 items-center  justify-end lg:justify-start'>
      {
        socialLinks.map((item,idx)=>{
            return(
            <div key={idx}>
              <h3 className=' text-[1rem] text-white'>{item.icon}</h3>
            </div>
        )
        })
      }
      </div>
      </section>

      {/* top header for mobile*/}
      <section className=' grid grid-cols-2 lg:hidden gap-x-2 py-4 px-3'>
     <div className=' flex items-center text-white gap-2 mb-6'>
        <FaPhoneAlt className=' text-[1.2rem]'/>
        <p className=' text-white small-text'>Kathmandu: 015910770, 015910776</p>
     </div>
     <div className=' text-right text-white mb-6 '>
        <p className=' text-white small-text'>Lalitpur: 015911235</p>
     </div>
     <div className=' flex items-center gap-2'>
        <IoMdMail className=" text-white text-[1.2rem]"/>
        <p className=' text-white small-text '>inquiry@nepalec.edu.np</p>
     </div>
     
     <div className=' flex gap-4 items-center  justify-end'>
      {
        socialLinks.map((item,idx)=>{
            return(
            <div key={idx}>
              <h3 className=' text-[1rem] text-white'>{item.icon}</h3>
            </div>
        )
        })
      }
      </div>
      </section>
    </section>
  )
}

export default TopHeader
