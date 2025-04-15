import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from 'react-redux';
import PaginationNav from '../reusables/PaginationNav';
import { eventItems } from '../utils/Elements';

const EventPagination = () => {
    const data=eventItems;
    const { currentPage, datasPerPage } = useSelector((state) => state.pagyslice);  
    const totalPage = Math.ceil((data?.length ?? 0) / datasPerPage);
    const pages = totalPage > 0 ? [...Array(totalPage + 1).keys()].slice(1) : [];
  
    const lastIndex = currentPage * datasPerPage;
    const firstIndex = lastIndex - datasPerPage;
    const visibleDatas = data?.slice(firstIndex, lastIndex);
    
  return (
    <div className=' flex flex-col  gap-6'>
      {visibleDatas.map((item,idx) => {
            return (
              <div className="relative flex lg:flex-row flex-col  gap-6 justify-between shadow bg-white rounded-md items-center p-[16px] " key={idx}>
               <div className=" relative h-[8rem] w-full lg:w-[12.5rem] rounded-xl">
                <img
                  src={item.img}
                  className=" rounded-sm w-full h-full"
                />
                <section className="absolute right-0 flex gap-2 lg:hidden justify-between">
                  <FaEdit className=" text-[1.4rem] text-indigo-600" />
                  <MdDeleteForever className=" text-[1.5rem] text-[#de163a]" />
                </section>
                <p className=" font-poppins bottom-0  px-2 py-0.5 w-full text-black text-center absolute bg-white/40 backdrop-blur-lg text-[12px] ">{item.location}</p>
                </div>

                <div className=" space-y-2 lg:w-[50%]">
                    <p className=" text-indigo-500 font-[500] font-jamjure">
                      {item.date}
                    </p>
                  <h6 className=" font-[600] ">{item.title}</h6>
                  <p className=" line-clamp-3 caption">{item.desc}</p>
                </div>
                <div className='lg:flex hidden flex-col h-[8rem] justify-between'>
                <section className=" flex justify-between">
                  <FaEdit className=" text-[1.4rem] text-indigo-600" />
                  <MdDeleteForever className=" text-[1.5rem] text-[#de163a]" />
                </section>
                <section className=" ">
                  <p>Starts from</p>
                  <h6 className=" font-jamjure font-[600] text-indigo-400">
                    {item.time}
                  </h6>
                </section>
                </div>
              </div>
            );
          })}
          <PaginationNav pages={pages} totalPage={totalPage} data={eventItems}/>
    </div>
  )
}

export default EventPagination
