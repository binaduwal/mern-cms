import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeDataPerpage,
  onClickCurrentPage,
  onNavigateNext,
  onNavigatePrev,
} from "../app/slices/PaginationSlice";

const PaginationNav = ({ data, pages, totalPage }) => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.pagyslice);
  const handlePrev = () => {
    if (currentPage !== 1) {
      dispatch(onNavigatePrev());
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPage) {
      dispatch(onNavigateNext());
    }
  };

  const handleCurrentPage = (item) => {
    dispatch(onClickCurrentPage(item));
  };
  return (
    <>
      {data.length > 0 && (
        <div
          className=" flex gap-x-1 items-center px-3 
       w-fit py-1 mx-auto my-6"
        >
          <h6
            className={` ${
              currentPage === 1 ? "text-gray-400" : "text-neutral-900"
            } font-[550] `}
            onClick={handlePrev}
          >
            PREV
          </h6>
          <section>
            {pages?.map((item) => (
              <button
                key={item}
                className={`text-center px-4 font-poppins cursor-pointer font-[600]
            ${
              item === currentPage
                ? "bg-indigo-400 text-white rounded-full transition scale-95 duration-500 py-2"
                : "text-black bg-white"
            }`}
                onClick={() => handleCurrentPage(item)}
              >
                {item}
              </button>
            ))}
          </section>
          <h6
            className={`${
              currentPage === totalPage ? "text-gray-400 " : "text-neutral-900"
            } font-[550]`}
            onClick={handleNext}
          >
            NEXT
          </h6>
          <select
            onChange={(event) =>
              dispatch(onChangeDataPerpage(event.target.value))
            }
            className=" font-jamjure default:auto mx-3 bg-gray-100 border-2 border-indigo-500 rounded-lg p-2 text-[16px]"
            defaultValue={4}
          >
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>
      )}
    </>
  );
};

export default PaginationNav;
