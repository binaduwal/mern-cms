import React from "react";
import QuickStats from "./QuickStats";
import { IoNewspaper } from "react-icons/io5";
import { MdCancelScheduleSend, MdOutlineSchedule } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { appointmentItems } from "../utils/Elements";
import MonthSchedule from "../reusables/MonthSchedule";
import CustomButton from "../reusables/CustomButton";
import { RxCross1 } from "react-icons/rx";
import { RiCalendarScheduleLine } from "react-icons/ri";

const AppointmentDetails = () => {
  const appointmentStats = [
    {
      id: 1,
      title: "Appointments",
      number: "25",
      rates: "-2.01%",
      color: "bg-[#ffffff]",
      icon: <IoNewspaper className=" text-indigo-400" />,
    },
    {
      id: 2,
      title: "Confirmed Appointments",
      number: "10",
      rates: "+3%",
      icon: <AiOutlineSchedule className=" text-green-700" />,
    },
    {
      id: 3,
      title: "Pending Appointments",
      number: "50",
      rates: "+2.08%",
      icon: <MdOutlineSchedule className=" text-yellow-500" />,
    },
    {
      id: 4,
      title: "Cancelled Appointments",
      number: "20",
      rates: "+1.08%",
      icon: <MdCancelScheduleSend className=" text-red-400" />,
    },
  ];

  const confirmedApmt = appointmentItems.filter(
    (item) => item.status === "Confirmed"
  );
  return (
    <div>
      <QuickStats data={appointmentStats} />
      <div className=" flex flex-col lg:flex-row gap-8 mt-[2.5rem] md:mt-[4rem]">
        <div className=" bg-white drop-shadow py-4 px-4 lg:px-6 rounded-md lg:w-[60%] ">
          <h6 className=" border-b pb-[8px] border-gray-200 ">
            All Appointments
          </h6>
          <table className="flex-1 w-full mt-4 ">
            <thead className=" bg-indigo-400 ">
              <tr>
                <Th>Student Name</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Status</Th>
                <th className=" py-3 px-2 text-center text-white font-medium w-[20%] ">
                  Actions
                </th>
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
                    <Td>{item.time}</Td>

                    <td
                      className={`py-3 font-[400] text-[16px] ${
                        statusInfo ? "text-[#de163a]" : " text-[#20bd8f]"
                      } font-[450]  `}
                    >
                      {item.status}
                    </td>
                    <td className=" flex items-center justify-center mx-auto gap-2 py-3 font-[400]">
                      <CustomButton
                        color=" bg-indigo-400"
                        icon={<RiCalendarScheduleLine />}
                      />
                      <CustomButton icon={<RxCross1 />} color="bg-[#de163a]" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <MonthSchedule data={confirmedApmt} title="Appointments" />
      </div>
    </div>
  );
};

export default AppointmentDetails;

const Th = ({ children, width }) => {
  return (
    <th className={` py-3 px-2 text-white text-left font-[500]`} style={{ width }}>
      {children}
    </th>
  );
};

const Td = ({ children }) => {
  return <td className=" py-3 px-2 font-[400] text-[14px]">{children}</td>;
};
