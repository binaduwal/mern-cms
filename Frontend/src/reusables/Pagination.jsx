import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationNav from "./PaginationNav";

const Pagination = ({ data }) => {
  const { currentPage, datasPerPage } = useSelector((state) => state.pagyslice);

  const totalPage = Math.ceil((data?.length ?? 0) / datasPerPage);
  const pages = totalPage > 0 ? [...Array(totalPage + 1).keys()].slice(1) : [];

  const lastIndex = currentPage * datasPerPage;
  const firstIndex = lastIndex - datasPerPage;
  const visibleDatas = data?.slice(firstIndex, lastIndex);

  // const getCurrentDate = () => {
  //   const today = new Date();
  //   const options = { day: "numeric", month: "short", year: "numeric" };
  //   return today.toLocaleDateString("en-US", options);
  // };

  return (
    <div className=" mt-5 z-0">
      {data.length === 0 ? (
        <h2>No any datas</h2>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[2rem]">
        {visibleDatas.map((item,idx) => {
          return (
            <div className=" bg-white rounded-[0.8rem] drop-shadow hover:drop-shadow-lg duration-300 p-2" key={idx}>
              <div className="relative group rounded-[0.8rem]">
                <div
                  className=" h-[12rem] md:h-[14rem] rounded-[0.8rem] lg:h-[16rem] content-end"
                  key={item.id}
                >
                  <div
                    className="absolute rounded-[0.8rem] inset-0 bg-center bg-cover  bg-no-repeat contrast-75 brightness-50"
                    style={{
                      backgroundImage: `url(${item.img})`,
                    }}
                  />
                  <section className=" px-4 py-6 relative ">
                    <h6 className="  text-white font-jamjure mb-2">{item.title}</h6>
                    <p className="text-[12px] font-jamjure text-white">
                      {item.date}
                    </p>
                  </section>
                </div>
              </div>
              <div className=" p-2 space-y-2 flex justify-between items-end ">
                <p className=" font-jamjure text-indigo-400 caption font-[500] -rotate-90 w-[0.5%] mr-6 mt-auto">
                  {item.category.toUpperCase()}
                </p>
                <p className=" line-clamp-4 caption">
                  <span className="text-2xl font-semibold">
                    {item.desc.charAt(0)}
                  </span>
                  {item.desc.slice(1)}
                </p>
              </div>
              <p className=" flex py-2 caption justify-end font-[500] px-2 text-indigo-500">Read More...</p>
            </div>
          );
        })}
      </div>
      )}
      <PaginationNav pages={pages} totalPage={totalPage} data={data}/>
    </div>
  );
};

export default Pagination;
