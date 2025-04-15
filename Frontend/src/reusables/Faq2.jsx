import React, { useCallback, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const Faq2 = ({ data }) => {
  const [openFAQs, setOpenFAQs] = useState([]);

  const toggleFAQ = useCallback(
    (index) => {
      setOpenFAQs((prevOpenFAQs) => {
        if (prevOpenFAQs.includes(index)) {
          // If FAQ is already open, remove it from the array
          return prevOpenFAQs.filter((i) => i !== index);
        } else {
          // Otherwise, add it to the array
          return [...prevOpenFAQs, index];
        }
      });
    },
    [openFAQs] // Dependency array to ensure the function is memoized correctly
  );

  return (
   
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div
              onClick={() => toggleFAQ(idx)}
              className={`flex gap-2.5 justify-between items-center border-zinc-200  border-t-2 border-x-2 cursor-pointer px-3 sm:px-5 py-3 bg-white hover:bg-gray-50 transition duration-300 `}
            >
              <h6>{item.ques}</h6>
              <span>
                {openFAQs.includes(idx) ? (
                  <FiMinus size={24} className="text-yellow-500" />
                ) : (
                  <FiPlus size={24} className="text-indigo-400" />
                )}
              </span>
            </div>
            <div
              className={`overflow-hidden border-x-2 border-b-2 border-gray-200 transition-[max-height] duration-300 ease-in-out bg-white  ${
                openFAQs.includes(idx) ? "max-h-[26rem] md:max-h-[12rem] " : "max-h-0"
              }`}
            >
              <p className=" px-5 pt-1 pb-7 ">{item.ans}</p>
            </div>
          </div>
        ))}
      </div>
  );
};

export default React.memo(Faq2);
