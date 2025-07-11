import React from 'react'
// import { cardDetails } from '../utils/Elements';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useGetItemQuery } from '../app/services/QuerySettings';

const ServiceCard = () => {
    const navigate=useNavigate();

      const { data: apiResponse, isError, isLoading } = useGetItemQuery(
        { url: "/services/all" },
        { refetchOnMountOrArgChange: true }
      );

  if (isLoading) {
    return <div className="text-center p-10">Loading services...</div>;
  }

  if (isError) {
    console.error("Error fetching services for ServiceCard:", isError);
    return <div className="text-center p-10 text-red-500">Error loading services.</div>;
  }
    

  const services = apiResponse?.data || [];
 if (services.length === 0) {
    return <div className="text-center p-10">No services available.</div>;
  }
  return (
    <section className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8'>
      {
        services.map((item)=>{
          return(
            <div key={item._id} className=' md:hover:-translate-y-2  duration-300 px-[1.8rem] py-[1.6rem] justify-between  flex flex-col gap-6 rounded-[10px] bg-white drop-shadow-md border-t-2 border-gray-100'>
                <h3 className={` ${item.icon_color} text-[2.2rem] lg:text-[2.8rem] flex justify-end`}>{item.icon}</h3>
                <div className=' h-[50%]'>
                <h6 className=' text-[1.2rem] mb-4 '>{item.title}</h6>
                <p className=' line-clamp-3 caption'>{item.summary}</p>
                </div>
                <img src={item.shape} className=' absolute bottom-0 right-0 h-[6.8rem] rounded-br-lg'/>
                <p className=' mt-16 hover:translate-x-2 duration-300 ' onClick={()=>navigate("/services")}><span><FaArrowRight className={`text-[1.6rem] `}/></span></p>
            </div>
          )
        })
      }
    </section>
  )
}

export default ServiceCard
