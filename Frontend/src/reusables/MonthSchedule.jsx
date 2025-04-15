import React from 'react'

const MonthSchedule = ({data,title}) => { 
  return (
    <div className=" bg-white drop-shadow-md px-4 lg:px-6 py-2 flex-1 rounded-lg h-fit">
          <h6 className=" border-b border-gray-200 py-2">{title} This Month</h6>
          <div className=" space-y-6 mt-4">
            {data.slice(0, 4).map((item, idx) => {
              const [month,day]=item.date.split(" ");
              return (
                <div className=" flex gap-4 " key={idx}>
                  <section className=" w-[18%] lg:w-[14%]">
                    <p
                      className={`font-[500] caption ${
                        idx > 0 ? "bg-gray-200" : "bg-indigo-400 text-white"
                      } w-[3.3rem] h-fit  text-center p-1.5 rounded-lg `}
                    >
                      {month}<br/> <span className=" text-[20px] font-semibold">{day}</span>
                    </p>
                  </section>
                  <section
                    className={` border-l-2 border-gray-500 p-2 flex-1 space-y-1 ${
                      idx === 0 ? " bg-indigo-50" : ""
                    }`}
                  >
                    <p className=" text-gray-500 font-[500] font-jamjure text-[12px]">
                      {item.time}
                    </p>
                    <p className=" font-semibold font-poppins">  {item.title || item.name || item.title}</p>
                    <p className=" line-clamp-2 caption">{item.desc || item.status }</p>
                  </section>
                </div>
              );
            })}
          </div>
        </div>
  )
}

export default MonthSchedule
