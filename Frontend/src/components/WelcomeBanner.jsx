import React from "react";
import { AiOutlineRise } from "react-icons/ai";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { IoMdTrophy } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdGroups } from "react-icons/md";

const WelcomeBanner = () => {
  const welcomeItems = [
    {
      title: "High Visa Success Rate",
      icon: <AiOutlineRise />,
    },
    {
      title: "10th Year of Success",
      icon: <IoMdTrophy />,
    },
    {
      title: "Certified Career Counselors",
      icon: <HiMiniCheckBadge />,
    },
    {
      title: "Visa Expert Team",
      icon: <MdGroups />,
    },
  ];

  const listing = [
    {
      title: "Permanent Placement & Managed Solutions",
    },
    {
      title: "Contract Talent Solutions & Remote Hiring",
    },
    {
      title: "Administrative & Customer Support",
    },
    {
      title: "Marketing Creative & Finance Accounting",
    },
  ];
  return (
    <section className="relative">
      <section className="container flex lg:flex-row flex-col gap-6 lg:gap-12 justify-between items-start mt-[1rem] md:mt-[2rem]">
        <div className="h-[16rem] sm:h-[20rem] md:h-[27rem] relative w-full lg:w-[42%] mt-2.5">
          <div
            className="absolute inset-0 bg-center bg-cover rounded-[2px] bg-no-repeat"
            style={{
              backgroundImage: `url("https://images.businessnewsdaily.com/app/uploads/2022/04/04074404/GettyImages-1133767597.jpg")`,
            }}
          />
          <div className="hidden lg:block absolute -bottom-8 -right-8 p-3 bg-white drop-shadow-md">
            <img
              src="https://groowp.com/wp-content/uploads/2021/02/img-005-1.jpg"
              className="h-[14rem]"
            />
          </div>
        </div>
        <div className="lg:w-[50%]">
          <h3 className=" text-indigo-400 mb-3 lg:mb-4">
            WELCOME TO SYSQUBE
          </h3>
          <h4 className="mb-4 lg:mb-6 subheading">
            The Leading Consultancy in Nepal
          </h4>
          <p className=" leading-relaxed text-[#000000A6] caption">
            The SysQube Consultancy has a long-standing reputation for being one
            of the best educational consultancy in Nepal for studying abroad.
            Our head office is located at Dillibazar, Kathmandu and branches at
            Parsa, Birtamode, Pokhara, Nawalparasi, Chitwan, Butwal in Nepal.
            And we have a support office in Sydney.
          </p>

          <div className="flex flex-col gap-5 mt-[2rem] md:mt-[2.5rem]">
            {listing.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-5 items-center group duration-700"
              >
                <div className="bg-[#f3f4f6] drop-shadow duration-700 p-2 rounded-md group-hover:bg-indigo-400">
                  <IoCheckmarkDoneSharp className="duration-700 text-[1.4rem] text-indigo-400 group-hover:text-white" />
                </div>
                <p className=" duration-700 group-hover:text-indigo-400">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#f3f4f6] mt-[3.5rem]">
        <div className="container grid grid-cols-2 gap-y-7 lg:grid-cols-4 justify-between md:py-12 py-10 px-0 md:px-12">
          {welcomeItems.map((item, idx) => (
            <section
              key={idx}
              className="group flex flex-col gap-4 md:gap-5 relative px-6 lg:px-10"
            >
              <div
                className={`hidden lg:block absolute top-0 right-0 h-full w-[1px] bg-indigo-400 transform -skew-x-12 lg:${
                  idx === welcomeItems.length - 1 ? "hidden" : ""
                }`}
              ></div>
              <h1 className="text-[3rem] md:text-[3.5rem] font-roboto font-bold text-neutral-700 flex justify-center group-hover:scale-125 duration-300">
                {item.icon}
              </h1>
              <p className=" text-center caption">
                {item.title}
              </p>
            </section>
          ))}
        </div>
      </section>
    </section>
  );
};

export default WelcomeBanner;
