import React from "react";
import { RxCross2 } from "react-icons/rx";

const FilterBar = ({menuOpen,data,toggleMenu,onCategoryClick}) => {
  return (
    <div
      className={` fixed top-0.5 z-50  h-[100vh] w-[50%] md:w-[30%] lg:w-[20%] bg-gray-100 p-4 lg:p-6
    drop-shadow-lg duration-500 font-semibold py-2  transition-transform transform ${
      menuOpen ? "translate-x-0 right-0" : "translate-x-full right-0"
    }`}
    > 
      <section className=" flex justify-between items-center">
      <h5>Categories</h5>
      <RxCross2 onClick={toggleMenu} className=" text-[2rem] text-indigo-500"/>
      </section>
      <div className=" mt-6 space-y-5">
      {data.map((item, idx) => (
        <div key={item.id}  onClick={() => onCategoryClick(item.title)}>
          <h6 className="hover:text-indigo-500 duration-500 my-4 px-2 ">
            {item.title}
          </h6>
        </div>
      ))}
      </div>
    </div>
  );
};

export default FilterBar;
