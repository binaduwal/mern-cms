import React from "react";
import { blogItems } from "../utils/Elements";
import PaginationNav from "../reusables/PaginationNav";
import { useSelector } from "react-redux";
import CustomButton from "../reusables/CustomButton";

const AdminBlogs = ({ data }) => {
  const { currentPage, datasPerPage } = useSelector((state) => state.pagyslice);
  const totalPage = Math.ceil((data?.length ?? 0) / datasPerPage);
  const pages = totalPage > 0 ? [...Array(totalPage + 1).keys()].slice(1) : [];

  const lastIndex = currentPage * datasPerPage;
  const firstIndex = lastIndex - datasPerPage;
  const visibleDatas = data?.slice(firstIndex, lastIndex);
  return (
    <>
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
                    <h4 className="  text-white font-jamjure leading-snug mb-1">{item.title}</h4>
                    <p className="text-[12px] font-jamjure text-white">
                      {item.date}
                    </p>
                  </section>
                </div>
                <div className="absolute inset-0 mx-auto px-4 py-2 lg:py-4 bg-neutral-800 bg-opacity-50 backdrop-blur-[6px] rounded-t-xl translate-y-[15%] opacity-0 duration-500 group-hover:translate-y-0 group-hover:opacity-100 flex items-center">
                  <section className=" w-[50%] mx-auto space-y-4 ">
                    <CustomButton width="w-full">Edit</CustomButton>
                    <CustomButton width="w-full" color="bg-red-600">
                      Delete
                    </CustomButton>
                  </section>
                </div>
              </div>
              <div className=" p-2 space-y-2 flex justify-between items-end ">
                <p className=" font-jamjure text-indigo-400 font-[600] -rotate-90 w-[0.5%] mr-6 mt-auto">
                  {item.category.toUpperCase()}
                </p>
                <p className=" line-clamp-4 caption">
                  <span className="text-3xl font-semibold">
                    {item.desc.charAt(0)}
                  </span>
                  {item.desc.slice(1)}
                </p>
              </div>
              <p className=" flex py-2 justify-end font-[500] px-2 font-jamjure text-indigo-500">Read More...</p>
            </div>
          );
        })}
      </div>
      <PaginationNav pages={pages} totalPage={totalPage} data={blogItems} />
    </>
  );
};

export default AdminBlogs;
