import React from 'react'
import { BiEdit, BiHeart } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import { GiLoveInjection } from 'react-icons/gi'
import { IoPerson } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import CustomButton from '../reusables/CustomButton'

const Landing = () => {
    const {credentials}=useSelector((state)=>state.signupslice);

  return (
    <div className=' z-[2]'>
    <div className=' flex md:flex-row flex-col gap-3 w-full font-jamjure z-[2]'>
    <div className=' flex relative bg-indigo-400 shadow-md shadow-indigo-300 py-4 px-3 rounded-xl gap-3 items-center flex-1'>
    <IoPerson className=' bg-white rounded-xl p-2.5 text-[2.5rem]'/>
    <section className=' space-y-1'>
    <h2 className=' text-white text-[20px] '>Welcome, Shirish</h2>
    <p className=' text-white w-[85%]'>Here are your detials from consultancy profile. You can chaneg and edit your profile here</p>
    </section>
    <section className=' absolute right-2 top-2 flex items-center text-white gap-1.5'>
        <h2 className=' text-white font-montserrat'>
        Edit 
        </h2>
        <BsArrowRight/>
    </section>
     
    </div>
    <div className=' border-2 relative lg:w-[18%] gap-1.5 shadow-md shadow-gray-200 text-center p-3 flex flex-col justify-center py-4 px-3 rounded-xl'>
    <GiLoveInjection className=' mx-auto text-[1.6rem] text-violet-600'/>
    <h2>Destinations</h2>
    <p className=' text-black '>No any Destination</p>
    <BsArrowRight className=' absolute top-2 right-2'/>
    </div>
    <div  className=' border-2 relative lg:w-[18%] shadow-md shadow-gray-200 gap-1.5 text-center p-3 flex flex-col justify-center py-4 px-3 rounded-xl'>
    <BiHeart className=' mx-auto text-[1.8rem] text-red-600'/>
    <h2>Favourites</h2>
    <p>You have 0 favourites</p>
    <BsArrowRight className=' absolute top-2 right-2'/>

    </div>
      
    </div>
    <div className=' grid grid-col-2 lg:grid-cols-3 gap-3 mt-3 font-montserrat'>
        <div className=' col-span-2 rounded-xl border-2 h-[16rem] p-3'>
        <section className=' flex justify-between border-b border-gray-300 py-1.5'>
            <h2>VIEW DESTINATIONS</h2>
            <h3 className=' flex items-center font-montserrat gap-1'>View All <BsArrowRight/></h3>
            </section>
        </div>
        <div className=' col-span-2 lg:col-span-1 rounded-xl border-2 h-[16rem] p-3'>
        <section className=' flex justify-between border-b border-gray-300 py-1.5'>
            <h2>ADDRESS BOOK</h2>
            <h3 className=' flex items-center font-montserrat gap-1'>View & Edit <BsArrowRight/></h3>
            </section>
            <section className=' border-indigo-300 border-2 rounded-xl p-3 mt-3 space-y-2.5'>
                <h3 className=' font-poppins'>{credentials.first_name} {credentials.last_name}</h3>
                <p className=' font-[450]'>{credentials.address},{credentials.city}</p>
                <section className=" mt-5 ">
                <CustomButton color={"bg-indigo-400"} type="submit">
                  {" "}
                  <span className=" flex items-center gap-x-1">
                    <BiEdit color="white" />
                    Edit
                  </span>
                </CustomButton>
              </section>
            </section>
            
        </div>
    </div>
    </div>
  )
}

export default Landing
