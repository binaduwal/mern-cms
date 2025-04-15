import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";


const Faq = ({data}) => {
  const [activeIds, setActiveIds] = useState([1]); // Set the first item to be open initially

  const toggleFAQ = (id) => {
    setActiveIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((activeId) => activeId !== id) // Remove id if already active
        : [...prevIds, id] // Add id if not active
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-8 md:mb-12">
      {data.map((item) => (
        <div key={item.id} className="relative border-b-2 border-gray-200">
          <div
            className="flex items-center gap-7 pt-2.5 pb-5 cursor-pointer z-[1]"
            onClick={() => toggleFAQ(item.id)}
          >
            <span>
              {activeIds.includes(item.id) ? (
                <FaMinus className="text-xl text-orange-400" />
              ) : (
                <FaPlus className="text-xl text-indigo-400" />
              )}
            </span>
            <h6>{item.ques}</h6>
          </div>

          <div
            className={`lg:w-[97%] overflow-hidden transition-max-height duration-500 ease-in-out drop-shadow-lg ${
              activeIds.includes(item.id) ? " max-h-80 lg:max-h-40" : "max-h-0 text-zinc-100"
            }`}
          >
            <p className="hidden sm:block transition-all duration-300 mb-8 lg:mb-10 mt-2 px-3.5 border-l-2 border-indigo-400 ml-[1rem] lg:ml-[4rem]">
              {item.ans}
            </p>
            <p className="block sm:hidden caption transition-all duration-300 mb-8 mt-2 px-3.5 border-l-2 border-indigo-400 ml-[1rem] ">
              {item.ans}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
