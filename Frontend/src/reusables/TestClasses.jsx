import React, { useCallback, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  BsArrowUpRightCircleFill,
  BsEmojiDizzyFill,
  BsEmojiExpressionlessFill,
  BsEmojiFrownFill,
  BsEmojiGrimaceFill,
  BsEmojiLaughingFill,
  BsEmojiSunglassesFill,
  BsEmojiTearFill,
  BsEmojiWinkFill,
  BsFillEmojiSmileUpsideDownFill,
} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import JumptoSection from "./JumptoSection";
import { detailsNav } from "../utils/Elements";
import { FiMinus, FiPlus } from "react-icons/fi";
import ScoreScale from "../components/ScoreScale";

const TestClasses = ({ data, faqData }) => {
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
    [openFAQs]
  );

  const navigate = useNavigate();
  const testScores = [
    {
      Ielts: 9,
      Pte: "90-100",
      Remarks: "Expert",
      icon: <BsEmojiSunglassesFill />,
    },
    {
      Ielts: 8,
      Pte: "80-90",
      Remarks: "Very Good",
      icon: <BsEmojiLaughingFill />,
    },
    { Ielts: 7, Pte: "70-80", Remarks: "Good", icon: <BsEmojiWinkFill /> },
    {
      Ielts: 6,
      Pte: "60-70",
      Remarks: "Modest",
      icon: <BsEmojiExpressionlessFill />,
    },
    {
      Ielts: 5,
      Pte: "50-60",
      Remarks: "Limited",
      icon: <BsFillEmojiSmileUpsideDownFill />,
    },
    {
      Ielts: 4,
      Pte: "40-50",
      Remarks: "Average",
      icon: <BsEmojiFrownFill />,
    },
    { Ielts: 3, Pte: "30-40", Remarks: "Bad", icon: <BsEmojiTearFill /> },
    { Ielts: 2, Pte: "20-30", Remarks: "Worse", icon: <BsEmojiGrimaceFill /> },
    { Ielts: 1, Pte: "10-20", Remarks: "Worst", icon: <BsEmojiFrownFill /> },
    {
      Ielts: 0,
      Pte: " 0-10",
      Remarks: "Did not attempt",
      icon: <BsEmojiDizzyFill />,
    },
  ];
  const testClasses = [
    { id: 1, title: "IELTS", path: "/test/ielts" },
    {
      id: 2,
      title: "PTE",
      path: "/test/pte",
    },
    {
      id: 3,
      title: "SAT",
      path: "#",
    },
  ];

  const [selectedId, setSelectedId] = useState(null);
  const handleTest = (item) => {
    navigate(item.path);
    setSelectedId(item.id); // Update the selected ID
  };
  const location = useLocation();

  return (
    <>
      <section className="md:flex justify-between gap-16">
        <section className="md:w-[30%] bg-gray-100 p-7 sm:p-8 rounded-2xl">
          <h5 className="mb-6 tracking-wide">Alternative Tests</h5>
          <div className="flex flex-col gap-5">
            {testClasses.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={idx}
                  onClick={() => handleTest(item)}
                  className={`w-full flex duration-500 ${
                    isActive ? "bg-indigo-400" : "bg-white"
                  } items-center justify-between rounded-xl px-4 py-3`}
                >
                  <h6 className={`${isActive ? "text-white" : ""}`}>
                    {item.title}
                  </h6>
                  <BsArrowUpRightCircleFill
                    className={` ${
                      isActive ? "text-white" : " text-indigo-400"
                    } text-[2.4rem] `}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex-1 mt-[2.5rem] md:mt-0">
          <h3 className="mb-6">{data.title} Overview</h3>
          <p className=" mb-8">{data.summary}</p>
          <p className=" mb-8">{data.summary2}</p>
          <img
            src={data.aboutImg}
            className="w-full h-[14rem] sm:h-[16rem] object-cover rounded-2xl"
            alt={`${data.title}`}
          />
        </section>
      </section>

      <section className="w-full relative flex justify-between gap-14 mt-[0.5rem] mb-[2.5rem] md:mb-[4rem]">
        <div className="  sm:w-[65.5%]" id="format">
          <h4 className=" mt-[2.5rem] sm:mt-[4rem] mb-10 border-l-4 border-indigo-400 pl-4 ">
            {data.title} Test Format
          </h4>
          <section className=" grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {data.testFormat.map((item,idx) => {
              return (
                <section className=" flex gap-4 md:gap-6 items-center bg-gray-50 px-4 md:px-6 py-2.5 rounded-lg" key={idx}>
                  <div className=" bg-white py-3 px-3.5 rounded-xl">
                    <h2 className={` text-[2rem] md:text-[2.5rem] ${item.color}`}>
                      {item.icon}
                    </h2>
                  </div>
                  <div>
                    <p className=" mb-1">{item.name}</p>
                    <h5>{item.duration}</h5>
                  </div>
                </section>
              );
            })}
          </section>

          <section className="mt-[2.5rem] sm:mt-[4.5rem] " id="register">
            <h4 className=" border-l-4 border-indigo-400 pl-4 mb-6">
              How to register for {data.title}
            </h4>
            <h6 className=" mb-8">
              Candidates wanting to register for the {data.title} exam should
              follow these steps to successfully book their exam slot:
            </h6>
            {data.registration.list1}
          </section>

          <h4
            className=" mt-[2.5rem] mb-8 md:mt-[4rem] border-l-4 border-indigo-400 pl-4"
            id="score"
          >
            {data.title} Score Scale
          </h4>
          <table className=" w-full  ">
            <thead className=" bg-indigo-400 ">
              <tr>
                <Th>IELTS Score</Th>
                <Th>PTE Score</Th>
                <Th>Remarks</Th>
              </tr>
            </thead>
            <tbody>
              {testScores?.map((item, idx) => {
                return (
                  <tr
                    key={idx}
                    className={`border-b-2 border-gray-100 font-[400] `}
                  >
                    <Td border="border-l-2 border-gray-100 pl-6">{item.Ielts}</Td>
                    <Td>{item.Pte}</Td>
                    <Td border="border-r-2 border-gray-100">{item.Remarks}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h4
            className=" border-l-4 pl-4 border-indigo-400 mt-[2.7rem] md:mt-[4rem] mb-8"
            id="faq"
          >
            FAQ's
          </h4>
          <section className="space-y-4">
            {faqData.map((item, idx) => (
              <div key={idx}>
                <div
                  onClick={() => toggleFAQ(idx)}
                  className={`flex justify-between items-center gap-2.5 border-zinc-200  border-t-2 border-x-2 cursor-pointer px-3 sm:px-5 py-3 bg-white hover:bg-gray-50 transition duration-300 `}
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
                    openFAQs.includes(idx) ? " max-h-[26rem] md:max-h-[12rem] " : "max-h-0"
                  }`}
                >
                  <p className=" px-4 sm:px-5 pt-2 pb-6 sm:pb-7 ">{item.ans}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
        <div className=" hidden sm:block sm:w-[30%] md:w-[28%] sticky top-0 right-0 h-fit sm:pt-[4.75rem]">
          <JumptoSection data={detailsNav} />
        </div>
      </section>
    </>
  );
};

export default TestClasses;

const Th = ({ children, width }) => {
  return (
    <th className={` p-3 text-white text-left font-[500]`} style={{ width }}>
      {children}
    </th>
  );
};

const Td = ({ children,border }) => {
  return <td className={` p-3 font-[400] text-[14px] ${border}`}>{children}</td>;
};

