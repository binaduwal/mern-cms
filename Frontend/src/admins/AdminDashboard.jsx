import React from "react";
import { IoNewspaper } from "react-icons/io5";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaArrowRight, FaClipboardQuestion } from "react-icons/fa6";
import { appointmentItems, eventItems, inquiryItems } from "../utils/Elements";
import QuickStats from "./QuickStats";
import { Link } from "react-router-dom";

 const AdminDashboard = () => {
  const quickStats = [
    {
      id: 1,
      title: "Blog Posts",
      number: "25",
      rates: "-2.01%",
      color: "bg-[#ffffff]",
      icon: <IoNewspaper className=" text-indigo-400" />,
    },
    {
      id: 2,
      title: "Events",
      number: "10",
      rates: "+3%",
      icon: <MdOutlineEmojiEvents className=" text-yellow-500" />,
    },
    {
      id: 3,
      title: "Appointments",
      number: "50",
      rates: "+2.08%",
      icon: <SlCalender className=" text-green-700" />,
    },
    {
      id: 4,
      title: "Inquiries",
      number: "20",
      rates: "+1.08%",
      icon: <FaClipboardQuestion className=" text-red-400" />,
    },
  ];

  return (
    <>
     <QuickStats data={quickStats}/>
      <div className=" grid grid-cols-2 mt-[4rem] gap-8">
        <div className=" bg-white drop-shadow p-4 lg:p-[24px] rounded-md col-span-2 lg:col-span-1">
          <section className=" flex justify-between border-b pb-[8px] border-gray-100">
            <h6>Recent Appointments</h6>
            <Link to="/admin/appointment">
            <p className="flex items-center gap-2 font-[500] text-indigo-500 hover:translate-x-1.5 duration-300">
              View More <FaArrowRight className="text-[1rem] " />
            </p>{" "}</Link>
          </section>
          <table className="flex-1  mt-[16px] ">
            <thead className=" border-b-2 border-gray-300 ">
              <tr>
                <Th width="50%">Student Name</Th>
                <Th width="50%">Date</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {appointmentItems?.map((item, idx) => {
                const statusInfo = item.status === "Pending";
                return (
                  <tr
                    key={idx}
                    className={`${
                    idx !== appointmentItems.length - 1
                      ? " border-gray-200 border-b "
                      : ""
                  }  font-[400] py-1 `}
                  >
                    <Td>{item.name}</Td>
                    <Td>{item.date}</Td>
                    <td
                      className={` ${
                        statusInfo ? "text-[#de163a]" : " text-[#20bd8f]"
                      } font-[450]  px-2 `}
                    >
                      {item.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className=" bg-white rounded-md drop-shadow-md p-4 lg:p-[24px] col-span-2 lg:col-span-1">
          <section className=" flex justify-between border-b pb-[8px] border-gray-100">
            <h6>Events</h6>
            <Link to="/admin/addevents">
            <p className="flex items-center gap-2 font-[500] text-indigo-500 hover:translate-x-1.5 duration-300">
              View More <FaArrowRight className="text-[1rem] " />
            </p>{" "}
            </Link>
          </section>
          <div className=" space-y-6 mt-[16px]">
            {eventItems.slice(0, 3).map((item, idx) => {
              return (
                <div key={idx}
                  className={` flex flex-col lg:flex-row gap-6 items-start  py-2   ${
                    idx !== inquiryItems.length - 1
                      ? "border-b border-neutral-200"
                      : ""
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className=" h-[7rem] rounded-md w-full lg:w-[10rem] "
                  />
                  <section className="">
                    <p className=" text-indigo-500">
                      {item.location}
                    </p>
                    <p className=" caption mb-1 font-[550] font-jamjure">
                      {item.title}
                    </p>
                    <p className="  text-gray-800 caption line-clamp-3">{item.desc}</p>
                  </section>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" bg-[#ffffff] p-4 lg:p-[24px] rounded-md drop-shadow-md col-span-2 space-y-4">
          <section className=" flex justify-between border-b pb-[8px] border-gray-100">
            <h6>Recent Inquiries</h6>
            <Link to="/admin/inquirydetails">
            <p className="flex items-center gap-2 font-[500] text-indigo-500 hover:translate-x-1.5 duration-300">
              View More <FaArrowRight className="text-[1rem] " />
            </p>{" "}</Link>
          </section>
          <div className=" mt-[16px] grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            {inquiryItems.slice(0, 2).map((item, idx) => {
              return (
                <div
                  className={`flex flex-col lg:flex-row gap-4 justify-between items-center col-span-1 border-2 px-4 py-6 rounded-xl ${
                    idx !== inquiryItems.length - 1
                      ? " border-neutral-200"
                      : ""
                  }`}
                  key={idx}
                >
                  <section className=" space-y-1 lg:space-y-2 lg:w-[25%] text-center">
                    <p className="caption font-[500] rounded-full bg-gray-700 text-white px-5 py-3.5 w-fit mx-auto">
                      {item.name.charAt(0).toUpperCase()}
                    </p>
                    <p className=" font-[600] font-jamjure">{item.name}</p>
                    <p className="font-[600] font-jamjure text-[12px]">
                      {item.date}
                    </p>
                  </section>

                  <section className=" flex-1 space-y-2">
                    <p className=" font-jamjure text-black font-[600]">
                      <span className=" ">Subject:</span> {item.subject}
                    </p>
                    <p className=" flex-1 overflow-clip caption line-clamp-4 text-black">
                      {item.content}
                    </p>
                  </section>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

 const Th = ({ children, width }) => {
  return (
    <th className={` py-3 text-left font-medium `} style={{ width }}>
      {children}
    </th>
  );
};

 const Td = ({ children }) => {
  return <td className=" py-3 font-[400] text-[14px]">{children}</td>;
};
