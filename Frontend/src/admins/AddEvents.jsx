import React, { useContext } from "react";
import { AdminContext } from "../layout/AdminLayout";
import CustomButton from "../reusables/CustomButton";
import { RxPlus } from "react-icons/rx";
import { eventItems } from "../utils/Elements";
import "../reusables/Testimonials.css";
import QuickStats from "./QuickStats";
import { GrSchedule } from "react-icons/gr";
import { MdOutlineSchedule } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdCancelScheduleSend } from "react-icons/md";
import EventPagination from "./EventPagination";
import MonthSchedule from "../reusables/MonthSchedule";
import { useNavigate } from "react-router-dom";

const AddEvents = () => {
  const eventStats = [
    {
      id: 1,
      title: "Scheduled Events",
      number: "25",
      rates: "-2.01%",
      icon: <GrSchedule className=" text-indigo-400" />,
    },
    {
      id: 2,
      title: "Ongoing Events",
      number: "10",
      rates: "+3%",
      icon: <MdOutlineSchedule className=" text-yellow-500" />,
    },
    {
      id: 3,
      title: "Completed Events",
      number: "10",
      rates: "+2.08%",
      icon: <AiOutlineSchedule className=" text-green-700" />,
    },
    {
      id: 4,
      title: "Cancelled Events",
      number: "20",
      rates: "+1.08%",
      icon: <MdCancelScheduleSend className=" text-red-400" />,
    },
  ];

  const navigate=useNavigate();
  return (
    <>
      <QuickStats data={eventStats} />
      <div className=" border-b-2 border-gray-200 pb-2 flex justify-between items-end mt-[2.5rem] md:mt-[4rem]">
        <h5>Events</h5>
        <section className=" flex gap-3 items-center ">
          <CustomButton color="bg-green-500" onClick={()=>navigate("/admin/eventform")}>
            <span className=" flex items-center gap-x-2">
              <RxPlus className=" text-[1rem]" />
              Add New Event
            </span>
          </CustomButton>
        </section>
      </div>
      <div className=" flex lg:flex-row flex-col gap-8 mt-[24px]">
        <div className=" lg:w-[62%] ">
          <EventPagination />
        </div>
        <MonthSchedule data={eventItems} title="Events"/>
      </div>
    </>
  );
};

export default AddEvents;
