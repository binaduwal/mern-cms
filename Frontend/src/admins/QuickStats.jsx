import React from 'react'

const QuickStats = ({data}) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-[#f7f8fb] ">
    {data.map((item) => {
      const changeValue = parseInt(item.rates);
      const changeColorClass =
        changeValue > 0 ? "bg-[#33d685]" : "bg-[#de163a]";
      return (
        <div
          key={item.id}
          className={` p-[16px] rounded-md bg-[#ffffff] drop-shadow `}
        >
          <section className="flex justify-between items-center ">
            <h3 className="  text-[1.5rem] rounded-lg ">
              {item.icon}
            </h3>
            <p
              className={` ${changeColorClass} font-jamjure py-0.5 px-2 text-white  rounded-3xl text-[11px] font-[500]`}
            >
              {item.rates}
            </p>
          </section>
          <h6 className=" my-2 ">Total {item.title}</h6>
          <section className=" flex gap-3 items-center">
            <h3>{item.number}</h3>
            <p className=' caption'>{item.title} vs last month</p>
          </section>
        </div>
      );
    })}
  </div>

  )
}

export default QuickStats
