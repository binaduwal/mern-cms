import React, { useState } from "react";
import { places } from "../utils/Elements";
import { useDispatch } from "react-redux";
import { countryInfo } from "../app/slices/CountrySlice";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";

const Destinations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState(null);

  const handleCountry = (item) => {
    dispatch(countryInfo(item));
    navigate("/countryinfo");
  };

  const handleExpand = (item) => {
    setExpandedItem(expandedItem === item.id ? null : item.id); // Toggle expand
  };

  function capitalizeAllLetters(str) {
    if (!str) return str; // Return the original string if it's empty
    return str.toUpperCase();
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {places.map((item, idx) => {
        const isExpanded = expandedItem === item.id;

        // Determine the span classes based on the item index
        const spanClasses = (() => {
          if (idx === 2) return "col-span-2 bg-bottom  ";
          if (idx === 3) return "col-span-2 bg-center ";
          return "col-span-1 bg-center ";
        })();

        return (
          <div
            className={`relative group cursor-pointer transition-all duration-500 transform ${spanClasses} ${
              isExpanded
                ? "col-span-full h-auto flex flex-col md:flex-row scale-105"
                : expandedItem
                ? "hidden"
                : "h-[12rem] scale-100 md:h-[14rem] lg:h-[22rem] hover:-translate-y-1 md:hover:-translate-y-2"
            }`}
            key={item.id}
            onClick={() => handleExpand(item)}
            style={{ transformOrigin: "center" }}
          >
            <div
              className={`absolute inset-0  bg-cover bg-no-repeat transition-all duration-500 ${
                isExpanded ? "md:static md:w-1/2 h-[18rem] md:h-auto " : ""
              }`}
              style={{
                backgroundImage: `url(${item.img})`,
              }}
            />

            {isExpanded ? (
              <div className=" flex flex-col drop-shadow-md justify-center px-8 md:px-20 pb-8 md:pb-20 pt-5 bg-white bg-opacity-100 md:bg-opacity-75 backdrop-blur-md z-10 relative flex-1">
                <div className="w-fit absolute right-2 top-3 bg-neutral-700 backdrop-blur-md p-2 rounded-full">
                  <RxCross2
                    onClick={() => handleExpand(item)}
                    className="text-white text-[1.5rem]"
                  />
                </div>
                <h1 className="text-neutral-200 text-right">0{idx + 1}</h1>

                <h3 className="text-2xl text-indigo-400 mb-5">
                  Study in {item.name}
                </h3>
                <p className="mb-8">{item.desc}</p>
                <h6
                  className="mt-2 text-indigo-500 flex gap-2 items-center"
                  onClick={() => handleCountry(item)}
                >
                  Read More
                  <span>
                    <IoIosArrowForward className="text-[1.4rem]" />
                  </span>
                </h6>
              </div>
            ) : (
              <section className="absolute group inset-0 flex flex-col justify-between bg-gradient-to-r from-black/80 p-5 to bg-black/20 bg-opacity-50">
                <h1 className=" text-neutral-200 group-hover:text-white duration-500 text-right ">
                  0{idx + 1}
                </h1>
                <h4 className="text-white tracking-wider group-hover:translate-x-2 group-hover:tracking-[0.03em] duration-500">
                  {capitalizeAllLetters(item.name)}
                </h4>
              </section>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Destinations;
